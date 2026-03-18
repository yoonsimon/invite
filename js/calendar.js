/**
 * 캘린더 - 정적 달력 UI + D-day 표시
 */
function initCalendar() {
  const grid = document.getElementById('calendarGrid');
  const ddayEl = document.getElementById('dday');
  if (!grid) return;

  const weddingDate = new Date(CONFIG.wedding.date + 'T' + CONFIG.wedding.time);
  const year = weddingDate.getFullYear();
  const month = weddingDate.getMonth();
  const day = weddingDate.getDate();

  // 요일 헤더
  const dows = ['일', '월', '화', '수', '목', '금', '토'];
  dows.forEach((d) => {
    const el = document.createElement('div');
    el.className = 'calendar__dow';
    el.textContent = d;
    grid.appendChild(el);
  });

  // 해당 월 첫째 날 요일, 마지막 날짜
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  // 빈 칸
  for (let i = 0; i < firstDayOfWeek; i++) {
    const el = document.createElement('div');
    el.className = 'calendar__day calendar__day--empty';
    grid.appendChild(el);
  }

  // 날짜
  for (let d = 1; d <= lastDate; d++) {
    const el = document.createElement('div');
    const dayOfWeek = new Date(year, month, d).getDay();
    let cls = 'calendar__day';

    if (d === day) cls += ' calendar__day--wedding';
    else if (dayOfWeek === 0) cls += ' calendar__day--sunday';
    else if (dayOfWeek === 6) cls += ' calendar__day--saturday';

    el.className = cls;
    el.textContent = d;
    grid.appendChild(el);
  }

  // D-day 계산
  if (ddayEl) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(year, month, day);
    target.setHours(0, 0, 0, 0);
    const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));

    if (diff > 0) {
      ddayEl.textContent = `결혼식까지 D-${diff}`;
    } else if (diff === 0) {
      ddayEl.textContent = '오늘 결혼합니다!';
    } else {
      ddayEl.textContent = `결혼한 지 ${Math.abs(diff)}일`;
    }
  }

  // 날짜 표시 업데이트
  const datetimeEl = document.querySelector('.calendar__datetime');
  if (datetimeEl) {
    datetimeEl.textContent = CONFIG.wedding.displayDate;
  }
}
