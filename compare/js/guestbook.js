/**
 * 방명록 - Firebase Firestore 연동
 */
const previewKey = 'invite-preview:' + location.pathname;
let messages = JSON.parse(sessionStorage.getItem(previewKey) || '[]');
let renderMessages;
function saveMessages() {
  sessionStorage.setItem(previewKey, JSON.stringify(messages));
  renderMessages();
}

function initGuestbook() {
  const form = document.getElementById('guestbookForm');
  const list = document.getElementById('guestbookList');
  if (!form || !list) return;

  loadMessages();

  // 폼 제출
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('gbName').value.trim();
    const password = document.getElementById('gbPassword').value.trim();
    const message = document.getElementById('gbMessage').value.trim();

    if (!name || !password || !message) return;

try {
      messages.unshift({ id: crypto.randomUUID(),
        name,
        password: simpleHash(password),
        message,
        createdAt: Date.now(),
      });

      saveMessages();
      form.reset();
      showToast('축하 메시지가 등록되었습니다');
    } catch (err) {
      console.error('방명록 등록 실패:', err);
      showToast('등록에 실패했습니다. 다시 시도해주세요.');
    }
  });
}

// Firebase 초기화는 firebase-init.js의 ensureFirebase()로 일원화됨.

function loadMessages() {
  const list = document.getElementById('guestbookList');
  if (!list) return;

  const pager = document.querySelector('.guestbook__pager');
  const [previous, next] = pager.querySelectorAll('button');
  const status = pager.querySelector('span');
  const pageSize = 3;
  let page = 0;


  function renderPage() {
    const pages = Math.max(1, Math.ceil(messages.length / pageSize));
    page = Math.min(Math.max(0, page), pages - 1);
    const visible = messages.slice(page * pageSize, (page + 1) * pageSize);
    list.replaceChildren(...visible.map(doc => createMessageItem(doc.id, doc)));
    if (!messages.length) {
      const empty = document.createElement('li');
      empty.className = 'guestbook__item';
      empty.textContent = '첫 번째 축하 메시지를 남겨주세요!';
      list.append(empty);
    }
    pager.hidden = pages < 2;
    previous.disabled = page === 0;
    next.disabled = page === pages - 1;
    status.textContent = (page + 1) + ' / ' + pages;
  }

  pager.addEventListener('click', event => {
    const button = event.target.closest('[data-page]');
    if (!button) return;
    page += Number(button.dataset.page);
    renderPage();
  });

  renderMessages = renderPage;
  renderPage();
}

function createMessageItem(id, data) {
  const li = document.createElement('li');
  li.className = 'guestbook__item';

  const dateStr = data.createdAt
    ? formatDate((typeof data.createdAt.toDate === "function" ? data.createdAt.toDate() : new Date(data.createdAt)))
    : '';

  li.innerHTML = `
    <div class="guestbook__item-header">
      <span class="guestbook__item-name">${escapeHtml(data.name)}</span>
      <span class="guestbook__item-date">${dateStr}</span>
    </div>
    <p class="guestbook__item-message">${escapeHtml(data.message)}</p>
    <button class="guestbook__item-delete" data-id="${id}" data-hash="${data.password}">삭제</button>
  `;

  // 삭제 버튼
  const deleteBtn = li.querySelector('.guestbook__item-delete');
  deleteBtn.addEventListener('click', () => handleDelete(id, data.password));

  return li;
}

async function handleDelete(docId, storedHash) {
  const password = prompt('비밀번호를 입력하세요');
  if (!password) return;

  if (simpleHash(password) !== storedHash) {
    showToast('비밀번호가 일치하지 않습니다');
    return;
  }

  try {
    messages = messages.filter(item => item.id !== docId);
    saveMessages();
    showToast('삭제되었습니다');
  } catch (err) {
    console.error('삭제 실패:', err);
    showToast('삭제에 실패했습니다');
  }
}

// 간단한 해시 (비밀번호 평문 저장 방지)
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

function formatDate(date) {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const h = date.getHours();
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${m}.${d} ${h}:${min}`;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// loadScript는 firebase-init.js의 loadScriptOnce로 대체됨.
