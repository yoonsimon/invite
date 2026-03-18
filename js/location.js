/**
 * 오시는 길 - 카카오맵 임베드 + 카카오/네이버/티맵 딥링크
 */
function initLocation() {
  const { lat, lng, venue, address } = CONFIG.wedding;

  // 카카오맵 임베드
  initKakaoMap(lat, lng, venue);

  // 딥링크 설정
  setupNavLinks(lat, lng, venue);

  // 주소 복사
  const copyBtn = document.getElementById('copyAddressBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      copyToClipboard(address, '주소가 복사되었습니다');
    });
  }

  // 주소 텍스트
  const addressEl = document.getElementById('venueAddress');
  if (addressEl) {
    addressEl.textContent = address;
  }
}

function initKakaoMap(lat, lng, venue) {
  const mapEl = document.getElementById('map');
  if (!mapEl) return;

  function showFallback() {
    mapEl.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999;font-size:0.85rem;flex-direction:column;gap:8px;">
        <span style="font-size:2rem;">🗺️</span>
        <span>카카오맵을 불러올 수 없습니다</span>
      </div>
    `;
  }

  if (typeof kakao === 'undefined' || typeof kakao.maps === 'undefined') {
    showFallback();
    return;
  }

  try {
    const position = new kakao.maps.LatLng(lat, lng);
    const map = new kakao.maps.Map(mapEl, {
      center: position,
      level: 3,
    });

    const marker = new kakao.maps.Marker({ position });
    marker.setMap(map);

    const infowindow = new kakao.maps.InfoWindow({
      content: `<div style="padding:5px 10px;font-size:12px;white-space:nowrap;">${venue}</div>`,
    });
    infowindow.open(map, marker);
  } catch (e) {
    console.error('카카오맵 초기화 실패:', e);
    showFallback();
  }
}

function setupNavLinks(lat, lng, venue) {
  const encodedVenue = encodeURIComponent(venue);

  // 카카오맵
  const kakaoLink = document.getElementById('naviKakao');
  if (kakaoLink) {
    kakaoLink.href = `https://map.kakao.com/link/to/${encodedVenue},${lat},${lng}`;
  }

  // 네이버지도
  const naverLink = document.getElementById('naviNaver');
  if (naverLink) {
    naverLink.href = `https://map.naver.com/v5/directions/-/-/-/transit?c=${lng},${lat},15,0,0,0,dh&destination=${encodedVenue},${lng},${lat}`;
  }

  // 티맵
  const tmapLink = document.getElementById('naviTmap');
  if (tmapLink) {
    tmapLink.href = `https://apis.openapi.sk.com/tmap/app/routes?appKey=&name=${encodedVenue}&lon=${lng}&lat=${lat}`;
  }
}
