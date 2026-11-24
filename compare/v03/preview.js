/* The preview keeps the guestbook on this device. */
function initGuestbook() {
  const form = document.querySelector('#guestbookForm');
  const list = document.querySelector('#guestbookList');
  const pager = document.querySelector('.guestbook__pager');
  const key = 'invite-screen-guestbook-v3';
  let notes = JSON.parse(sessionStorage.getItem(key) || '[]');
  let current = 0;
  function render() {
    list.replaceChildren();
    const pages = Math.max(1, Math.ceil(notes.length / 3));
    current = Math.min(current, pages - 1);
    for (const entry of notes.slice(current * 3, current * 3 + 3)) {
      const row = document.createElement('li');
      row.className = 'guestbook__item';
      const sender = document.createElement('strong');
      sender.textContent = entry.name;
      const message = document.createElement('p');
      message.textContent = entry.message;
      const remove = document.createElement('button');
      remove.textContent = '삭제';
      remove.onclick = () => {
        const value = prompt('비밀번호를 입력하세요');
        if (value === null) return;
        if (simpleHash(value) !== entry.hash) return showToast('비밀번호가 일치하지 않습니다');
        notes = notes.filter(note => note !== entry);
        sessionStorage.setItem(key, JSON.stringify(notes));
        render();
      };
      row.append(sender, message, remove);
      list.append(row);
    }
    pager.hidden = pages === 1;
    pager.querySelector('span').textContent = (current + 1) + ' / ' + pages;
    pager.firstElementChild.disabled = current === 0;
    pager.lastElementChild.disabled = current === pages - 1;
  }
  pager.onclick = event => {
    const button = event.target.closest('[data-page]');
    if (button) { current += Number(button.dataset.page); render(); }
  };
  form.onsubmit = event => {
    event.preventDefault();
    const name = form.querySelector('#gbName').value.trim();
    const message = form.querySelector('#gbMessage').value.trim();
    const password = form.querySelector('#gbPassword').value.trim();
    if (!name || !message || !password) return;
    notes.unshift({name, message, hash: simpleHash(password)});
    sessionStorage.setItem(key, JSON.stringify(notes));
    form.reset();
    current = 0;
    render();
    showToast('이 기기에 축하 글을 남겼습니다');
  };
  render();
}
