/* Preview messages stay in the current tab. */
function initGuestbook() {
  const key = 'v01.guestbook';
  const form = document.querySelector('#guestbookForm');
  const list = document.querySelector('#guestbookList');
  const pager = document.querySelector('.guestbook__pager');
  let page = 0;
  const messages = JSON.parse(sessionStorage.getItem(key) || '[]');
  function refresh() {
    const pages = Math.max(1, Math.ceil(messages.length / 3));
    page = Math.min(page, pages - 1);
    list.replaceChildren();
    for (const message of messages.slice(page * 3, page * 3 + 3)) {
      const item = createMessageItem(message.id, {...message, createdAt: {toDate: () => new Date(message.time)}});
      list.append(item);
    }
    pager.hidden = pages < 2;
    pager.querySelector('span').textContent = (page + 1) + ' / ' + pages;
    pager.firstElementChild.disabled = page === 0;
    pager.lastElementChild.disabled = page === pages - 1;
    sessionStorage.setItem(key, JSON.stringify(messages));
  }
  handleDelete = (id, hash) => {
    const password = prompt('비밀번호를 입력하세요');
    if (!password) return;
    if (simpleHash(password) !== hash) return showToast('비밀번호가 일치하지 않습니다');
    const index = messages.findIndex(message => message.id === id);
    if (index >= 0) messages.splice(index, 1);
    refresh();
  };
  pager.addEventListener('click', event => {
    const button = event.target.closest('[data-page]');
    if (button) { page += Number(button.dataset.page); refresh(); }
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = form.querySelector('#gbName').value.trim();
    const message = form.querySelector('#gbMessage').value.trim();
    const password = form.querySelector('#gbPassword').value.trim();
    if (!name || !message || !password) return showToast('이름, 비밀번호, 메시지를 입력해 주세요');
    messages.unshift({id:crypto.randomUUID(), time:Date.now(), name, message, password:simpleHash(password)});
    page = 0;
    refresh();
    form.reset();
    showToast('이 탭에 축하 메시지를 등록했습니다');
  });
  refresh();
}
CONFIG.gallery = CONFIG.gallery.map(url => url.replace(/=d$/, "=w1600"));
