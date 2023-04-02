// 실시간 시계 ok
// 랜덤 배경 이미지 ok

// 로컬 스토리지를 사용한 로그인 x
// 로컬 스토리지를 사용한 투두리스트 x
// 날씨와 위치 (geolocation)x
// 여러분의 CSS 실력을 뽐내주세요💖

let loginForm = document.querySelector('#login-form');
let loginBtn = document.querySelector('#login-btn');
let loginInput = document.querySelector('#login-input');
let greeting = document.querySelector('#greeting');

let taskArea = document.querySelector('.task-area');
let inputArea = document.querySelector('.input-area');

let inputText = document.querySelector('.input-area__text');
let addBtn = document.querySelector('.input-area__btn');
let arrary = [];
let titleList = document.querySelector('.title-box');
let discription = document.querySelector('.discription');
const body = document.querySelector('body');
let time = document.querySelector('.time');

const images = [
  '훈이.jpg',
  '유리.jpg',
  '철수.jpeg',
  '흰둥이.jpeg',
  '부리부리3.png',
];
let randomIndex = Math.floor(Math.random() * images.length);
let container = document.querySelector('.container');

//로그인
const HIDDEN_CLASSNAME = 'hidden';
const USERNAME_KEY = 'username';
function loginHandle(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const userName = loginInput.value;
  localStorage.setItem(USERNAME_KEY, userName);
  greeting.innerHTML = `<span style="color:blue">${userName}</span> 님이 로그인함`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
  reMoveClassList();
  backImg();
}

//리무브 클래스
function reMoveClassList() {
  taskArea.classList.remove(HIDDEN_CLASSNAME);
  inputArea.classList.remove(HIDDEN_CLASSNAME);
  time.classList.remove(HIDDEN_CLASSNAME);
}

const savedUserName = localStorage.getItem(USERNAME_KEY);
loginForm.addEventListener('submit', loginHandle);

if (savedUserName === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  backImg();
} else {
  reMoveClassList();
  greeting.classList.remove(HIDDEN_CLASSNAME);
  greeting.innerHTML = `<span style="color:blue">${savedUserName}</span> 님이 로그인함`;
  backImg();
}

//인풋
function enterBtn(event) {
  event.preventDefault();
  let obType = {
    id: Math.floor(Math.random() * 1000),
    isComplete: false,
    inputValue: inputText.value,
  };
  inputText.value = '';
  arrary.push(obType);
  render();

  toDos.push(obType.inputValue);
  console.log(toDos);
  saveToDos();
}

addBtn.addEventListener('click', enterBtn);

//랜더
function render() {
  divHTML = '';

  discription.innerHTML = `<sapn style="color:lightgreen">전체할일 :${
    arrary.length
  } <sapn style="color:red">완료할일 :${checkCount()}</span>`;

  for (let i = 0; i < arrary.length; i++) {
    if (arrary[i].isComplete == true) {
      divHTML =
        divHTML +
        ` 
        <div class="title-list">
    <div class="title-list__title">
      <h4 class="textDone">${arrary[i].inputValue}</h4>
    </div>
    <div class="title-list__btn">
      <button class="title-list__btn1" onclick="checkBtn('${arrary[i].id}')">
      <i class="fa-solid fa-face-tired"></i>
      </button>
      <button class="title-list__btn2" onclick ="deleteBtn('${arrary[i].id}')">
        <i class="fa-solid fa-trash-can hello"></i>
      </button>
    </div>
  </div>`;
    } else {
      divHTML =
        divHTML +
        `
        <div class="title-list">
    <div class="title-list__title">
      <h4>${arrary[i].inputValue}</h4>
    </div>
    <div class="title-list__btn">
      <button class="title-list__btn1" onclick="checkBtn('${arrary[i].id}')">
        <i class="fa-solid fa-check-to-slot"></i>
      </button>
      <button class="title-list__btn2" onclick ="deleteBtn('${arrary[i].id}')">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  </div>`;
    }
  }

  titleList.innerHTML = divHTML;
}

//전체할일 카운트
function checkCount() {
  let count = 0;
  for (let i = 0; i < arrary.length; i++) {
    if (arrary[i].isComplete == true) {
      count++;
    }
  }
  return count;
}

//삭제버튼
function deleteBtn(b) {
  for (let i = 0; i < arrary.length; i++) {
    if (arrary[i].id == b) {
      arrary.splice([i], 1);
      break;
    }
  }
  render();
}

//체크버튼
function checkBtn(a) {
  for (let i = 0; i < arrary.length; i++) {
    if (arrary[i].id == a) {
      arrary[i].isComplete = !arrary[i].isComplete;
      break;
    }
  }
  render();
}

//시계
let getClock = () => {
  let date = new Date(); //new라서 객체임 현재 시간을 가저옴
  const clock = document.querySelector('#clock');

  let hour = String(date.getHours()).padStart(2, '0');
  let mimute = String(date.getMinutes()).padStart(2, '0');
  let second = String(date.getSeconds()).padStart(2, '0');

  clock.innerHTML = `<span style="color:red">${hour}시 ${mimute}분 ${second}초</span>`;
};

//타이머 함수를 통해서 1초마다 시간을 받아오게 작성
setInterval(getClock, 1000);
getClock();

//배경 이미지
function backImg() {
  container.style.backgroundImage = `url(./image/${images[randomIndex]})`;
  container.style.backgroundSize = '160px';
  container.style.backgroundRepeat = 'repeat';
}

backImg();

//로컬스토리지
let toDos = [];
const TODOS_KEY = 'todos';

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

const savedToDos = localStorage.getItem(TODOS_KEY);
console.log(savedToDos);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(render);
}

/////////////////API

function onGeoOk(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log('you live in', lat, lon);
}
function onGeoError() {
  alert('cant find you');
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

const APIKEY = '5cd573a8ce776f27da42df1c1a16a60a';
const url =
  'https://api.openweathermap.org/data/2.5/weather?lat=35.1688048&lon=129.1745855&appid=5cd573a8ce776f27da42df1c1a16a60a&units=metric';

fetch(url)
  .then(Response => Response.json())
  .then(data => {
    const weather = document.querySelector('#weather span:first-child');
    const city = document.querySelector('#weather span:last-child');
    const name = data.name;
    city.innerText = `위치 : ${name}`;
    weather.innerText = `날씨 : ${data.weather[0].main} / ${data.main.temp}`;
  });
