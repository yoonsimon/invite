/**
 * 갤러리 - Swiper 뷰어 + 3열 그리드 썸네일 연동
 */
function initGallery() {
  const viewerWrapper = document.querySelector('#galleryViewer .swiper-wrapper');
  const grid = document.getElementById('galleryGrid');

  if (!viewerWrapper || !grid) return;

  const images = CONFIG.gallery;
  if (!images || images.length === 0) return;

  // Swiper 슬라이드 생성
  images.forEach((src) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `<img src="${src}" alt="웨딩 사진" loading="lazy">`;
    viewerWrapper.appendChild(slide);
  });

  // Swiper 초기화
  const viewer = new Swiper('#galleryViewer', {
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      slideChange: function () {
        updateGridActive(this.activeIndex);
      },
    },
  });

  // 그리드 썸네일 생성
  images.forEach((src, index) => {
    const item = document.createElement('div');
    item.className = 'gallery__grid-item' + (index === 0 ? ' active' : '');
    item.innerHTML = `<img src="${src}" alt="썸네일 ${index + 1}" loading="lazy">`;
    item.addEventListener('click', () => {
      viewer.slideTo(index);
      updateGridActive(index);
    });
    grid.appendChild(item);
  });

  function updateGridActive(activeIndex) {
    const items = grid.querySelectorAll('.gallery__grid-item');
    items.forEach((item, i) => {
      item.classList.toggle('active', i === activeIndex);
    });
  }
}
