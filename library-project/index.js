const selectForm = document.getElementById('lib-form');
const selectTitle = document.getElementById('title');
const selectAuthor = document.getElementById('author');
const selectNumOfPages = document.getElementById('num-of-pages');
const selectRadio = document.getElementsByName('radio-value');
const selectYes = document.getElementById('radio-yes');
const selectNo = document.getElementById('radio-no');
const selectErr = document.getElementById('error-msg');
let selectTable = document.querySelector('table');
const myLibrary = [];


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
    if(myLibrary.some(book => book.title === selectTitle.value)) {
      selectErr.innerText = 'Duplicate title.';
    }

    else if(([selectTitle.value, selectAuthor.value, selectNumOfPages.value].some(el => el === '')) || [selectYes, selectNo].every(el => el.checked === false)) {
      selectErr.innerText = 'Fill all the forms.';  
    }
    else {
      selectErr.innerText = '';
      selectYes.checked === true ? selectValue = selectYes.value : selectValue = selectNo.value;
      const book = new Book(counter, selectTitle.value, selectAuthor.value, selectNumOfPages.value, selectValue);
      myLibrary.push(book);
      selectTable.innerHTML += `<tr id="${counter}"><td>${book.title}</td>
                                    <td>${book.author}</td><td>${book.numOfPages}</td>
                                    <td>${book.isRead}</td>
                                    <td id="delete-row" class="delete-row">Delete</td></tr>`;
      counter++;
      removeBookFromLibrary(book);
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
  document.querySelectorAll('.delete-row').forEach(btn => btn.addEventListener('click', () => {
    removeInstanceOfBook(myLibrary, btn);
    btn.parentElement.remove();
  })
  )
}




addBookToLibrary();











