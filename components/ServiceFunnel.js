"use client";

import { useMemo, useState } from "react";

export default function ServiceFunnel({ config }) {
  const steps = useMemo(() => config.steps || [], [config]);
  const [stepIndex, setStepIndex] = useState(0);

  const initialForm = useMemo(() => {
    const obj = {};
    steps.forEach((step) => {
      obj[step.key] = "";
    });
    return obj;
  }, [steps]);

  const [form, setForm] = useState(initialForm);

  const currentStep = steps[stepIndex];
  const progressPercent = ((stepIndex + 1) / steps.length) * 100;

  function updateField(key, value) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function goNext() {
    const value = form[currentStep.key];
    if (!value || !String(value).trim()) return;

    if (stepIndex < steps.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      alert("Submitted (demo)");
      console.log("FORM DATA:", form);
      console.log("SERVICE:", config.heading);
    }
  }

  function goBack() {
    if (stepIndex > 0) {
      setStepIndex((prev) => prev - 1);
    }
  }

  function selectOption(option) {
    updateField(currentStep.key, option);
  }

  if (!currentStep) return null;

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
                currentStep.options.length <= 3 ? "three-options" : "six-options"
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
                    <span className="radio-circle">○</span>
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
                disabled={!form[currentStep.key]}
              >
                Next ›
              </button>
            </div>
          </>
        )}

        {currentStep.type === "input" && (
          <>
            <input
              className="text-input"
              value={form[currentStep.key]}
              placeholder={currentStep.placeholder}
              onChange={(e) => updateField(currentStep.key, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") goNext();
              }}
            />

            <div className="nav-row">
              <button type="button" className="back-btn" onClick={goBack}>
                ‹ Back
              </button>

              <button
                type="button"
                className="next-btn"
                onClick={goNext}
                disabled={!form[currentStep.key].trim()}
              >
                {stepIndex === steps.length - 1 ? "Submit" : "Next ›"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}