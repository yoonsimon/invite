/**
 * 청첩장 설정 파일
 * 이 파일만 수정하면 모든 내용이 반영됩니다.
 */
const CONFIG = {
  // ===== 신랑 & 신부 정보 =====
  // ⚠️ 실제 이름·부모님 성함은 여기 두지 말 것 (공개 repo 유출).
  //    민감정보는 Firestore `invite/private` 에서 런타임 로드된다 (secret.js).
  //    아래는 로드 전 폴백용 빈 값.
  groom: { name: '', father: '', mother: '' },
  bride: { name: '', father: '', mother: '' },

  // ===== 예식 정보 =====
  wedding: {
    date: '2027-04-18',        // YYYY-MM-DD
    time: '11:00',             // HH:mm (24시간)
    displayDate: '2027년 4월 18일 일요일 오전 11시',
    venue: '규수당 문래점',
    hall: '2층',
    address: '서울 영등포구 문래로 164 SK리더스뷰 2층',
    lat: 37.5178,              // 위도
    lng: 126.9001,             // 경도
  },

  // ===== 인사말 =====
  greeting: `서로 다른 두 사람이 만나
같은 곳을 바라보며
함께 걸어가고자 합니다.

소중한 분들을 모시고
사랑의 약속을 하려 합니다.
축복해 주시면 감사하겠습니다.`,

  // ===== 갤러리 이미지 =====
  // Google Drive에 올린 청첩장 웹용 사진 주소
  gallery: [
    'https://lh3.googleusercontent.com/d/1z2jWhXdDNkHeX1qXkawJ55hfg_hL8VvH=d',
    'https://lh3.googleusercontent.com/d/1tha3MxUsoiLb--c2gyNHKXWrR-RGGfgc=d',
    'https://lh3.googleusercontent.com/d/1PqJQvMdFN8DsfommFbZ15Gg7oNLIt8SJ=d',
    'https://lh3.googleusercontent.com/d/10LdPIzZt_1z-bRiOXfiHGZSGKuq01h-E=d',
    'https://lh3.googleusercontent.com/d/1-pip_rJ7LAH5M__bzGdEMjOyBN5yqetC=d',
    'https://lh3.googleusercontent.com/d/1Wy3JhA45FPeIr0XIUk_csn4oRYB3BYos=d',
    'https://lh3.googleusercontent.com/d/1blebBPZNpQiS7hQdIIgoZ65fJ64gDsGU=d',
    'https://lh3.googleusercontent.com/d/1pNwVhxG_xTjDUTmgFsVl1azLX0vUCOV1=d',
    'https://lh3.googleusercontent.com/d/1HcPaSbTvMWpe-kXEtI2lI-jiL-AOVOHk=d',
    'https://lh3.googleusercontent.com/d/1V_1ZfV6C4UfwwsffYjFw-EM34r-9l5SZ=d',
    'https://lh3.googleusercontent.com/d/1JNkaX9jyOH7phBykjI2sp371vdQZuSKc=d',
    'https://lh3.googleusercontent.com/d/1Xhzo4vKL9DUgKR76aswno1QZIfsvWlCD=d',
    'https://lh3.googleusercontent.com/d/1m9eMOfZWyUDTCrFcKuy562uEYqPuhWx4=d',
    'https://lh3.googleusercontent.com/d/1DdENYIZcdQeMTYkDG_SW-eFkOUneKyQg=d',
    'https://lh3.googleusercontent.com/d/1MIYE_3ld3ymNCPActfRIBiIBToiDH1X7=d',
    'https://lh3.googleusercontent.com/d/1cgnU3o8HCblKzgRXKd86xiAJcazEiBoh=d',
    'https://lh3.googleusercontent.com/d/12McdE1H57RCN1x9mkEza_gX4UAUN5npI=d',
    'https://lh3.googleusercontent.com/d/1mqIAd6ZjIY3m9xhE29ElhgHa0-gb-1VL',
    'https://lh3.googleusercontent.com/d/1OAei2x2QukChlW0XudSldVcZ-MxceFc9=d',
    'https://lh3.googleusercontent.com/d/1Zns7yOvAINhLMxNw6GaSqdDiLVM8U0pI=d',
    'https://lh3.googleusercontent.com/d/1Ibl91wjPswMGjBaRGyRvcq1AMSbs5yDJ=d',
  ],

  coverImage: 'https://lh3.googleusercontent.com/d/1z2jWhXdDNkHeX1qXkawJ55hfg_hL8VvH=d',

  // ===== 계좌 정보 =====
  // ⚠️ 실제 계좌번호는 여기 두지 말 것. Firestore `invite/private` 에서 런타임 로드.
  accounts: { groom: [], bride: [] },

  // ===== Firebase 설정 =====
  firebase: {
    apiKey: 'AIzaSyCep8tpO-Cyk4itQOLYKugyYXPghk8cFrQ',
    authDomain: 'invite0420-d3006.firebaseapp.com',
    projectId: 'invite0420-d3006',
    storageBucket: 'invite0420-d3006.firebasestorage.app',
    messagingSenderId: '764877499266',
    appId: '1:764877499266:web:0bab33ddd2d6596c487d9b',
  },

  // ===== 카카오맵 API 키 =====
  kakaoMapApiKey: 'f8bba6bb7016e10cec2ab6108eda3f94',
};
