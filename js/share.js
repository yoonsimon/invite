/**
 * 카카오톡 공유 (Kakao JS SDK)
 * 실패하거나 SDK 미로드 시 링크 복사로 폴백.
 */
(function () {
  const btn = document.getElementById('kakaoShareBtn');
  if (!btn) return;

  const url = 'https://yoonsimon.github.io/invite/';

  // Kakao 초기화 (JavaScript 키 = config.kakaoMapApiKey)
  if (typeof Kakao !== 'undefined' && CONFIG.kakaoMapApiKey) {
    try {
      if (!Kakao.isInitialized()) Kakao.init(CONFIG.kakaoMapApiKey);
    } catch (e) {
      console.error('Kakao init 실패:', e);
    }
  }

  btn.addEventListener('click', function () {
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
  });
})();
