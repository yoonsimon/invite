/**
 * 마음 전하기 - 계좌번호 아코디언 + 복사
 */
function initAccount() {
  // 아코디언 토글 (정적 요소)
  document.querySelectorAll('.account__toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const details = document.getElementById(targetId);
      if (!details) return;

      btn.classList.toggle('open');
      details.classList.toggle('open');
    });
  });

  // 계좌 항목/복사 버튼은 Firestore 로드 후 동적 생성되므로 이벤트 위임
  const section = document.getElementById('account');
  if (section) {
    section.addEventListener('click', (e) => {
      const btn = e.target.closest('.account__copy');
      if (btn && btn.dataset.account) {
        copyToClipboard(btn.dataset.account, '계좌번호가 복사되었습니다');
      }
    });
  }

  // 계좌 내용은 secret.js의 renderAccounts()가 로드 후 채운다. 로드 전 안내.
  ['groomAccounts', 'brideAccounts'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = '<div class="account__item" style="justify-content:center;color:#bbb;">불러오는 중…</div>';
  });
}

function renderAccounts(containerId, accounts) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';
  (accounts || []).forEach((acc) => {
    const item = document.createElement('div');
    item.className = 'account__item';
    item.innerHTML = `
      <span class="account__info">${acc.bank} ${acc.number} (${acc.holder})</span>
      <button class="account__copy" data-account="${acc.number}">복사</button>
    `;
    container.appendChild(item);
  });
}
