"use client";

import { useEffect, useState } from "react";

const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];
const STORAGE_KEY = "rl-attribution";

type Tracking = Record<string, string>;

function readAttribution(): Tracking {
  const fromUrl: Tracking = {};
  const search = new URLSearchParams(window.location.search);
  for (const key of PARAMS) {
    const value = search.get(key);
    if (value) fromUrl[key] = value;
  }
  try {
    // Keep the campaign that brought the visitor in, even after they browse to other pages.
    if (Object.keys(fromUrl).length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}") as Tracking;
  } catch {
    return fromUrl;
  }
}

/** Hidden inputs carrying page + campaign attribution into every lead. */
export default function TrackingFields() {
  const [tracking, setTracking] = useState<Tracking>({});

  useEffect(() => {
    // Values only exist in the browser, so they are read after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTracking({
      pageUrl: window.location.href,
      pageTitle: document.title,
      referrer: document.referrer,
      ...readAttribution(),
    });
  }, []);

  return (
    <>
      {Object.entries(tracking).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
    </>
  );
}
