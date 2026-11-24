/**
 * Firebase 단일 초기화 유틸
 * guestbook.js, secret.js가 공유한다. SDK는 최초 1회만 로드/초기화.
 */
let _fbPromise = null;

function ensureFirebase() {
  if (_fbPromise) return _fbPromise;
  _fbPromise = (async () => {
    await loadScriptOnce('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
    await loadScriptOnce('https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js');
    if (!firebase.apps.length) {
      firebase.initializeApp(CONFIG.firebase);
    }
    return firebase.firestore();
  })();
  return _fbPromise;
}

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
