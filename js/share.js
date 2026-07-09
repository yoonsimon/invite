/**
 * 청첩장 공유 — 휴대폰 기본 공유 시트(navigator.share) + 링크 복사 폴백.
 * 카카오톡에 링크가 붙으면 페이지 OG 태그로 미리보기 카드가 뜬다 (별도 카카오 앱/심사 불필요).
 * 푸터 버튼(#kakaoShareBtn)에 연결.
 */
(function () {
  const url = 'https://yoonsimon.github.io/invite/';
  // 링크만 공유 — 일시·위치 텍스트는 넣지 않는다 (카톡은 링크의 OG 미리보기 카드로 표시).
  const shareData = { url: url };

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

  const shareBtn = document.getElementById('kakaoShareBtn');
  if (shareBtn) shareBtn.addEventListener('click', doShare);
})();
