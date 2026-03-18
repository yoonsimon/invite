/**
 * 방명록 - Firebase Firestore 연동
 */
let db = null;

function initGuestbook() {
  const form = document.getElementById('guestbookForm');
  const list = document.getElementById('guestbookList');
  if (!form || !list) return;

  // Firebase 초기화
  if (CONFIG.firebase.apiKey) {
    loadFirebase().then(() => {
      loadMessages();
    });
  } else {
    // Firebase 미설정 시 안내
    list.innerHTML = `
      <li class="guestbook__item" style="text-align:center;color:#999;">
        Firebase 설정 후 방명록이 활성화됩니다.<br>
        <span style="font-size:0.75rem;">config.js > firebase 항목을 설정해주세요</span>
      </li>
    `;
  }

  // 폼 제출
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('gbName').value.trim();
    const password = document.getElementById('gbPassword').value.trim();
    const message = document.getElementById('gbMessage').value.trim();

    if (!name || !password || !message) return;

    if (!db) {
      showToast('Firebase를 설정해주세요');
      return;
    }

    try {
      await db.collection('guestbook').add({
        name,
        password: simpleHash(password),
        message,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      form.reset();
      showToast('축하 메시지가 등록되었습니다');
    } catch (err) {
      console.error('방명록 등록 실패:', err);
      showToast('등록에 실패했습니다. 다시 시도해주세요.');
    }
  });
}

async function loadFirebase() {
  // Firebase SDK 로드
  await loadScript('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
  await loadScript('https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js');

  const app = firebase.initializeApp(CONFIG.firebase);
  db = firebase.firestore();
}

function loadMessages() {
  const list = document.getElementById('guestbookList');
  if (!db || !list) return;

  // 실시간 리스너
  db.collection('guestbook')
    .orderBy('createdAt', 'desc')
    .limit(50)
    .onSnapshot((snapshot) => {
      list.innerHTML = '';
      snapshot.forEach((doc) => {
        const data = doc.data();
        const li = createMessageItem(doc.id, data);
        list.appendChild(li);
      });

      if (snapshot.empty) {
        list.innerHTML = `
          <li class="guestbook__item" style="text-align:center;color:#999;">
            첫 번째 축하 메시지를 남겨주세요!
          </li>
        `;
      }
    });
}

function createMessageItem(id, data) {
  const li = document.createElement('li');
  li.className = 'guestbook__item';

  const dateStr = data.createdAt
    ? formatDate(data.createdAt.toDate())
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
    await db.collection('guestbook').doc(docId).delete();
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

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
