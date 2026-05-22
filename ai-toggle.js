/**
 * ai-toggle.js
 * Uses cookies instead of localStorage — works on file:// in all browsers.
 * The inline script in <head> reads the cookie synchronously before CSS loads.
 */
(function () {

  /* ── Storage: cookie-based, works on file:// everywhere ── */
  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  }

  function setCookie(name, value) {
    /* max-age 1 year; SameSite=Lax; no Secure so file:// works */
    document.cookie = name + '=' + encodeURIComponent(value) +
      '; max-age=31536000; path=/; SameSite=Lax';
  }

  function isEnhanced() {
    var val = getCookie('aiEnhanced');
    return val === null ? true : val === 'true';
  }

  /* ── Sync UI elements (ai.html only) ── */
  function syncUI(enhanced) {
    var toggleEl = document.getElementById('ai-toggle-switch');
    if (toggleEl) toggleEl.checked = enhanced;

    var labelEl = document.getElementById('ai-toggle-label');
    if (labelEl) {
      labelEl.textContent = enhanced ? 'AI Enhanced' : 'Original';
      labelEl.style.color = enhanced ? 'var(--blue-light)' : 'rgba(255,255,255,0.35)';
    }
    var labelOn  = document.getElementById('label-on');
    var labelOff = document.getElementById('label-off');
    if (labelOn)  labelOn.classList.toggle('active',  enhanced);
    if (labelOff) labelOff.classList.toggle('active', !enhanced);
  }

  function showBanner(enhanced) {
    var banner = document.getElementById('ai-toggle-banner');
    if (!banner) return;
    banner.style.display = 'block';
    banner.textContent   = enhanced ? '✦  AI Enhancements ON' : '✦  AI Enhancements OFF';
    banner.className     = 'ai-banner ' + (enhanced ? 'banner-on' : 'banner-off');
    banner.style.animation = 'none';
    banner.offsetHeight;
    banner.style.animation = '';
  }

  function setEnhanced(val) {
    setCookie('aiEnhanced', String(val));
    document.documentElement.classList.toggle('original', !val);
    syncUI(val);
    showBanner(val);
  }

  function toggle() { setEnhanced(!isEnhanced()); }

  document.addEventListener('DOMContentLoaded', function () {
    syncUI(isEnhanced());
    var toggleEl = document.getElementById('ai-toggle-switch');
    if (toggleEl) toggleEl.addEventListener('change', toggle);
  });

  window.aiToggle = { toggle: toggle, isEnhanced: isEnhanced, setEnhanced: setEnhanced };
})();
