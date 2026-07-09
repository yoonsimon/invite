/**
 * 청첩장 공유 — 휴대폰 기본 공유 시트(navigator.share) + 링크 복사 폴백.
 * 카카오톡에 링크가 붙으면 페이지 OG 태그로 미리보기 카드가 뜬다 (별도 카카오 앱/심사 불필요).
 * - 푸터 버튼(#kakaoShareBtn) + 플로팅 버튼(#kakaoShareFloat) 공용.
 * - 플로팅은 커버에서 스크롤 내리는 순간부터 노출.
 */
(function () {
  const url = 'https://yoonsimon.github.io/invite/';
  const shareData = {
    title: '소중한 분들을 초대합니다',
    text: '2027년 4월 18일 일요일 오전 11시 · 규수당 문래점',
    url: url,
  };

  function doShare() {
    if (navigator.share) {
      navigator.share(shareData).catch(function () {
        /* 사용자가 취소했거나 실패 — 무시 */
      });
      return;
    }
    // 폴백: 링크 복사 (copyToClipboard/showToast는 main.js 전역)
    if (typeof copyToClipboard === 'function') {
      copyToClipboard(url, '청첩장 링크가 복사되었습니다');
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(function () {
        if (typeof showToast === 'function') showToast('청첩장 링크가 복사되었습니다');
      });
    }
  }

  ['kakaoShareBtn', 'kakaoShareFloat'].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', doShare);
  });

  // 플로팅 버튼: 커버(#cover)가 일정 부분 밀려나면 노출.
  // IntersectionObserver 사용 — iOS Safari에서 스크롤 중에도 안정적으로 갱신됨.
  const float = document.getElementById('kakaoShareFloat');
  const cover = document.getElementById('cover');
  if (float && cover && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      float.classList.toggle('is-visible', entries[0].intersectionRatio < 0.85);
    }, { threshold: [0, 0.85, 1] });
    io.observe(cover);
  } else if (float) {
    // 폴백: 스크롤 이벤트
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        float.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.15);
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
