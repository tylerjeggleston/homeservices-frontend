"use client";

import { usePathname } from "next/navigation";

export default function HomeLogoButton() {
  const pathname = usePathname();

  const getHomeUrl = () => {
    const match = pathname?.match(/^\/affiliate\/([^/]+)/);
    return match ? `/affiliate/${match[1]}` : "/";
  };

  const handleGoHome = () => {
    window.location.assign(getHomeUrl());
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