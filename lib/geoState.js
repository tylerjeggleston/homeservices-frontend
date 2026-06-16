const STATE_NAMES = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", DC: "District of Columbia",
  FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois",
  IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana",
  ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Michigan", MN: "Minnesota",
  MS: "Mississippi", MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada",
  NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York",
  NC: "North Carolina", ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon",
  PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota",
  TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia",
  WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
};

// Looks up the visitor's US state from request headers, preferring the
// geo headers Vercel injects so no outbound lookup is needed in production.
// Falls back to a free IP geolocation API for local dev / non-Vercel hosts.
export async function getStateFromHeaders(headersList) {
  const vercelRegion = headersList.get("x-vercel-ip-country-region");
  const vercelCountry = headersList.get("x-vercel-ip-country");
  if (vercelRegion && (!vercelCountry || vercelCountry === "US")) {
    const name = STATE_NAMES[vercelRegion.toUpperCase()];
    if (name) return name;
  }

  const forwardedFor = headersList.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim();
  if (!ip) return null;

  try {
    const res = await fetch(`https://ipwho.is/${ip}`, {
      signal: AbortSignal.timeout(1500),
    });
    const data = await res.json();
    if (data?.success && data?.country_code === "US" && data?.region) {
      return data.region;
    }
  } catch {
    // Ignore lookup failures; caller falls back to generic copy.
  }

  return null;
}
