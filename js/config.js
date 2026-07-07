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
