const mainEl = document.querySelector('.main');
// создаем див для карточки
const wrapper = document.createElement('div')
// создаем форму
const formEl = document.createElement('form');
// asyn так как запрос на сервер
formEl.addEventListener("submit", async(e)=>{
    e.preventDefault();
    // создаем переменную которая будет выводить из полученного массива нужный аргумент Object.fromEntries - переобразовует массив в получение данных FormData- прочитает правильно HTML форму target- ссылает на элемент нажатый (дочерний)
    const inputsValue = Object.fromEntries(new FormData(e.target));
    // запрос на сервер `` - чтобы вводить переменную
    const response = await fetch(`https://api.github.com/users/${inputsValue.name}`)
    // свойство ок если true
    if(response.ok){
    // получили массив нужно распарсить await - если запрос с сервера 
    const data = await response.json();
    // добавляем карточку 
    wrapper.appendChild(createProfileEl(data))
    // добавляем в контейнер
    mainEl.appendChild(wrapper);
    // очищаем после того как ввели данные
    inputEl.value = '';
    }else{
        alert("Пользователь не найден")
    }
})
// создаем инпут
const inputEl = document.createElement('input');
inputEl.classList.add('search-input');
// cоздаем атрибут который добавляет значение для того чтобы мы получили из них данные
inputEl.setAttribute('name', 'name')
// создаем поиск
const searchButtonEl = document.createElement('button')
searchButtonEl.classList.add('search-button');
searchButtonEl.setAttribute('type', 'submit');
searchButtonEl.innerHTML = "Поиск";
// выводим
formEl.appendChild(inputEl);
formEl.appendChild(searchButtonEl);
mainEl.appendChild(formEl);
// создаем фун для вывода карточки товара
function createProfileEl(profileData) {
    const element = document.createElement('div');
    element.classList.add('profile');
    // выводим по полученным данным API Github пользователя
    element.innerHTML = `
      <img class="search-image" src=${profileData.avatar_url}></img>
      <p class="search-text"><span>Имя: </span>${profileData.name}</p>
      <p class="search-text"><span>Город: </span>${profileData.location}</p>
      <p class="search-text"><span>О себе: </span>${profileData.bio}</p>
    `
    // добавляем кнопку удалить
    element.appendChild(createDeleteBtnEl())
    return element;
  }
//   фун которая будет удалять
  function createDeleteBtnEl() {
    const element = document.createElement('button');
    element.classList.add('delete-button');
    element.innerText = "Удалить";
    element.addEventListener('click', (e) => {
        // удаляем или просто перавниваем к пустой строку
      wrapper.innerHTML = ''
    })
  
    return element
}