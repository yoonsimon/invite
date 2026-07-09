/**
 * 청첩장 공유 — 카카오 SDK 리치 공유(sendDefault) 우선.
 * 실패/미로드 시: 휴대폰 기본 공유 시트(navigator.share) → 링크 복사 순으로 폴백.
 * 푸터 버튼(#kakaoShareBtn)에 연결.
 */
(function () {
  const url = 'https://yoonsimon.github.io/invite/';

  // Kakao SDK 초기화 (JavaScript 키 = config.kakaoMapApiKey)
  if (typeof Kakao !== 'undefined' && CONFIG.kakaoMapApiKey) {
    try {
      if (!Kakao.isInitialized()) Kakao.init(CONFIG.kakaoMapApiKey);
    } catch (e) {
      console.error('Kakao init 실패:', e);
    }
  }

  function doShare() {
    const kakaoReady =
      typeof Kakao !== 'undefined' &&
      typeof Kakao.isInitialized === 'function' &&
      Kakao.isInitialized();

    if (kakaoReady) {
      try {
        Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: '소중한 분들을 초대합니다',
            description: '귀한 걸음으로 축복해 주세요\n4.18 규수당 문래점',
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

    // 폴백 1: 휴대폰 기본 공유 시트 (링크만)
    if (navigator.share) {
      navigator.share({ url: url }).catch(function () {});
      return;
    }
    // 폴백 2: 링크 복사
    if (typeof copyToClipboard === 'function') {
      copyToClipboard(url, '청첩장 링크가 복사되었습니다');
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(function () {
        if (typeof showToast === 'function') showToast('청첩장 링크가 복사되었습니다');
      });
    }
  }

  const shareBtn = document.getElementById('kakaoShareBtn');
  if (shareBtn) shareBtn.addEventListener('click', doShare);
})();
