/* ------------------ 로직 정리 ------------------------------
1. 유저가 input-area__text에 값을 입력한다
2. +버튼을 클릭하면 , 할일(Item)이 추가된다
(할일은 taskList 배열을 만들어서 추가)
3. 유저가 아래의 휴지통 버튼을 클릭하면 할일이 삭제된다.
4. check버튼을 클릭하면 할일이 끝나면서 완료-밑줄이 들어간다
5. 네브바를 누르면 언더바가 이동한다 
6. 각 네브바의 리스트를 정리한다(모든목록 : 전체 목록 보여줌 , 끝난목록 : END목록보여줌 등)

----------중간 중간 콘솔로 해당 코드가 작동하는지 확인 잘하자 :)-----------------
*/

let inputText = document.querySelector('.input-area__text');
let addBtn = document.querySelector('.input-area__btn');
let arrary = [];
let titleList = document.querySelector('.title-list');

function addButton() {
  let inputValue = inputText.value;
  arrary.push(inputValue);
  console.log(arrary);
}

addBtn.addEventListener('click', addButton);

function render() {
  let resultHTML = '';

  for (let i = 0; i < arrary.length; i++) {
    resultHTML =
      resultHTML +
      `<div class="title-list__title">
<h4>하이</h4>
</div>
<div class="title-list__btn">
<button class="title-list__btn1">
  <i class="fa-solid fa-check-to-slot"></i>
</button>
<button class="title-list__btn2">
  <i class="fa-solid fa-trash-can"></i>
</button>
</div>`;
  }

  titleList.innerHTML = resultHTML;
}
