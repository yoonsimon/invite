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

  // 스크롤 애니메이션
  initScrollAnimation();

  // 토스트 컨테이너
  createToast();
});

function applyConfig() {
  // 커버 이름
  const groomEl = document.querySelector('.cover__groom');
  const brideEl = document.querySelector('.cover__bride');
  if (groomEl) groomEl.textContent = CONFIG.groom.name;
  if (brideEl) brideEl.textContent = CONFIG.bride.name;

  // 커버 날짜/장소
  const dateEl = document.querySelector('.cover__date');
  const venueEl = document.querySelector('.cover__venue');
  if (dateEl) dateEl.textContent = CONFIG.wedding.displayDate;
  if (venueEl) venueEl.textContent = CONFIG.wedding.venue + ' ' + (CONFIG.wedding.hall || '');

  // 인사말 부모님 이름
  const nameEls = document.querySelectorAll('.greeting__names p');
  if (nameEls.length >= 2) {
    nameEls[0].innerHTML = `<span class="greeting__parent">${CONFIG.groom.father} · ${CONFIG.groom.mother}</span>의 아들 <strong>${CONFIG.groom.name}</strong>`;
    nameEls[1].innerHTML = `<span class="greeting__parent">${CONFIG.bride.father} · ${CONFIG.bride.mother}</span>의 딸 <strong>${CONFIG.bride.name}</strong>`;
  }

  // 장소 이름
  const venueName = document.querySelector('.location__venue-name');
  if (venueName) venueName.textContent = CONFIG.wedding.venue + ' ' + (CONFIG.wedding.hall || '');

  // 페이지 타이틀
  document.title = `${CONFIG.groom.name} ♥ ${CONFIG.bride.name} 결혼합니다`;
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
