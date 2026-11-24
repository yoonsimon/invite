CONFIG.gallery = CONFIG.gallery.map(url => url.replace(/=d$/, '') + '=w1200');
// Keep account panels informative while the private invitation details are unavailable.
const loadInvitationDetails = loadPrivateData;
loadPrivateData = async function () {
  try {
    await loadInvitationDetails();
  } finally {
    for (const id of ['groomAccounts', 'brideAccounts']) {
      const panel = document.getElementById(id);
      if (!panel.querySelector('.account__copy')) {
        panel.textContent = '계좌 정보를 확인하려면 혼주에게 문의해 주세요.';
      }
    }
  }
};
