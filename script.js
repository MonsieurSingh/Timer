var audio = new Audio('ping.mp3');

var threshold = 0.01;
var inputTime;
let integerSign = true;

let questionNum = 0;

const timeH = document.getElementById("timeI");

var isPaused;

function convertToDisplay(seconds) {
  let isNeg = false;

  if (seconds < 0) {
    isNeg = true;
    seconds = Math.abs(seconds);
  }

  let fHours  = Math.floor(seconds / 3600);
  let fMinutes = Math.floor((seconds / 60) % 60);
  let fSeconds = Math.floor(seconds % 60);
  let fString = String(fHours).padStart(2, "0") + ":" + 
            String(fMinutes).padStart(2, "0") + ":" + 
            String(fSeconds).padStart(2, "0");

  if (isNeg) fString = `-${fString}`;
  return fString;
}

  // Display output
  function displayTime(input) {
    timeH.innerHTML = convertToDisplay(input);
  }

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
            


function clear() {
  window.localStorage.clear();
}

function pause() {
  isPaused ? isPaused = false : isPaused = true;

  const pauseKey = document.querySelector('.pauseKey');
  pauseKey.textContent == "Pause" ? pauseKey.textContent = "Play" : pauseKey.textContent = "Pause";
}

function executeOrder66() {
  
  function totalTime(ein) {
    if (!hasReachedZéro) {
      timeDifference = ein;
    } else if (hasReachedZéro) {
      timeDifference = 0 - ein;
    };
    return timeDifference;
  }

  document.body.classList.remove('active');
  questionNum++;
  let x = 0;
  isPaused = false;
  var hasReachedZéro = false;
  
  
  let inputMinutes = inputTime;
  let timeSecond = (inputMinutes * 60).toFixed(1);
  let startingVal = timeSecond;
  
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

      let fetchedTime = localStorage.getItem('Time Saved')
      if (fetchedTime == null) {
        fetchedTime = 0;
      }
    
      
      timeSavedNow = totalTime(timeSecond);
      totalTimeSaved = parseFloat(timeSavedNow) + parseFloat(fetchedTime)
      localStorage.setItem('Time Saved', totalTimeSaved)

      let inverseOfTimeSecond = 0 - timeSecond;
      let finalTimeOutput = convertToDisplay(timeSecond)
      

      !hasReachedZéro ? 
      localStorage.setItem(`Question Number: ${questionNum}`,
        `${timeSecond} seconds, ${finalTimeOutput}`):
      localStorage.setItem(`Question Number: ${questionNum}`, 
        `${inverseOfTimeSecond} seconds, -${finalTimeOutput}`);

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

    };

    if (e.key === "c") {
      window.localStorage.clear();
    }
  });
  
  function endCount() {
    document.body.classList.toggle('active');
  }

  function reset() {
    var resetVal = "00:00:00";
    document.querySelector('#timeI').textContent = resetVal;
    document.body.classList.remove('active');
    clearInterval(countDown);
    timeSecond = 0;
  }
};

function keyPress(keyNum) {
  inputTime = threshold * keyNum;
  executeOrder66();
}