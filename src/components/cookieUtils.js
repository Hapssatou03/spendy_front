const CONSENT_KEY = "cookie_consent";

export function getConsent() {
  const raw = localStorage.getItem(CONSENT_KEY);

  return raw ? JSON.parse(raw) : null;
}

export function saveConsent(consent) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
}
