"use client";

import { useEffect, useMemo, useRef, useState } from "react";

//const OTP_API_BASE = "https://homeservices-backend-1fe53ea28f51.herokuapp.com";
const OTP_API_BASE = "https://homeservicesbackend-49679431e329.herokuapp.com";
const PHONE_VERIFICATION_ENABLED = false;
function isValidZip(zip) {
  return /^\d{5}(-\d{4})?$/.test(String(zip || "").trim());
}

function getTrackingParams() {
  if (typeof window === "undefined") {
    return {
      affiliateId: "",
      sub1: "",
      sub2: "",
      clickId: "",
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
      utmTerm: "",
      utmContent: "",
      referrer: "",
      landingPage: "",
    };
  }

  const params = new URLSearchParams(window.location.search);

  const fromUrl = {
    affiliateId: params.get("aff") || params.get("affiliate_id") || "",
    sub1: params.get("sub1") || "",
    sub2: params.get("sub2") || "",
    clickId: params.get("click_id") || params.get("clickid") || "",
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    utmTerm: params.get("utm_term") || "",
    utmContent: params.get("utm_content") || "",
    referrer: document.referrer || "",
    landingPage: window.location.href || "",
  };

  let stored = {};
  try {
    stored = JSON.parse(localStorage.getItem("affiliate_tracking") || "{}");
  } catch {
    stored = {};
  }

  return {
    affiliateId: fromUrl.affiliateId || stored.affiliateId || "",
    sub1: fromUrl.sub1 || stored.sub1 || "",
    sub2: fromUrl.sub2 || stored.sub2 || "",
    clickId: fromUrl.clickId || stored.clickId || "",
    utmSource: fromUrl.utmSource || stored.utmSource || "",
    utmMedium: fromUrl.utmMedium || stored.utmMedium || "",
    utmCampaign: fromUrl.utmCampaign || stored.utmCampaign || "",
    utmTerm: fromUrl.utmTerm || stored.utmTerm || "",
    utmContent: fromUrl.utmContent || stored.utmContent || "",
    referrer: fromUrl.referrer || stored.referrer || "",
    landingPage: fromUrl.landingPage || stored.landingPage || "",
  };
}


function persistTrackingParams() {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);

  const tracking = {
    affiliateId: params.get("aff") || params.get("affiliate_id") || "",
    sub1: params.get("sub1") || "",
    sub2: params.get("sub2") || "",
    clickId: params.get("click_id") || params.get("clickid") || "",
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    utmTerm: params.get("utm_term") || "",
    utmContent: params.get("utm_content") || "",
    referrer: document.referrer || "",
    landingPage: window.location.href || "",
  };

  const hasAnyTracking =
    tracking.affiliateId ||
    tracking.sub1 ||
    tracking.sub2 ||
    tracking.clickId ||
    tracking.utmSource ||
    tracking.utmMedium ||
    tracking.utmCampaign ||
    tracking.utmTerm ||
    tracking.utmContent;

  if (!hasAnyTracking) return;

  localStorage.setItem("affiliate_tracking", JSON.stringify(tracking));
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

function getTrustedFormCertUrl() {
  if (typeof document === "undefined") return "";
  return (
    document.querySelector('input[name="xxTrustedFormCertUrl"]')?.value || ""
  );
}

function getJornayaLeadId() {
  if (typeof document === "undefined") return "";
  return (
    document.querySelector('input[name="universal_leadid"]')?.value ||
    document.querySelector('input[name="leadid_token"]')?.value ||
    ""
  );
}

function getConsentSessionId() {
  if (typeof window === "undefined") return "";

  return (
    sessionStorage.getItem("rrwebSessionId") ||
    localStorage.getItem("rec_sid") ||
    window?.ConsentRecorder?.getSessionId?.() ||
    ""
  );
}

function getConsentValue() {
  const sessionId = getConsentSessionId();
  return sessionId ? `${sessionId}` : "";
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForValue(getter, { timeout = 4000, interval = 200 } = {}) {
  const started = Date.now();

  while (Date.now() - started < timeout) {
    const value = getter();
    if (value) return value;
    await sleep(interval);
  }

  return getter() || "";
}

function syncTrackingFieldsToRecorder() {
  if (typeof window === "undefined") return;

  const trustedFormCertUrl = getTrustedFormCertUrl();
  const jornayaLeadId = getJornayaLeadId();
  const consent = getConsentValue();

  window.__RECORDER_FORMDATA = {
    ...(window.__RECORDER_FORMDATA || {}),
    trustedFormCertUrl,
    jornayaLeadId,
    consent,
  };
}

function ThankYouScreen({ config }) {
  const serviceName =
  config?.thankYouServiceLabel ||
  config?.serviceLabel ||
  config?.heading?.replace(/^free\s+/i, "").replace(/\s+estimate$/i, "").trim() ||
  "home improvement";

const lowerServiceName = serviceName.toLowerCase();
  return (
    <section className="thankyou-page" data-rec-finalize="true">
      <div className="thankyou-page-logo">
        <div className="rw-logo">
          <span className="rw-logo-badge">RW</span>
          <div className="rw-logo-text">
            <span className="rw-logo-top">REMODEL</span>
            <span className="rw-logo-bottom">WIZ</span>
          </div>
        </div>
      </div>

      <h1 className="thankyou-page-title">Thank You!</h1>

      <div className="thankyou-page-grid">
        <article className="thankyou-page-card">
          <div className="thankyou-page-icon">🎉</div>
          <h3>Congratulations!</h3>
          <p>
            You are one step closer to getting {lowerServiceName} information for your
            home. A courteous expert will confirm your information and review your
            eligibility.
          </p>
        </article>

        <article className="thankyou-page-card">
          <div className="thankyou-page-icon">📞</div>
          <h3>Answer Your Phone!</h3>
          <p>
            The main goal is to help you save money. You will be contacted by a
            courteous expert, so get ready.
          </p>
        </article>

        <article className="thankyou-page-card">
          <div className="thankyou-page-icon">✍️</div>
          <h3>Grab A Pen!</h3>
          <p>
            You're moments away from obtaining information about your {lowerServiceName}{" "} project. When a courteous expert calls, make sure to write down their
            quotes and ask any questions you may have.
          </p>
        </article>
      </div>
    </section>
  );
}

export default function ServiceFunnel({ config }) {
  //const steps = useMemo(() => config?.steps || [], [config]);

  const steps = useMemo(() => {
  const rawSteps = config?.steps || [];
  if (PHONE_VERIFICATION_ENABLED) return rawSteps;
  return rawSteps.filter((step) => step.key !== "verificationCode");
}, [config]);

  const allSteps = useMemo(
    () => [
      ...steps,
      {
        key: "__thankyou__",
        type: "thankyou",
        title: "Thank You!",
      },
      {
        key: "__disqualified__",
        type: "disqualified",
        title: "Thank You!",
      },
    ],
    [steps]
  );

  const addressInputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const autocompleteListenerRef = useRef(null);

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
    obj.trustedFormCertUrl = "";
    obj.jornayaLeadId = "";
    obj.consent = "";
    obj.affiliateId = "";
    obj.sub1 = "";
    obj.sub2 = "";
    obj.clickId = "";
    obj.utmSource = "";
    obj.utmMedium = "";
    obj.utmCampaign = "";
    obj.utmTerm = "";
    obj.utmContent = "";
    obj.referrer = "";
    obj.landingPage = "";
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
  const [submitted, setSubmitted] = useState(false);
  const [disqualifyInfo, setDisqualifyInfo] = useState({
    title: "Thank You!",
    message: "",
  });
  const [selectOpen, setSelectOpen] = useState(true);

  const currentStep = allSteps[stepIndex];
  const progressSteps = useMemo(
  () => allSteps.filter((step) => step.type !== "disqualified"),
  [allSteps]
);

const progressPercent = useMemo(() => {
  if (!progressSteps.length) return 0;

  if (currentStep?.type === "thankyou" || currentStep?.type === "disqualified") {
    return 100;
  }

  const visibleIndex = progressSteps.findIndex(
    (step) => step.key === currentStep?.key
  );

  if (visibleIndex === -1) return 0;

  return ((visibleIndex + 1) / progressSteps.length) * 100;
}, [progressSteps, currentStep]);

  const isAddressStep = currentStep?.key === "address";
  const isZipStep = currentStep?.key === "zip";
  const isPhoneStep = currentStep?.key === "phone";
  const isVerificationStep = currentStep?.key === "verificationCode";
  const isThankYouStep = currentStep?.type === "thankyou";

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

  useEffect(() => {
  persistTrackingParams();

  const tracking = getTrackingParams();

  setForm((prev) => ({
    ...prev,
    affiliateId: tracking.affiliateId,
    sub1: tracking.sub1,
    sub2: tracking.sub2,
    clickId: tracking.clickId,
    utmSource: tracking.utmSource,
    utmMedium: tracking.utmMedium,
    utmCampaign: tracking.utmCampaign,
    utmTerm: tracking.utmTerm,
    utmContent: tracking.utmContent,
    referrer: tracking.referrer,
    landingPage: tracking.landingPage,
  }));
}, []);

  function validateCurrentStep() {
    if (!currentStep) return false;
    if (isThankYouStep) return true;

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

  useEffect(() => {
  const t = setTimeout(() => {
    console.log("TF script:", !!document.querySelector('script[src*="trustedform.com"]'));
    console.log("Jornaya script:", !!document.querySelector('script[src*="lidstatic.com"]'));
    console.log("TF input:", document.querySelector('input[name="xxTrustedFormCertUrl"]')?.value);
    console.log("Jornaya universal_leadid:", document.querySelector('input[name="universal_leadid"]')?.value);
    console.log("Jornaya leadid_token:", document.querySelector('input[name="leadid_token"]')?.value);
  }, 5000);

  return () => clearTimeout(t);
}, []);

  async function verifyOtpAndSubmit() {
    setOtpVerifying(true);
    setError("");
    setOtpInfo("");

    try {
      const verifyRes = await fetch(`${OTP_API_BASE}/api/otp/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: form.phone,
          code: form.verificationCode,
        }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok) {
        throw new Error(verifyData.error || "Verification failed.");
      }

      if (
        !verifyData.ok ||
        verifyData.verified !== true ||
        !verifyData.verificationToken
      ) {
        throw new Error(verifyData.error || "Verification failed.");
      }

      const trustedFormCertUrl = await waitForValue(getTrustedFormCertUrl, {
        timeout: 4000,
        interval: 200,
      });

      const jornayaLeadId = await waitForValue(getJornayaLeadId, {
        timeout: 4000,
        interval: 200,
      });

      const finalForm = {
        ...form,
        phoneVerified: true,
        verificationToken: verifyData.verificationToken,
        trustedFormCertUrl,
        jornayaLeadId,
        consent: getConsentValue(),
      };

      window.__RECORDER_FORMDATA = {
        ...(window.__RECORDER_FORMDATA || {}),
        trustedFormCertUrl,
        jornayaLeadId,
        consent: finalForm.consent,
      };

      console.log("TrustedFormCertUrl:", trustedFormCertUrl);
      console.log("JornayaLeadId:", jornayaLeadId);
      console.log("Consent:", finalForm.consent);

      const submitRes = await fetch(`${OTP_API_BASE}/api/leads/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceSlug: config?.slug || "",
          serviceHeading: config?.heading || "",
          form: finalForm,
        }),
      });

      const submitData = await submitRes.json();

      if (!submitRes.ok || !submitData.ok) {
        throw new Error(submitData.error || "Failed to save your information.");
      }

      setForm(finalForm);
      setStepIndex(allSteps.findIndex((step) => step.type === "thankyou"));

      // Fire Meta Pixel Lead event on successful submission
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead");
      }

      console.log("FORM DATA:", finalForm);
      console.log("SERVICE:", config?.heading);
      console.log("LEAD ID:", submitData.leadId);
    } catch (err) {
      setForm((prev) => ({
        ...prev,
        phoneVerified: false,
        verificationToken: "",
      }));
      setError(err.message || "Failed to verify and submit.");
    } finally {
      setOtpVerifying(false);
    }
  }

  async function submitLeadWithoutOtp() {
  setOtpVerifying(true);
  setError("");
  setOtpInfo("");

  try {
    const trustedFormCertUrl = await waitForValue(getTrustedFormCertUrl, {
      timeout: 4000,
      interval: 200,
    });

    const jornayaLeadId = await waitForValue(getJornayaLeadId, {
      timeout: 4000,
      interval: 200,
    });

    const finalForm = {
      ...form,
      phoneVerified: false,
      verificationToken: "",
      trustedFormCertUrl,
      jornayaLeadId,
      consent: getConsentValue(),
    };

    window.__RECORDER_FORMDATA = {
      ...(window.__RECORDER_FORMDATA || {}),
      trustedFormCertUrl,
      jornayaLeadId,
      consent: finalForm.consent,
    };

    const submitRes = await fetch(`${OTP_API_BASE}/api/leads/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serviceSlug: config?.slug || "",
        serviceHeading: config?.heading || "",
        form: finalForm,
      }),
    });

    const submitData = await submitRes.json();

    if (!submitRes.ok || !submitData.ok) {
      throw new Error(submitData.error || "Failed to save your information.");
    }

    setForm(finalForm);
    setStepIndex(allSteps.findIndex((step) => step.type === "thankyou"));

    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead");
    }
  } catch (err) {
    setError(err.message || "Failed to submit lead.");
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

    if (
      currentStep?.type === "options" &&
      currentStep?.disqualifyOn?.values?.includes(form[currentStep.key])
    ) {
      setDisqualifyInfo({
        title: currentStep.disqualifyOn.title || "Thank You!",
        message:
          currentStep.disqualifyOn.message ||
          "We are unable to continue with this request.",
      });

      setStepIndex(allSteps.findIndex((step) => step.type === "disqualified"));
      return;
    }

    // if (currentStep.key === "phone") {
    //   await sendOtp();
    //   return;
    // }

    if (currentStep.key === "phone") {
  if (PHONE_VERIFICATION_ENABLED) {
    // await sendOtp();
    await submitLeadWithoutOtp();
  } else {
    await submitLeadWithoutOtp();
  }
  return;
  }

    if (currentStep.key === "verificationCode") {
      await verifyOtpAndSubmit();
      return;
    }

    if (stepIndex < allSteps.length - 1) {
      setStepIndex((prev) => prev + 1);
      return;
    }

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
    setSelectOpen(false);
  }

  useEffect(() => {
    setSelectSearch("");
    setSelectOpen(currentStep?.type === "select");
  }, [stepIndex, currentStep?.type]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 20;

    const pollTrackingFields = () => {
      if (cancelled) return;

      syncTrackingFieldsToRecorder();
      attempts += 1;

      const hasTrustedForm = !!getTrustedFormCertUrl();
      const hasJornaya = !!getJornayaLeadId();

      if ((hasTrustedForm && hasJornaya) || attempts >= maxAttempts) return;

      setTimeout(pollTrackingFields, 500);
    };

    pollTrackingFields();

    const onStorage = () => syncTrackingFieldsToRecorder();
    window.addEventListener("storage", onStorage);

    return () => {
      cancelled = true;
      window.removeEventListener("storage", onStorage);
    };
  }, []);

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
    if (currentStep?.type !== "thankyou") return;

    const timer = setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("recorder:finalize", {
          detail: { reason: "thank-you-step" },
        })
      );
    }, 800);

    return () => clearTimeout(timer);
  }, [currentStep]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (currentStep?.key !== "address") return;
    if (!window.google?.maps?.places) return;
    if (!addressInputRef.current) return;



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

    const listener = autocomplete.addListener("place_changed", () => {
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
    autocompleteListenerRef.current = listener;

   return () => {
  try {
    if (autocompleteListenerRef.current?.remove) {
      autocompleteListenerRef.current.remove();
      autocompleteListenerRef.current = null;
    }



    autocompleteRef.current = null;
  } catch (err) {
    console.warn("Autocomplete cleanup error:", err);
  }
};
  }, [currentStep, userCoords]);

  useEffect(() => {
    const handlePopState = () => {
      window.location.href = "/";
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (!currentStep) return null;
  if (currentStep.type === "thankyou") {
    return <ThankYouScreen config={config} />;
  }

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

  // let nextLabel = "Next ›";
  // if (isPhoneStep) nextLabel = otpSending ? "Sending..." : "Send Code ›";
  // if (isVerificationStep) {
  //   nextLabel = otpVerifying ? "Verifying..." : "Verify & Submit";
  // }

  let nextLabel = "Next ›";

if (isPhoneStep) {
  nextLabel = PHONE_VERIFICATION_ENABLED
    ? (otpSending ? "Sending..." : "Send Code ›")
    : (otpVerifying ? "Submitting..." : "Submit");
}

if (isVerificationStep) {
  nextLabel = otpVerifying ? "Verifying..." : "Verify & Submit";
}

  const rangePrefix =
    currentStep.type === "range" ? currentStep.prefix || "" : "";
  const rangeSuffix =
    currentStep.type === "range" ? currentStep.suffix || "" : "";

  return (
    <form
  className="funnel-card"
  onSubmit={(e) => {
    e.preventDefault();
    goNext();
  }}
>

      <input type="hidden" name="leadid_token" id="leadid_token" />
      <input type="hidden" name="universal_leadid" id="universal_leadid" />
      <div className="progress-shell">
        <div
          className="progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="funnel-inner">
        {currentStep.type !== "thankyou" && currentStep.type !== "disqualified" && (
  <h2 className="question-title">{currentStep.title}</h2>
)}


        {currentStep.type === "disqualified" && (
          <div className="thankyou-step">
            <div className="thankyou-icon">✓</div>

            <h3 className="thankyou-title">{disqualifyInfo.title}</h3>

            <p className="thankyou-text">{disqualifyInfo.message}</p>
          </div>
        )}

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
                data-rec-finalize={isVerificationStep ? "true" : undefined}
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
              <button
                type="button"
                className="select-selected"
                onClick={() => setSelectOpen((prev) => !prev)}
              >
                {form[currentStep.key] || currentStep.placeholder || "Select one"}
              </button>

              <input
                className="select-search-input"
                value={selectSearch}
                onChange={(e) => setSelectSearch(e.target.value)}
                placeholder={currentStep.searchPlaceholder || "Search..."}
              />

              {dynamicOptionsLoading && (
                <div className="address-help">Loading utility companies...</div>
              )}

              {selectOpen && (
                <div className="select-options-box">
                  {filteredSelectOptions.map((option) => {
                    const selected = form[currentStep.key] === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        className={`select-option-item ${
                          selected ? "active" : ""
                        }`}
                        onClick={() => handleSelectChoose(option)}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              )}
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
              <div className="address-help consent-copy">
                By clicking Submit, I agree to the{" "}
                <a href="/terms" target="_blank" rel="noopener noreferrer">
                  Terms of use
                </a>{" "}
                and{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  privacy policy
                </a>{" "}
                and authorize up to{" "}
                <a
                  href="/marketing-partners"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  4 home improvement companies, their contractors and partners
                </a>{" "}
                to contact me with offers about home improvement products or
                services by telephone calls, emails, artificial voice, and
                pre-recorded/text messages, using an automated telephone
                technology, to the number and email I provided above, even if my
                number is a mobile number or is currently listed on any state,
                federal or corporate Do Not Call list. I understand that my
                consent here is not a condition of purchase of any goods or
                services. Message and data rates may apply.{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  California Residents
                </a>
                . (or{" "}
                <a
                  href="/do-not-sell-my-personal-information"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Do Not Contact
                </a>
                ).
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

        {error && <div className="address-help error-text">{error}</div>}
      </div>
    </form>
  );
}