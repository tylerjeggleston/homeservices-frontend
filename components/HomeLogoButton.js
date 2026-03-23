"use client";

export default function HomeLogoButton() {
  const handleGoHome = () => {
    window.location.assign("/");
  };

  return (
    <button type="button" className="logo-link logo-btn" onClick={handleGoHome}>
      <div className="rw-logo">
        <span className="rw-logo-badge">RW</span>
        <div className="rw-logo-text">
          <span className="rw-logo-top">REMODEL</span>
          <span className="rw-logo-bottom">WIZ</span>
        </div>
      </div>
    </button>
  );
}