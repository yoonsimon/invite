/**
 * 갤러리 - Swiper 뷰어 + 3열 그리드 썸네일 연동
 */
function initGallery() {
  const viewerEl = document.getElementById('galleryViewer');
  const viewerWrapper = viewerEl?.querySelector('.swiper-wrapper');
  const grid = document.getElementById('galleryGrid');

  if (!viewerWrapper || !grid) return;

  const images = CONFIG.gallery;
  if (!images || images.length === 0) return;

  // Swiper 슬라이드 생성
  const dialog = document.querySelector('.gallery-dialog');
  const largeImage = dialog.querySelector('img');
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  images.forEach((src, index) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `<button type="button" class="gallery-open" aria-label="웨딩 사진 ${index + 1} 확대"><img src="${src}" alt="" loading="lazy"></button>`;
    slide.firstElementChild.addEventListener('click', (event) => {
      const photoId = new URL(src).pathname.split('/').pop().split('=')[0];
      largeImage.src = 'https://lh3.googleusercontent.com/d/' + encodeURIComponent(photoId) + '=w1600';
      largeImage.alt = `웨딩 사진 ${index + 1} 확대`;
      // Touch activation may leave focus on the page when the dialog opens.
      event.currentTarget.focus({ preventScroll: true });
      dialog.showModal();
    });
    viewerWrapper.appendChild(slide);
  });

  if (images.length === 1) {
    viewerEl.classList.add('gallery__viewer--single');
    grid.hidden = true;
    return;
  }

  const counter = document.createElement('span');
  counter.className = 'gallery__counter';
  const showPhotoNumber = (index) => {
    counter.textContent = `${index + 1} / ${images.length}`;
  };
  showPhotoNumber(0);
  viewerEl.nextElementSibling.append(counter);

  // Swiper 초기화
  const viewer = new Swiper('#galleryViewer', {
    loop: false,
    a11y: { prevSlideMessage: '이전 사진', nextSlideMessage: '다음 사진' },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      slideChange: function () {
        updateGridActive(this.activeIndex);
        revealThumbnail(this.activeIndex);
        showPhotoNumber(this.activeIndex);
      },
    },
  });

  // 그리드 썸네일 생성
  images.forEach((src, index) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.setAttribute('aria-label', `웨딩 사진 ${index + 1} 보기`);
    if (index === 0) item.setAttribute('aria-current', 'true');
    item.className = 'gallery__grid-item' + (index === 0 ? ' active' : '');
    item.innerHTML = `<img src="${src}" alt="" loading="lazy">`;
    item.addEventListener('click', () => {
      viewer.slideTo(index);
      updateGridActive(index);
    });
    grid.appendChild(item);
  });

  function revealThumbnail(index) {
    const item = grid.children[index];
    if (!item) return;
    const top = item.offsetTop;
    const bottom = top + item.offsetHeight;
    if (top < grid.scrollTop) grid.scrollTop = top;
    else if (bottom > grid.scrollTop + grid.clientHeight) {
      grid.scrollTop = bottom - grid.clientHeight;
    }
  }

  function updateGridActive(activeIndex) {
    const items = grid.querySelectorAll('.gallery__grid-item');
    items.forEach((item, i) => {
      const selected = i === activeIndex;
      item.classList.toggle('active', selected);
      if (selected) item.setAttribute('aria-current', 'true');
      else item.removeAttribute('aria-current');
    });
  }
}
