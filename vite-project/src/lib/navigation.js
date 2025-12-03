// src/lib/navigation.js
export function navigateTo(url) {
  const u = new URL(url, window.location.origin).pathname;
  const normalized = u.length > 1 && u.endsWith("/") ? u.slice(0, -1) : u;
  history.pushState({}, "", normalized);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function navigateHash(url) {
  // hash-based navigation
  const normalized = url.startsWith("#") ? url : `#${url}`;
  window.location.hash = normalized;
}
