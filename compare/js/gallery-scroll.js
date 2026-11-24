
(() => {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  const frame = document.createElement('div');
  frame.className = 'gallery-scroll-frame';
  grid.before(frame);
  frame.append(grid);
  grid.tabIndex = 0;
  grid.setAttribute('aria-label', '사진 썸네일');
  const track = document.createElement('div');
  track.className = 'gallery-scroll-track';
  track.setAttribute('aria-hidden', 'true');
  const thumb = document.createElement('span');
  thumb.className = 'gallery-scroll-thumb';
  track.append(thumb);
  frame.append(track);
  const update = () => {
    const maxScroll = grid.scrollHeight - grid.clientHeight;
    track.hidden = grid.hidden || maxScroll < 1;
    if (track.hidden) return;
    const size = Math.max(20, track.clientHeight * grid.clientHeight / grid.scrollHeight);
    const offset = (track.clientHeight - size) * grid.scrollTop / maxScroll;
    track.style.setProperty('--thumb-size', size + 'px');
    track.style.setProperty('--thumb-offset', offset + 'px');
  };
  grid.addEventListener('scroll', update, {passive:true});
  new ResizeObserver(update).observe(grid);
  new MutationObserver(update).observe(grid, {childList:true, attributes:true, attributeFilter:['hidden']});
  update();
})();