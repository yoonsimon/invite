(() => {
  function setupEnvelope() {
    const cover = document.getElementById('cover');
    if (!cover) return;
    const names = cover.querySelector('.cover__names');
    const intro = document.createElement('section');
    intro.id = 'cover';
    intro.className = 'envelope-intro';
    intro.setAttribute('aria-label', '청첩장 봉투');
    intro.innerHTML = `
      <div class="envelope-intro__viewport">
        <div class="envelope-display" aria-hidden="true">
          <div class="envelope-display__back"></div>
          <div class="envelope-display__window"><article class="envelope-display__letter"><p class="invitation-sheet__kicker">WEDDING INVITATION</p><img class="invitation-sheet__photo" alt="두 사람이 함께한 사진"><div class="invitation-sheet__names"></div><div class="invitation-sheet__rule"></div><p class="invitation-sheet__meta"></p><p class="invitation-sheet__message">함께할 날을 기다립니다</p></article></div>
          <div class="envelope-display__pocket"></div><div class="envelope-display__flap"></div><div class="envelope-display__seal">♥</div>
        </div>
        <div class="envelope-front-copy"><p class="envelope-front-copy__kicker">WEDDING INVITATION</p><p class="envelope-front-copy__names"></p><p class="envelope-front-copy__date"></p><p class="envelope-front-copy__venue"></p></div>
        <p class="envelope-intro__hint">천천히 위로 올려 봉투를 열어주세요</p>
        <nav class="envelope-intro__links" aria-label="초대장 바로가기"><a href="#gallery">사진 보기</a><a href="#location">오시는 길</a></nav>
      </div>`;
    const date = CONFIG.wedding.displayDate;
    const venue = [CONFIG.wedding.venue, CONFIG.wedding.hall].filter(Boolean).join(' ');
    intro.querySelector('.invitation-sheet__photo').src = CONFIG.coverImage;
    intro.querySelector('.invitation-sheet__meta').innerHTML = `${date}<br>${venue}`;
    intro.querySelector('.envelope-front-copy__date').textContent = date;
    intro.querySelector('.envelope-front-copy__venue').textContent = venue;
    if (names) intro.querySelector('.invitation-sheet__names').append(names);
    const frontNames = intro.querySelector('.envelope-front-copy__names');
    const copyNames = () => {
      frontNames.replaceChildren();
      const groom = names?.querySelector('.cover__groom')?.textContent || '';
      const bride = names?.querySelector('.cover__bride')?.textContent || '';
      if (groom || bride) { frontNames.append(groom, ' '); const amp = document.createElement('span'); amp.className = 'front-amp'; amp.textContent = '&'; frontNames.append(amp, ` ${bride}`); }
    };
    copyNames();
    if (names) new MutationObserver(copyNames).observe(names, { childList:true, characterData:true, subtree:true });
    cover.replaceWith(intro);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let pending = false;
    const update = () => {
      pending = false;
      const viewport = intro.firstElementChild;
      const length = intro.offsetHeight - viewport.offsetHeight;
      if (length <= 0) return;
      const progress = Math.max(0, Math.min(1, -intro.getBoundingClientRect().top / length));
      const unseal = Math.min(1, progress / .14);
      const opening = Math.max(0, Math.min(1, (progress - .14) / .32));
      const lift = Math.max(0, Math.min(1, (progress - .34) / .48));
      const pocket = Math.max(0, Math.min(1, (progress - .67) / .33));
      intro.style.setProperty('--flap-angle', `${-opening * 170}deg`);
      intro.style.setProperty('--sheet-y', `${64 - 64 * lift}%`);
      intro.style.setProperty('--pocket-y', `${pocket * 105}%`);
      intro.style.setProperty('--back-alpha', 1 - pocket);
      intro.style.setProperty('--window-mask', 1 - pocket);
      intro.style.setProperty('--seal-alpha', 1 - unseal);
      // Front printing belongs to the envelope: clear it before the card reaches the slot.
      intro.style.setProperty('--front-alpha', Math.max(0, 1 - Math.max(0, (progress - .34) / .18)));
      intro.toggleAttribute('data-flap-behind', opening > .5);
    };
    const queue = () => { if (!pending) { pending = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', queue, { passive:true });
    window.addEventListener('resize', queue);
    new ResizeObserver(queue).observe(intro);
    queue();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setupEnvelope, { once:true }); else setupEnvelope();
})();
