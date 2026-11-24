// The preview's guestbook keeps its messages in this tab.
function initGuestbook() {
  const key = 'invite.v02.guestbook';
  const form = document.querySelector('#guestbookForm');
  const list = document.querySelector('#guestbookList');
  const pager = document.querySelector('.guestbook__pager');
  const messages = JSON.parse(sessionStorage.getItem(key) || '[]');
  let page = 0;
  function save() {
    sessionStorage.setItem(key, JSON.stringify(messages));
    render();
  }
  function render() {
    const count = Math.max(1, Math.ceil(messages.length / 3));
    page = Math.max(0, Math.min(count - 1, page));
    list.replaceChildren(...messages.slice(page * 3, page * 3 + 3).map(entry =>
      createMessageItem(entry.id, {...entry, createdAt:{toDate:()=>new Date(entry.time)}})
    ));
    if (!messages.length) {
      const empty = document.createElement('li');
      empty.className = 'guestbook__item';
      empty.textContent = '첫 번째 축하 메시지를 남겨주세요.';
      list.append(empty);
    }
    pager.hidden = count < 2;
    pager.querySelector('span').textContent = (page + 1) + ' / ' + count;
    pager.querySelector('[data-page="-1"]').disabled = page === 0;
    pager.querySelector('[data-page="1"]').disabled = page === count - 1;
  }
  window.handleDelete = (id, hash) => {
    const value = prompt('비밀번호를 입력하세요');
    if (!value) return;
    if (simpleHash(value) !== hash) return showToast('비밀번호가 일치하지 않습니다');
    const index = messages.findIndex(entry => entry.id === id);
    if (index >= 0) messages.splice(index, 1);
    save();
  };
  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = form.querySelector('#gbName').value.trim();
    const message = form.querySelector('#gbMessage').value.trim();
    const password = form.querySelector('#gbPassword').value.trim();
    if (!name || !message || !password) return;
    messages.unshift({id:crypto.randomUUID(), time:Date.now(), name, message, password:simpleHash(password)});
    page = 0;
    save();
    form.reset();
    showToast('이 탭에 축하 메시지가 등록되었습니다');
  });
  pager.addEventListener('click', event => {
    const button = event.target.closest('[data-page]');
    if (!button) return;
    page += Number(button.dataset.page);
    render();
  });
  render();
}
