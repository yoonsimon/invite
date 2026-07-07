/**
 * 메인 초기화
 */
document.addEventListener('DOMContentLoaded', () => {
  // 커버 배경 이미지 설정
  const cover = document.getElementById('cover');
  if (cover && CONFIG.coverImage) {
    cover.style.backgroundImage = `url('${CONFIG.coverImage}')`;
  }

  // 인사말 텍스트 적용
  const greetingText = document.querySelector('.greeting__text');
  if (greetingText && CONFIG.greeting) {
    greetingText.innerHTML = CONFIG.greeting.replace(/\n/g, '<br>');
  }

  // 커버 정보 적용
  applyConfig();

  // 각 섹션 초기화
  initGallery();
  initCalendar();
  initLocation();
  initGuestbook();
  initAccount();

  // 민감정보(이름·부모님·계좌) Firestore에서 로드 후 적용
  loadPrivateData().catch((err) => console.error('민감정보 로드 실패:', err));

  // 스크롤 애니메이션
  initScrollAnimation();

  // 토스트 컨테이너
  createToast();
});

function applyConfig() {
  // 커버 날짜/장소 (공개 정보)
  const dateEl = document.querySelector('.cover__date');
  const venueEl = document.querySelector('.cover__venue');
  if (dateEl) dateEl.textContent = CONFIG.wedding.displayDate;
  if (venueEl) venueEl.textContent = CONFIG.wedding.venue + ' ' + (CONFIG.wedding.hall || '');

  // 장소 이름 (공개 정보)
  const venueName = document.querySelector('.location__venue-name');
  if (venueName) venueName.textContent = CONFIG.wedding.venue + ' ' + (CONFIG.wedding.hall || '');

  // 이름·혼주는 민감정보 → Firestore 로드 후 secret.js가 채운다.
  // 로드 전 플레이스홀더가 노출되지 않도록 비워둔다.
  const groomEl = document.querySelector('.cover__groom');
  const brideEl = document.querySelector('.cover__bride');
  if (groomEl) groomEl.textContent = '';
  if (brideEl) brideEl.textContent = '';
  const nameEls = document.querySelectorAll('.greeting__names p');
  nameEls.forEach((el) => (el.innerHTML = ''));
}

// 스크롤 시 fade-in 애니메이션
function initScrollAnimation() {
  const sections = document.querySelectorAll('.section__inner, .section__title');
  sections.forEach((el) => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach((el) => observer.observe(el));
}

// 토스트 알림
let toastEl = null;
let toastTimer = null;

function createToast() {
  toastEl = document.createElement('div');
  toastEl.className = 'toast';
  document.body.appendChild(toastEl);
}

function showToast(message) {
  if (!toastEl) createToast();
  toastEl.textContent = message;
  toastEl.classList.add('show');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2000);
}

// 클립보드 복사
function copyToClipboard(text, successMessage) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMessage || '복사되었습니다');
    });
  } else {
    // 폴백
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast(successMessage || '복사되었습니다');
  }
}
