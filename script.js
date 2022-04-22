var threshold = 0.01;
var inputTime;
let integerSign = true;

let questionNum = 0;

document.addEventListener("keypress", (e) => {
  var keys = [
    ["&", "1"],
    ["é", "2"],
    ['"', "3"],
    ["'", "4"],
    ["(", "5"],
    ["§", "6"],
    ["è", "7"],
    ["!", "8"],
    ["ç", "9"],
    ["à", "0"],
  ];

  for (let i = 0; i < keys.length; i++) {
    if (keys[i].includes(e.key)) {
      if (keys[i][1] == "0") {
        keyPress(10);
      } else {
        keyPress(keys[i][1]);
      }

      break;
    }
  }
});

function executeOrder66() {
  document.querySelector(".timesUpMsg").classList.remove("active");
  questionNum++;
  let isPaused = false;
  var hasReachedZero = false;

  let inputMinutes = inputTime;
  let timeSecond = (inputMinutes * 60).toFixed(1);
  let startingVal = timeSecond;

  const timerDOM = document.querySelector(".timer");

  displayTime(timeSecond);

  const countDown = setInterval(() => {
    if (isPaused) return;

    var zeroReplacer;

    for (let i = 0; i < 10000; i++) {
      var ans = startingVal - i;
      if (ans < 0) {
        zeroReplacer = startingVal - (i - 1);
        break;
      }
    }

    if (timeSecond == zeroReplacer) {
      document.querySelector(".timesUpMsg").classList.add("active");
      hasReachedZero = true;
      integerSign = false;
    }

    hasReachedZero ? timeSecond++ : timeSecond--;

    displayTime(timeSecond);
  }, 1000);

  document.addEventListener("keypress", (e) => {
    if (e.code == "Space") pauseFunc();

    if (e.key === "Enter") {
      let inverseOfTimeSecond = 0 - timeSecond;

      const hr = Math.floor(timeSecond / 3600);
      const min = Math.floor((timeSecond / 60) % 60);
      const sec = Math.floor(timeSecond % 60);
      let str =
        String(hr).padStart(2, "0") +
        ":" +
        String(min).padStart(2, "0") +
        ":" +
        String(sec).padStart(2, "0");

      !document.body.classList.contains("active")
        ? localStorage.setItem(
            `Question Number: ${questionNum}`,
            `${timeSecond} seconds, ${str}`
          )
        : localStorage.setItem(
            `Question Number: ${questionNum}`,
            `${inverseOfTimeSecond} seconds, ${str}`
          );

      reset();
    }

    if (e.key === "t") {
      var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

      while (i--) {
        values.push(localStorage.getItem(keys[i]));
      }

      var seconds = 0;
      for (let j = 0; j < values.length; j++) {
        var [hrs, mins, secs] = values[j].split(":");

        seconds += secs + mins * 60 + hrs * 3600;
      }

      var timeSaved =
        String(Math.floor(seconds / 3600)).padStart(2, "0") +
        ":" +
        String(Math.floor((seconds / 60) % 60)).padStart(2, "0") +
        ":" +
        String(Math.floor(seconds % 60)).padStart(2, "0");

      console.log(timeSaved);
    }

    if (e.key === "c") {
      window.localStorage.clear();
    }
  });

  function displayTime(second) {
    const hr = Math.floor(second / 3600);
    const min = Math.floor((second / 60) % 60);
    const sec = Math.floor(second % 60);
    let str =
      String(hr).padStart(2, "0") +
      ":" +
      String(min).padStart(2, "0") +
      ":" +
      String(sec).padStart(2, "0");
    timerDOM.innerHTML = str;
  }

  function reset() {
    var resetVal = "00:00:00";
    document.querySelector(".timer").textContent = resetVal;
    document.querySelector(".timesUpMsg").classList.remove("active");
    clearInterval(countDown);
  }
}

function keyPress(keyNum) {
  inputTime = threshold * keyNum;
  executeOrder66();
}
