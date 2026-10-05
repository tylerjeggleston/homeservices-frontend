"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { AFFILIATES } from "../lib/affiliates";

const PIXEL_ID = "1277043514524468";

// Affiliates with their own pixel also get it loaded on main routes (?aff=slug),
// not just on /affiliate/[slug] pages.
const AFFILIATE_PIXELS = Object.fromEntries(
  Object.entries(AFFILIATES)
    .filter(([, a]) => a.pixelId)
    .map(([slug, a]) => [slug, a.pixelId])
);

export default function MetaPixel() {
  const pathname = usePathname();

  if (pathname?.startsWith("/affiliate/")) return null;

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            try {
              var affPixels = ${JSON.stringify(AFFILIATE_PIXELS)};
              var q = new URLSearchParams(window.location.search);
              var aff = q.get('aff') || q.get('affiliate_id') || '';
              if (!aff) {
                try { aff = (JSON.parse(localStorage.getItem('affiliate_tracking') || '{}').affiliateId) || ''; } catch (_) {}
              }
              var affPixel = affPixels[String(aff).toLowerCase()];
              if (affPixel && affPixel !== '${PIXEL_ID}') fbq('init', affPixel);
            } catch (_) {}
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
