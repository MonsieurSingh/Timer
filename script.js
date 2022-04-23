let data = [];
var audio = new Audio('ping.mp3');

var threshold = 0.01;
var inputTime;
let integerSign = true;

let questionNum = 0;

document.addEventListener('keypress', (e) => {

  switch(e.key) {
    case '&':
      case '1':
        inputTime = threshold * 1;
        executeOrder66()
        break;
        
    case 'é':
      case '2':
        inputTime = threshold * 2;
        executeOrder66()
        break;
        
    case '\"':
      case '3':
        inputTime = threshold * 3;
      executeOrder66();
      break;
      
      case '\'':
        case '4':
          inputTime = threshold * 4;
          executeOrder66();
          break;
          
          case '\(':
            case '5':
      inputTime = threshold * 5;
      executeOrder66();
      break;
      
      case '§':
        case '6':
          inputTime = threshold * 6;
          executeOrder66();
      break;
      
      case 'è':
        case '7':
          inputTime = threshold * 7;
          executeOrder66();
          break;
          
          case '!':
            case '8':
              inputTime = threshold * 8;
              executeOrder66();
              break;
              
              
        case 'ç':
          case '9':
            inputTime = threshold * 9;
            executeOrder66();
            break;
            
            case 'à':
              case '0':
                inputTime = threshold * 10;
                executeOrder66();
                break;
                
              }
            })
            
function executeOrder66() {
  
  document.body.classList.remove('active');
  questionNum++;
  let x = 0;
  let isPaused = false;
  var hasReachedZéro = false;
  
  
  let inputMinutes = inputTime;
  let timeSecond = (inputMinutes * 60).toFixed(1);
  let startingVal = timeSecond;
  
  const timeH = document.getElementById("timeI");
  
  displayTime(timeSecond);
  
  const countDown = setInterval(() => {
    if (!isPaused) {
      var zeroReplacer;

      for (let i = 0; i<10000; i++) {
        var ans = startingVal - i;
        if (ans < 0) {
          zeroReplacer = startingVal - (i - 1);
          console.log(zeroReplacer);
          break;
        }
      }
      
      if (timeSecond == zeroReplacer) {
        endCount();
        // countUp();
        audio.play();
        hasReachedZéro = true;
        integerSign = false;
        // clearInterval(countDown);
      }
      
      if (x !== 0) {
        const hr  = Math.floor(timeSecond / 3600);
        const min = Math.floor((timeSecond / 60) % 60);
        const sec = Math.floor(timeSecond % 60);
        let str = String(hr).padStart(2, "0") + ":" + String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
        
        data.push(str);
        
        return
      };
      
      if (!isPaused && !hasReachedZéro) timeSecond--;
      if (!isPaused && hasReachedZéro ) {
        timeSecond++
      }
      
      displayTime(timeSecond);

    }
  }, 1000);
  
  document.addEventListener('keypress', (e) => {
    if (e.code == "Space") isPaused ? isPaused = false : isPaused = true;

    if (e.key === "Enter") {

      let inverseOfTimeSecond = 0 -  timeSecond;

      const hr  = Math.floor(timeSecond / 3600);
      const min = Math.floor((timeSecond / 60) % 60);
      const sec = Math.floor(timeSecond % 60);
      let str = String(hr).padStart(2, "0") + ":" + String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
      

      !document.body.classList.contains('active') ? 
      localStorage.setItem(`Question Number: ${questionNum}`, `${timeSecond} seconds, ${str}`):
      localStorage.setItem(`Question Number: ${questionNum}`, `${inverseOfTimeSecond} seconds, ${str}`);

      x++;

      reset();
    };

    if (e.key === "t") {
      var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

      while (i--) {
          values.push( localStorage.getItem(keys[i]) );
      }

      var seconds = 0;
      for (let j = 0; j < values.length; j++) {
        var [hrs, mins, secs] = values[j].split(":");

        seconds += secs + (mins * 60) + (hrs * 3600); 
      }

      var timeSaved = String(Math.floor(seconds / 3600)).padStart(2, "0") + ":" + String(Math.floor((seconds / 60) % 60)).padStart(2, "0") + ":" + String(Math.floor(seconds % 60)).padStart(2, "0");

      console.log(timeSaved);
    };

    if (e.key === "c") {
      window.localStorage.clear();
    }
  });

  function countUp() {
    return setInterval(() => {
      if (x !== 0) {
        return;
      }
      timeSecond++;
      displayTime(timeSecond);
    }, 1000);
  }
  
  function displayTime(second) {
    const hr  = Math.floor(second / 3600);
    const min = Math.floor((second / 60) % 60);
    const sec = Math.floor(second % 60);
    let str = String(hr).padStart(2, "0") + ":" + String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0")
    timeH.innerHTML = str;
  }
  
  function endCount() {
    document.body.classList.toggle('active');
  }

  function reset() {
    var resetVal = "00:00:00";
    document.querySelector('#timeI').textContent = resetVal;
    document.body.classList.remove('active');
    clearInterval(countDown);
  }
};

function keyPress(keyNum) {
  inputTime = threshold * keyNum;
  executeOrder66();
}