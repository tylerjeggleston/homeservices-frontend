"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const OTP_API_BASE = "https://homeservices-backend-1fe53ea28f51.herokuapp.com";

function isValidZip(zip) {
  return /^\d{5}(-\d{4})?$/.test(String(zip || "").trim());
}

function extractAddressParts(place) {
  const components = place?.address_components || [];

  let streetNumber = "";
  let route = "";
  let city = "";
  let state = "";
  let zip = "";

  for (const comp of components) {
    const types = comp.types || [];

    if (types.includes("street_number")) streetNumber = comp.long_name;
    if (types.includes("route")) route = comp.long_name;
    if (types.includes("locality")) city = comp.long_name;
    if (types.includes("postal_town") && !city) city = comp.long_name;
    if (types.includes("administrative_area_level_1")) state = comp.short_name;
    if (types.includes("postal_code")) zip = comp.long_name;
  }

  const street = [streetNumber, route].filter(Boolean).join(" ").trim();

  return {
    street,
    city,
    state,
    zip,
  };
}

function formatPhoneDisplay(value) {
  const digits = String(value || "")
    .replace(/\D/g, "")
    .slice(0, 10);

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function ServiceFunnel({ config }) {
  const steps = useMemo(() => config?.steps || [], [config]);
  const addressInputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const initialForm = useMemo(() => {
    const obj = {};

    steps.forEach((step) => {
      if (step.type === "range" && step.defaultValue !== undefined) {
        obj[step.key] = step.defaultValue;
      } else {
        obj[step.key] = "";
      }
    });

    obj.city = "";
    obj.state = "";
    obj.lat = "";
    obj.lng = "";
    obj.addressValidated = false;
    obj.phoneVerified = false;
    obj.verificationToken = "";

    return obj;
  }, [steps]);

  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [userCoords, setUserCoords] = useState(null);
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [otpInfo, setOtpInfo] = useState("");
  const [dynamicOptions, setDynamicOptions] = useState({});
  const [dynamicOptionsLoading, setDynamicOptionsLoading] = useState(false);
  const [selectSearch, setSelectSearch] = useState("");

  const currentStep = steps[stepIndex];
  const progressPercent = steps.length
    ? ((stepIndex + 1) / steps.length) * 100
    : 0;

  const isAddressStep = currentStep?.key === "address";
  const isZipStep = currentStep?.key === "zip";
  const isPhoneStep = currentStep?.key === "phone";
  const isVerificationStep = currentStep?.key === "verificationCode";

  const filteredSelectOptions = useMemo(() => {
    if (!currentStep || currentStep.type !== "select") return [];

    const all =
      dynamicOptions[currentStep.key] && dynamicOptions[currentStep.key].length
        ? dynamicOptions[currentStep.key]
        : currentStep.options || [];

    const q = String(selectSearch || "").trim().toLowerCase();
    if (!q) return all;

    return all.filter((item) => item.toLowerCase().includes(q));
  }, [currentStep, selectSearch, dynamicOptions]);

  function updateField(key, value) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function goBack() {
    setError("");
    if (stepIndex > 0) {
      setStepIndex((prev) => prev - 1);
    }
  }

  function validateCurrentStep() {
    if (!currentStep) return false;

    const rawValue = form[currentStep.key];
    const value = String(rawValue || "").trim();

    if (currentStep.type === "options") {
      if (!value) {
        setError("Please choose an option to continue.");
        return false;
      }
      return true;
    }

    if (currentStep.type === "select") {
      if (!value) {
        setError("Please select an option to continue.");
        return false;
      }
      return true;
    }

    if (currentStep.type === "range") {
      if (value === "") {
        setError("Please choose a value to continue.");
        return false;
      }
      return true;
    }

    if (currentStep.key === "zip") {
      if (!isValidZip(value)) {
        setError("Please enter a valid ZIP code.");
        return false;
      }
      return true;
    }

    if (currentStep.key === "address") {
      if (!value) {
        setError("Please enter your address.");
        return false;
      }

      if (!form.addressValidated) {
        setError("Please choose a full address from the dropdown suggestions.");
        return false;
      }

      if (!form.city || !form.state || !form.zip || !form.lat || !form.lng) {
        setError("Please select a complete valid address from the dropdown.");
        return false;
      }

      return true;
    }

    if (currentStep.key === "email") {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!emailOk) {
        setError("Please enter a valid email address.");
        return false;
      }
      return true;
    }

    if (currentStep.key === "phone") {
      const digits = value.replace(/\D/g, "");
      if (digits.length < 10) {
        setError("Please enter a valid phone number.");
        return false;
      }
      return true;
    }

    if (currentStep.key === "verificationCode") {
      if (!/^\d{6}$/.test(value)) {
        setError("Please enter the 6-digit verification code.");
        return false;
      }
      return true;
    }

    if (!value) {
      setError("This field is required.");
      return false;
    }

    return true;
  }

  async function sendOtp() {
    setOtpSending(true);
    setError("");
    setOtpInfo("");

    try {
      const res = await fetch(`${OTP_API_BASE}/api/otp/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: form.phone,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to send verification code.");
      }

      setOtpInfo(
        data.phoneMasked
          ? `Verification code sent to ${data.phoneMasked}`
          : "Verification code sent."
      );

      setStepIndex((prev) => prev + 1);
    } catch (err) {
      setError(err.message || "Failed to send verification code.");
    } finally {
      setOtpSending(false);
    }
  }

  async function verifyOtpAndSubmit() {
    setOtpVerifying(true);
    setError("");
    setOtpInfo("");

    try {
      const res = await fetch(`${OTP_API_BASE}/api/otp/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: form.phone,
          code: form.verificationCode,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Verification failed.");
      }

      if (!data.ok || data.verified !== true || !data.verificationToken) {
        throw new Error(data.error || "Verification failed.");
      }

      const finalForm = {
        ...form,
        phoneVerified: true,
        verificationToken: data.verificationToken,
      };

      setForm(finalForm);

      setShowThankYouModal(true);
        console.log("FORM DATA:", finalForm);
        console.log("SERVICE:", config?.heading);

      // Replace this later with your actual final lead submit API call.
    } catch (err) {
      setForm((prev) => ({
        ...prev,
        phoneVerified: false,
        verificationToken: "",
      }));
      setError(err.message || "Failed to verify code.");
    } finally {
      setOtpVerifying(false);
    }
  }

  async function loadDynamicOptions(step) {
    if (!step?.dynamicOptionsFrom) return;

    if (step.dynamicOptionsFrom === "utilityLookup") {
      try {
        setDynamicOptionsLoading(true);
        setError("");

        const res = await fetch(`${OTP_API_BASE}/api/utilities/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            zip: form.zip,
            state: form.state,
            city: form.city,
            address: form.address,
            lat: form.lat,
            lng: form.lng,
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.ok) {
          throw new Error(data.error || "Failed to load utility companies.");
        }

        setDynamicOptions((prev) => ({
          ...prev,
          [step.key]: data.utilities || ["OTHER PROVIDER"],
        }));
      } catch (err) {
        setError(err.message || "Failed to load utility companies.");
        setDynamicOptions((prev) => ({
          ...prev,
          [step.key]: ["OTHER PROVIDER"],
        }));
      } finally {
        setDynamicOptionsLoading(false);
      }
    }
  }

  async function goNext() {
    setError("");

    const valid = validateCurrentStep();
    if (!valid) return;

    if (currentStep.key === "phone") {
      await sendOtp();
      return;
    }

    if (currentStep.key === "verificationCode") {
      await verifyOtpAndSubmit();
      return;
    }

    if (stepIndex < steps.length - 1) {
      setStepIndex((prev) => prev + 1);
      return;
    }

    alert("Submitted (demo)");
    console.log("FORM DATA:", form);
    console.log("SERVICE:", config?.heading);
  }

  function selectOption(option) {
    setError("");
    updateField(currentStep.key, option);
  }

  function handleRegularInputChange(e) {
    const value = e.target.value;

    setError("");
    setOtpInfo("");

    if (currentStep?.key === "phone") {
      const formatted = formatPhoneDisplay(value);
      setForm((prev) => ({
        ...prev,
        phone: formatted,
        phoneVerified: false,
        verificationToken: "",
        verificationCode: "",
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [currentStep.key]: value,
    }));
  }

  function handleAddressChange(e) {
    const value = e.target.value;

    setError("");
    setForm((prev) => ({
      ...prev,
      address: value,
      city: "",
      state: "",
      lat: "",
      lng: "",
      addressValidated: false,
    }));
  }

  function handleRangeChange(e) {
    setError("");
    updateField(currentStep.key, Number(e.target.value));
  }

  function handleSelectChoose(option) {
    setError("");
    updateField(currentStep.key, option);
    setSelectSearch(option);
  }

  useEffect(() => {
    setSelectSearch("");
  }, [stepIndex]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {},
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 300000,
      }
    );
  }, []);

  useEffect(() => {
    if (!currentStep) return;
    if (currentStep.type !== "select") return;
    if (!currentStep.dynamicOptionsFrom) return;

    loadDynamicOptions(currentStep);
  }, [stepIndex, form.zip, form.state, form.city]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (currentStep?.key !== "address") return;
    if (!window.google?.maps?.places) return;
    if (!addressInputRef.current) return;

    if (autocompleteRef.current) {
      autocompleteRef.current.unbindAll?.();
      autocompleteRef.current = null;
    }

    const autocomplete = new window.google.maps.places.Autocomplete(
      addressInputRef.current,
      {
        types: ["address"],
        componentRestrictions: { country: "us" },
        fields: ["formatted_address", "address_components", "geometry"],
      }
    );

    if (userCoords && window.google?.maps?.Circle) {
      const circle = new window.google.maps.Circle({
        center: userCoords,
        radius: 50000,
      });

      const bounds = circle.getBounds();
      if (bounds) autocomplete.setBounds(bounds);
    }

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      const parts = extractAddressParts(place);

      const lat = place?.geometry?.location?.lat?.();
      const lng = place?.geometry?.location?.lng?.();

      const isValidSelection = !!(
        place?.formatted_address &&
        parts.street &&
        parts.city &&
        parts.state &&
        parts.zip &&
        lat &&
        lng
      );

      setForm((prev) => ({
        ...prev,
        address: place?.formatted_address || prev.address,
        city: parts.city,
        state: parts.state,
        zip: parts.zip || prev.zip,
        lat: lat || "",
        lng: lng || "",
        addressValidated: isValidSelection,
      }));

      setError(
        isValidSelection
          ? ""
          : "Please choose a full street address from the dropdown."
      );
    });

    autocompleteRef.current = autocomplete;
  }, [currentStep, userCoords]);

  if (!currentStep) return null;

  const currentValue = String(form[currentStep.key] || "").trim();

  let nextDisabled = false;

  if (currentStep.type === "options" || currentStep.type === "select") {
    nextDisabled = !currentValue;
  } else if (currentStep.type === "range") {
    nextDisabled = false;
  } else if (isZipStep) {
    nextDisabled = !isValidZip(form.zip);
  } else if (isAddressStep) {
    nextDisabled = !form.addressValidated;
  } else if (isPhoneStep) {
    nextDisabled = !currentValue || otpSending;
  } else if (isVerificationStep) {
    nextDisabled = !/^\d{6}$/.test(currentValue) || otpVerifying;
  } else {
    nextDisabled = !currentValue;
  }

  let nextLabel = "Next ›";
  if (isPhoneStep) nextLabel = otpSending ? "Sending..." : "Send Code ›";
  if (isVerificationStep) {
    nextLabel = otpVerifying ? "Verifying..." : "Verify & Submit";
  }

  const rangePrefix =
    currentStep.type === "range" ? currentStep.prefix || "" : "";
  const rangeSuffix =
    currentStep.type === "range" ? currentStep.suffix || "" : "";

  return (
    <div className="funnel-card">
      <div className="progress-shell">
        <div
          className="progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="funnel-inner">
        <h2 className="question-title">{currentStep.title}</h2>

        {currentStep.type === "options" && (
          <>
            <div
              className={`options-grid ${
                currentStep.layout === "stack"
                  ? "stack-options"
                  : currentStep.options.length <= 3
                  ? "three-options"
                  : "six-options"
              }`}
            >
              {currentStep.options.map((option) => {
                const selected = form[currentStep.key] === option;

                return (
                  <button
                    key={option}
                    type="button"
                    className={`option-btn ${selected ? "selected" : ""}`}
                    onClick={() => selectOption(option)}
                  >
                    <span className="radio-circle">{selected ? "◉" : "○"}</span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            <div className="nav-row">
              {stepIndex > 0 ? (
                <button type="button" className="back-btn" onClick={goBack}>
                  ‹ Back
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                className="next-btn"
                onClick={goNext}
                disabled={nextDisabled}
              >
                {nextLabel}
              </button>
            </div>
          </>
        )}

        {currentStep.type === "range" && (
          <>
            <div className="range-value-display">
              {rangePrefix}
              {Number(form[currentStep.key] || 0).toLocaleString()}
              {rangeSuffix}
            </div>

            <input
              type="range"
              min={currentStep.min ?? 0}
              max={currentStep.max ?? 1000}
              step={currentStep.step ?? 1}
              value={form[currentStep.key] || currentStep.defaultValue || 0}
              onChange={handleRangeChange}
              className="bill-range"
            />

            <div className="nav-row">
              <button type="button" className="back-btn" onClick={goBack}>
                ‹ Back
              </button>

              <button
                type="button"
                className="next-btn"
                onClick={goNext}
                disabled={nextDisabled}
              >
                {nextLabel}
              </button>
            </div>
          </>
        )}

        {currentStep.type === "select" && (
          <>
            <div className="custom-select-wrap">
              <div className="select-selected">
                {form[currentStep.key] || currentStep.placeholder || "Select one"}
                <span className="select-caret">▼</span>
              </div>

              <input
                className="select-search-input"
                value={selectSearch}
                onChange={(e) => setSelectSearch(e.target.value)}
                placeholder={currentStep.searchPlaceholder || "Search..."}
              />

              {dynamicOptionsLoading && (
                <div className="address-help">Loading utility companies...</div>
              )}

              <div className="select-options-box">
                {filteredSelectOptions.map((option) => {
                  const selected = form[currentStep.key] === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      className={`select-option-item ${selected ? "active" : ""}`}
                      onClick={() => handleSelectChoose(option)}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="nav-row">
              <button type="button" className="back-btn" onClick={goBack}>
                ‹ Back
              </button>

              <button
                type="button"
                className="next-btn"
                onClick={goNext}
                disabled={nextDisabled}
              >
                {nextLabel}
              </button>
            </div>
          </>
        )}

        {currentStep.type === "input" && !isAddressStep && (
          <>
            <input
              className="text-input"
              value={form[currentStep.key]}
              placeholder={currentStep.placeholder}
              onChange={handleRegularInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") goNext();
              }}
            />

            {isZipStep && form.zip && !isValidZip(form.zip) && (
              <div className="address-help error-text">
                Enter ZIP like 12345 or 12345-6789.
              </div>
            )}

            {isPhoneStep && (
              <div className="address-help">
                {currentStep.consentText ||
                  "By clicking Send Code, you agree to be contacted by our partners via call, text, and email regarding your project. Consent is not a condition of purchase."}
              </div>
            )}

            {isVerificationStep && otpInfo && (
              <div className="address-help">{otpInfo}</div>
            )}

            <div className="nav-row">
              <button type="button" className="back-btn" onClick={goBack}>
                ‹ Back
              </button>

              <button
                type="button"
                className="next-btn"
                onClick={goNext}
                disabled={nextDisabled}
              >
                {nextLabel}
              </button>
            </div>
          </>
        )}

        {currentStep.type === "input" && isAddressStep && (
          <>
            <input
              ref={addressInputRef}
              className="text-input"
              value={form.address}
              placeholder="Start typing your full address"
              onChange={handleAddressChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
            />

            <div className="address-help">
              {form.address && !form.addressValidated
                ? "Please choose a full address from the dropdown suggestions."
                : userCoords
                ? "Nearby address suggestions are enabled."
                : "Allow location for faster nearby suggestions."}
            </div>

            <div className="nav-row">
              <button type="button" className="back-btn" onClick={goBack}>
                ‹ Back
              </button>

              <button
                type="button"
                className="next-btn"
                onClick={goNext}
                disabled={nextDisabled}
              >
                {nextLabel}
              </button>
            </div>
          </>
        )}

        {showThankYouModal && (
  <div className="thankyou-modal-overlay">
    <div className="thankyou-modal">
      <button
        type="button"
        className="thankyou-close"
        onClick={() => setShowThankYouModal(false)}
      >
        ×
      </button>

      <div className="thankyou-icon">✓</div>

      <h3 className="thankyou-title">Thank You!</h3>

      <p className="thankyou-text">
        Your information has been submitted successfully.
      </p>

      <p className="thankyou-subtext">
        One of our partners will contact you shortly with your free quote.
      </p>

      <button
        type="button"
        className="thankyou-btn"
        onClick={() => setShowThankYouModal(false)}
      >
        Done
      </button>
    </div>
  </div>
)}

        {error && <div className="address-help error-text">{error}</div>}
      </div>
    </div>
  );
}