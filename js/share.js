/**
 * 카카오톡 공유 (Kakao JS SDK)
 * - 푸터 버튼(#kakaoShareBtn) + 플로팅 버튼(#kakaoShareFloat) 둘 다 같은 공유 동작.
 * - 플로팅 버튼은 일정(#calendar) 섹션부터 왼쪽 하단에 노출.
 * - SDK 미로드/실패 시 링크 복사로 폴백.
 */
(function () {
  const url = 'https://yoonsimon.github.io/invite/';

  // Kakao 초기화 (JavaScript 키 = config.kakaoMapApiKey)
  if (typeof Kakao !== 'undefined' && CONFIG.kakaoMapApiKey) {
    try {
      if (!Kakao.isInitialized()) Kakao.init(CONFIG.kakaoMapApiKey);
    } catch (e) {
      console.error('Kakao init 실패:', e);
    }
  }

  function doShare() {
    const ready =
      typeof Kakao !== 'undefined' &&
      typeof Kakao.isInitialized === 'function' &&
      Kakao.isInitialized();

    if (ready) {
      try {
        Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: '소중한 분들을 초대합니다',
            description: '2027년 4월 18일 일요일 오전 11시 · 규수당 문래점',
            imageUrl: 'https://yoonsimon.github.io/invite/images/og-cover.jpg',
            link: { mobileWebUrl: url, webUrl: url },
          },
          buttons: [
            { title: '청첩장 보기', link: { mobileWebUrl: url, webUrl: url } },
          ],
        });
        return;
      } catch (e) {
        console.error('카카오 공유 실패:', e);
      }
    }

    // 폴백: 링크 복사 (copyToClipboard/showToast는 main.js 전역)
    if (typeof copyToClipboard === 'function') {
      copyToClipboard(url, '청첩장 링크가 복사되었습니다');
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
  }

  ['kakaoShareBtn', 'kakaoShareFloat'].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', doShare);
  });

  // 플로팅 버튼: 첫 이미지(커버) 영역에서 스크롤을 내리기 시작하면 바로 노출, 최상단이면 숨김
  const float = document.getElementById('kakaoShareFloat');
  if (float) {
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
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
  }
})();
