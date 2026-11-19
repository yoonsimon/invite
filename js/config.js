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
    'https://lh3.googleusercontent.com/d/1v7bLUzf9tS4OlUKGz7T8Us4HG1VZHwKM',
    'https://lh3.googleusercontent.com/d/14EVcH2Fq3uOzuO5hxrlu0oQ1ZDKq-rsM',
    'https://lh3.googleusercontent.com/d/1JBkR7mVs-c0a2Xtcl8O3BJLYDs3f61kX',
    'https://lh3.googleusercontent.com/d/1VmU2e4qPY2QdgRXruoh-14ca9t4m2Yzc',
    'https://lh3.googleusercontent.com/d/1WPiwKZFD52onsKTHXU5AjiGmhlGKdq92',
    'https://lh3.googleusercontent.com/d/1B0MyqiVQwi_AsDn5U0FPbUkKUnMgRCcT',
    'https://lh3.googleusercontent.com/d/12tzbCfI3QM_W_Pg43_HSScLO5DQuR-YN',
    'https://lh3.googleusercontent.com/d/1dSi107UsSNGT2VEPPPEBLMIucss09vw0',
    'https://lh3.googleusercontent.com/d/1fBn7lkkzqHFpuXuErgKByvb8SR_0gNNs',
    'https://lh3.googleusercontent.com/d/1_ujoF6q2gQzVn2Xn2FkwbRRPDqM8Z-9V',
    'https://lh3.googleusercontent.com/d/1mK9xzlo6PChbZq3o3Il0e3uipY-Sje8Z',
    'https://lh3.googleusercontent.com/d/1mqIAd6ZjIY3m9xhE29ElhgHa0-gb-1VL',
    'https://lh3.googleusercontent.com/d/1jXlFN8yw9RqR4fmngdgvaJDY-x-NF86p',
    'https://lh3.googleusercontent.com/d/1iKRWIzm2HkhWZkueDPZfJGTOeQbF4bQI',
    'https://lh3.googleusercontent.com/d/1EwRYtbm-YtBaOhbfQN2tlwuD__SaB_0R',
    'https://lh3.googleusercontent.com/d/1TDUDdQh73AO4VBbjE0ljPdFoWFQwMzvn',
    'https://lh3.googleusercontent.com/d/1Ha7RUmaMxEfemOenuuHXR3DPQr0CuCr2',
    'https://lh3.googleusercontent.com/d/1B5jJrCwzlSHReZYpZnyibRcYj-DiVf_h',
    'https://lh3.googleusercontent.com/d/1wTNFYuKxato7Q_V0B9ZIlz56fXG4FFkY',
    'https://lh3.googleusercontent.com/d/1c9mXz948qjLzAsKF0Ahjh5esB_ZgLbNZ',
  ],

  coverImage: 'https://lh3.googleusercontent.com/d/11XGQpWJTOarPukbzdCoTAHBunXDVzcxp',

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
