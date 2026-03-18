/**
 * 마음 전하기 - 계좌번호 아코디언 + 복사
 */
function initAccount() {
  // 계좌 정보 동적 렌더링
  renderAccounts('groomAccounts', CONFIG.accounts.groom);
  renderAccounts('brideAccounts', CONFIG.accounts.bride);

  // 아코디언 토글
  document.querySelectorAll('.account__toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const details = document.getElementById(targetId);
      if (!details) return;

      btn.classList.toggle('open');
      details.classList.toggle('open');
    });
  });

  // 계좌 복사 버튼
  document.querySelectorAll('.account__copy').forEach((btn) => {
    btn.addEventListener('click', () => {
      const account = btn.dataset.account;
      if (account) {
        copyToClipboard(account, '계좌번호가 복사되었습니다');
      }
    });
  });
}

function renderAccounts(containerId, accounts) {
  const container = document.getElementById(containerId);
  if (!container || !accounts) return;

  container.innerHTML = '';
  accounts.forEach((acc) => {
    const item = document.createElement('div');
    item.className = 'account__item';
    item.innerHTML = `
      <span class="account__info">${acc.bank} ${acc.number} (${acc.holder})</span>
      <button class="account__copy" data-account="${acc.number}">복사</button>
    `;
    container.appendChild(item);
  });
}
