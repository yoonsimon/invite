/**
 * 청첩장 설정 파일
 * 이 파일만 수정하면 모든 내용이 반영됩니다.
 */
const CONFIG = {
  // ===== 신랑 & 신부 정보 =====
  groom: {
    name: '신랑이름',
    father: '아버지성함',
    mother: '어머니성함',
  },
  bride: {
    name: '신부이름',
    father: '아버지성함',
    mother: '어머니성함',
  },

  // ===== 예식 정보 =====
  wedding: {
    date: '2027-05-15',        // YYYY-MM-DD
    time: '14:00',             // HH:mm (24시간)
    displayDate: '2027년 5월 15일 토요일 오후 2시',
    venue: '○○웨딩홀',
    hall: '○층 ○○홀',
    address: '○○시 ○○구 ○○로 123',
    lat: 37.5665,              // 위도
    lng: 126.9780,             // 경도
  },

  // ===== 인사말 =====
  greeting: `서로 다른 두 사람이 만나
같은 곳을 바라보며
함께 걸어가고자 합니다.

소중한 분들을 모시고
사랑의 약속을 하려 합니다.
축복해 주시면 감사하겠습니다.`,

  // ===== 갤러리 이미지 =====
  // images/ 폴더에 사진을 넣고 파일명을 아래에 추가하세요
  gallery: [
    'images/sample-1.jpg',
    'images/sample-2.jpg',
    'images/sample-3.jpg',
    'images/sample-4.jpg',
    'images/sample-5.jpg',
    'images/sample-6.jpg',
  ],

  // 메인 커버 이미지 (갤러리 첫 번째 사진 또는 별도 지정)
  coverImage: 'images/sample-1.jpg',

  // ===== 계좌 정보 =====
  accounts: {
    groom: [
      { bank: '○○은행', number: '000-000-000000', holder: '신랑이름' },
      { bank: '○○은행', number: '000-000-000000', holder: '아버지성함' },
      { bank: '○○은행', number: '000-000-000000', holder: '어머니성함' },
    ],
    bride: [
      { bank: '○○은행', number: '000-000-000000', holder: '신부이름' },
      { bank: '○○은행', number: '000-000-000000', holder: '아버지성함' },
      { bank: '○○은행', number: '000-000-000000', holder: '어머니성함' },
    ],
  },

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
