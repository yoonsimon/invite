CONFIG.gallery = CONFIG.gallery.map(src => src.replace(/(?:=d)?$/, '=w1200'));

// This local edition keeps guestbook mutations inside the preview tab.
function initGuestbook() {
  const form = document.querySelector('#guestbookForm');
  const list = document.querySelector('#guestbookList');
  const pager = document.querySelector('.guestbook__pager');
  const key = 'sunday-duet-guestbook-v1';
  let entries = JSON.parse(sessionStorage.getItem(key) || '[]');
  let page = 0;

  function render() {
    const pages = Math.max(1, Math.ceil(entries.length / 3));
    page = Math.min(page, pages - 1);
    const items = entries.slice(page * 3, page * 3 + 3).map(entry => {
      const item = createMessageItem(entry.id, {
        ...entry, createdAt: {toDate: () => new Date(entry.time)}
      });
      return item;
    });
    list.replaceChildren(...items);
    if (!items.length) {
      const empty = document.createElement('li');
      empty.className = 'guestbook__item';
      empty.textContent = '첫 번째 축하 메시지를 남겨주세요.';
      list.append(empty);
    }
    pager.hidden = pages < 2;
    pager.querySelector('span').textContent = (page + 1) + ' / ' + pages;
    pager.querySelector('[data-page="-1"]').disabled = page === 0;
    pager.querySelector('[data-page="1"]').disabled = page === pages - 1;
  }
  function save() {
    sessionStorage.setItem(key, JSON.stringify(entries));
    render();
  }
  // The shared message renderer delegates deletion to this handler.
  handleDelete = function (id, hash) {
    const password = prompt('비밀번호를 입력하세요');
    if (!password) return;
    if (simpleHash(password) !== hash) return showToast('비밀번호가 일치하지 않습니다');
    entries = entries.filter(row => row.id !== id);
    save();
    showToast('삭제되었습니다');
  };
  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = form.querySelector('#gbName').value.trim();
    const message = form.querySelector('#gbMessage').value.trim();
    const password = form.querySelector('#gbPassword').value.trim();
    if (!name || !message || !password) return;
    entries.unshift({id: crypto.randomUUID(), time: Date.now(), name, message, password: simpleHash(password)});
    page = 0;
    save();
    form.reset();
    showToast('축하 메시지가 등록되었습니다');
  });
  pager.addEventListener('click', event => {
    const button = event.target.closest('[data-page]');
    if (button && !button.disabled) {
      page += Number(button.dataset.page);
      render();
    }
  });
  render();
}
// Retry the same external Drive photo at a display-sized rendition on transient delivery failures.
document.addEventListener('error', event => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement) || image.dataset.retried) return;
  const url = new URL(image.src);
  if (url.hostname !== 'lh3.googleusercontent.com') return;
  image.dataset.retried = 'true';
  url.hostname = 'drive.google.com';
  const id = url.pathname.split('/').pop().split('=')[0];
  url.pathname = '/thumbnail';
  url.search = new URLSearchParams({id, sz:'w1200'});
  image.src = url.href;
}, true);

document.querySelectorAll('img').forEach(image => { if (image.complete && image.src && !image.naturalWidth) image.dispatchEvent(new Event('error')); });