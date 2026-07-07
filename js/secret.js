/**
 * 민감정보(이름·부모님·계좌) 런타임 로드
 * repo/git기록/검색엔진엔 없고, Firestore `invite/private` 문서에서 가져온다.
 * 시딩은 로컬 seed.html 참고 (배포되지 않음).
 */
async function loadPrivateData() {
  const db = await ensureFirebase();
  const snap = await db.collection('invite').doc('private').get();

  if (!snap.exists) {
    console.warn('[secret] invite/private 문서가 없습니다. seed.html로 먼저 시딩하세요.');
    return;
  }

  applyPrivateData(snap.data() || {});
}

function applyPrivateData(data) {
  // CONFIG에 병합 (다른 스크립트가 참조 가능하도록)
  if (data.groom) CONFIG.groom = { ...CONFIG.groom, ...data.groom };
  if (data.bride) CONFIG.bride = { ...CONFIG.bride, ...data.bride };
  if (data.accounts) CONFIG.accounts = data.accounts;

  // 커버 이름
  const groomEl = document.querySelector('.cover__groom');
  const brideEl = document.querySelector('.cover__bride');
  if (groomEl) groomEl.textContent = CONFIG.groom.name || '';
  if (brideEl) brideEl.textContent = CONFIG.bride.name || '';

  // 인사말 혼주
  const nameEls = document.querySelectorAll('.greeting__names p');
  if (nameEls.length >= 2) {
    nameEls[0].innerHTML = `<span class="greeting__parent">${CONFIG.groom.father} · ${CONFIG.groom.mother}</span>의 아들 <strong>${CONFIG.groom.name}</strong>`;
    nameEls[1].innerHTML = `<span class="greeting__parent">${CONFIG.bride.father} · ${CONFIG.bride.mother}</span>의 딸 <strong>${CONFIG.bride.name}</strong>`;
  }

  // 페이지 타이틀
  if (CONFIG.groom.name && CONFIG.bride.name) {
    document.title = `${CONFIG.groom.name} ♥ ${CONFIG.bride.name} 결혼합니다`;
  }

  // 계좌 렌더 (account.js의 renderAccounts 사용)
  if (typeof renderAccounts === 'function') {
    renderAccounts('groomAccounts', CONFIG.accounts.groom);
    renderAccounts('brideAccounts', CONFIG.accounts.bride);
  }
}
