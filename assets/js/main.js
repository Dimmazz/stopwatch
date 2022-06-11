// STOPWATCH

let seconds = 0
let isPaused = true
const listCircle = []

setInterval(() => {
  if(!isPaused){
    seconds++
    viewStopwatch(parserTime(seconds))
  }
}, 1000);


// PARSER TIME
// seconds => HH:MM:SS
function parserTime(seconds) {
  let sec = 0
  let min = 0
  let hours = 0
  

  // TAKE SEC
  sec = seconds
  // 3665 sec = 3665 seconds

  // TAKE HOURS
  hours = sec / 3600
  hours = Number(Math.floor(hours))
  // hours = (3665 / 3600) // => 1
  sec = (sec % 3600) 
  // sec = (3665 % 3600) // => 65 sec

  //TAKE MIN
  min = sec / 60
  min = Number(Math.floor(min))
  // min = (65 / 60) // => 1
  sec = (sec % 60)  
  // sec = (65 % 60) // => 5 sec

  ///// sec = 5, min = 1, hours = 1

  if (String(hours).length < 2) {
    hours = '0' + String(hours)
  }

  if (String(min).length < 2) {
    min = '0' + String(min)
  }

  if (String(sec).length < 2) {
    sec = '0' + String(sec)
  }



  return [hours, min, sec]
}



// COUNTER CLEAR 
function counterClear() {
  seconds = 0
}



// COUNTER ON PAUSE 
function counterPause() {
  if (isPaused == false) {
    isPaused = true
    return
  }
  
  if (isPaused == true) {
    isPaused = false
    return
  }
}


// START COUNER
function counterStart() {
  counterPause()
}

// STOP COUNTER
function counterReset() {
  viewStopwatch(parserTime(0))
  counterPause()
  counterClear()  
}

// CIRCLE OF TIME
function setCircle() {
  if (seconds != 0 && listCircle.indexOf(seconds) == -1) {
    listCircle.push(seconds)
  }
  viewListCircle()
}

// View Stopwatch
function viewStopwatch(seconds) {
  const blockStopwatch = document.querySelector(".js-stopwatch")

  blockStopwatch.innerHTML = `${seconds[0]}:${seconds[1]}:${seconds[2]}`
}



// View List Circle
function parserListCircle() {
  let difference = 0
  let htmlListCircle = []

  for (let index = 0; index < listCircle.length; index++) {
    const circle = listCircle[index];

    id = index + 1
    time = circle

    if (index == 0){
      difference =  0
    }

    if (index !== 0) {
      difference = time - listCircle[index - 1]
    }

    // console.log(parserTime(time), parserTime(difference));
    htmlListCircle.push({
      "id": id,
      "time": time,
      "difference": difference
    })
  }

  return htmlListCircle;
}

function viewListCircle() {
  const htmlListCircle = parserListCircle()
  const blockListCircle = document.querySelector(".js-list-circle")
  blockListCircle.innerHTML = '';

  for (let index = 0; index < htmlListCircle.length; index++) {
    const itemListCircle = htmlListCircle[index];
    parseTime = parserTime(itemListCircle.time);
    parseDifference = parserTime(itemListCircle.difference);
    
    blockListCircle.innerHTML += `<li><span>${itemListCircle.id}</span>${parseTime[0]}:${parseTime[1]}:${parseTime[2]} | ${parseDifference[0]}:${parseDifference[1]}:${parseDifference[2]}</li>`
  } 
}


// Events

const btnStart = document.querySelector(".btn--start")
const btnPause = document.querySelector(".btn--pause")
const btnSetCircle = document.querySelector(".btn--set-circle")
const btnReset = document.querySelector(".btn--reset")


btnStart.addEventListener("click", () => {
  counterStart()
})

btnPause.addEventListener("click", () => {
  counterPause()
})

btnSetCircle.addEventListener("click", () => {
  setCircle()
})

btnReset.addEventListener("click", () => {
  counterReset()
})