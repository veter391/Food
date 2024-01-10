function timer(id, deadline) {
  //::::::::::::TIMER::::::::::::::: 
  const getTimerRemaining = (endtime) => {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date()),
          timeZone = new Date().getTimezoneOffset();

    if (t <= 0) {
      days = 0,
      hours = 0,
      minutes = 0,
      seconds = 0;
    } else {
      days = Math.floor(t / 1000 / 60 / 60 / 24),
      hours = Math.floor(t / 1000 / 60 / 60) % 24 + (timeZone / 60),
      minutes = Math.floor(t / 1000 / 60) % 60,
      seconds = Math.floor(t / 1000) % 60;
    }

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  };

  const getZero = (num) => {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } 

    return num;
  };

  const setClock = (selector, endtime) => {

    function updateClock() {
      const t = getTimerRemaining(endtime);

      days.textContent = getZero(t.days);
      hours.textContent = getZero(t.hours);
      minutes.textContent = getZero(t.minutes);
      seconds.textContent = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }

    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);

    updateClock();
  };

  setClock(id, deadline);
}

export default timer;