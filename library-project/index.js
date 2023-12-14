const selectForm = document.getElementById('lib-form');
const selectTitle = document.getElementById('title');
const selectAuthor = document.getElementById('author');
const selectNumOfPages = document.getElementById('num-of-pages');
const selectRadio = document.getElementsByName('radio-value');
const selectYes = document.getElementById('radio-yes');
const selectNo = document.getElementById('radio-no');
const selectBtn = document.getElementById('submit');
const selectTr = document.getElementById('tr-btn');
const createRow = document.createElement('tr');
let selectTable = document.querySelector('table');
const selectTitleError = document.getElementById('title-err');
const selectAuthorError = document.getElementById('author-err')
const selectNumError = document.getElementById('num-err')
const myLibrary = [];


let str;
let node;

function Book(counter, title, author, numOfPages, isRead) {
  this.counter = counter
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.isRead = isRead;
}

selectTitle.value = '';
selectAuthor.value = '';
selectNumOfPages.value = '';

//radio checkbox variable
let selectValue;

//book/row id
let counter = 0;

function addBookToLibrary() {
  selectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(([selectTitle.value, selectAuthor.value, selectNumOfPages.value].some(el => el === '')) || [selectYes, selectNo].every(el => el.checked === false)) {
      selectTitle.value === '' ? selectTitleError.innerText = 'Empty title field!' : selectTitleError.innerText = '';

      selectAuthor.value === '' ? selectAuthorError.innerText = 'Empty author field!' : selectAuthorError.innerText = '';

      selectNumOfPages.value === '' ? selectNumError.innerText = 'Empty pages field!' : selectNumError.innerText = '';

    }

    else if(myLibrary.some(book => book.title === selectTitle.value)){
      selectTitleError.innerText = 'Duplicate title!'
    }
    else {
      selectTitleError.innerText = '';
      selectAuthorError.innerText = '';
      selectNumError.innerText = '';
      selectYes.checked === true ? selectValue = selectYes.value : selectValue = selectNo.value;
      const book = new Book(counter, selectTitle.value, selectAuthor.value, selectNumOfPages.value, selectValue);
      myLibrary.push(book);
      selectTable.innerHTML += `<tr id="${counter}"><td>${book.title}</td>
                                                    <td>${book.author}</td><td>${book.numOfPages}</td>
                                                    <td>${book.isRead}</td>
                                                    <td id="delete-row" class="delete-row">Delete</td></tr>`;
      counter++;
      removeBookFromLibrary();
    }
  })
}

function removeInstanceOfBook(myLibrary, btn) {
  myLibrary.forEach(book => {
    if(book.counter == btn.parentElement.getAttribute('id')) {
      delete myLibrary[book.counter];
    }
  })
    
}

function removeBookFromLibrary() {
  document.querySelectorAll('.delete-row').forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault()
    removeInstanceOfBook(myLibrary, btn);
    btn.parentElement.remove();
  })
  )
}




addBookToLibrary();











