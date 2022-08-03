const addBook = document.forms['add-book'];
const addBookButton = document.querySelector('#submit');
const bookList = document.querySelector('.book-list');
const date = document.querySelector('.date');
let bookArray = [];

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = null;
  }

  createBook = (title, author) => {
    bookArray.push({ title, author });
  }

  removeBook = (book) => {
    const bookTitle = book.querySelector('.title').innerHTML;
    const filt = bookArray.filter((book) => bookTitle.toLowerCase() === book.title.toLowerCase());
    const filtIndex = bookArray.indexOf(filt[0]);
    bookArray.splice(filtIndex, 1);
  }

  updateCollection = () => {
    localStorage.setItem('bookArray', JSON.stringify(bookArray));
  }
}

if (localStorage.getItem('bookArray') === null) {
  bookArray = [];
} else {
  bookArray = JSON.parse(localStorage.getItem('bookArray'));
}

const bookOject = new Book();
addBookButton.addEventListener('click', (event) => {
  event.preventDefault();
  const bookTitle = addBook.querySelector('input[name="title"]').value;
  const bookAuthor = addBook.querySelector('input[name="author"]').value;
  if (bookTitle.length > 1 && bookAuthor.length > 1) {
    bookOject.createBook(bookTitle, bookAuthor);
    bookOject.updateCollection();
    bookList.innerHTML += `<li class="book">
          <p>
          "<span class="title">${bookTitle}</span>" by
          <span class="author">${bookAuthor}</span>
          </p>
          <button type="button" class="delete-btn">Remove</button>
        </li>`;
    if (document.querySelector('.validation-error')) {
      document.querySelector('.validation-error').style.display = 'none';
    }
    document.querySelectorAll('.input-text').forEach((element) => {
      element.value = '';
    });
  } else {
    const div = document.createElement('div');
    div.className = 'validation-error';
    div.textContent = 'Please Book Title or Book Author Shouldn\'t be empty';
    div.style.display = 'block';
    addBook.appendChild(div);
  }
});

bookList.addEventListener('click', (e) => {
  if (e.target.className === 'delete-btn') {
    const book = e.target.parentElement;
    bookOject.removeBook(book);
    bookOject.updateCollection();
    bookList.removeChild(book);
  }
});

bookArray.forEach((book) => {
  bookList.innerHTML += `<li class="book">
          <p>
          "<span class="title">${book.title}</span>" by
          <span class="author">${book.author}</span>
          </p>
          <button type="button" class="delete-btn">Remove</button>
        </li>`;
});

function dateFormat(date) {
  const daysArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const WeekDay = daysArr[date.getDay()];

  const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month = monthArr[date.getMonth()];

  let day = date.getDay();
  day = day.toString().padStart(2, '0');

  const year = date.getFullYear();

  let hour = date.getHours();
  hour = hour % 12 || 12;
  hour = hour.toString().padStart(2, '0');

  let minute = date.getMinutes();
  minute = minute.toString().padStart(2, '0');

  let sec = date.getSeconds();
  sec = sec.toString().padStart(2, '0');

  const time = hour < 12 ? 'AM' : 'PM';

  return `${WeekDay} ${month} ${day} ${year}, ${hour}:${minute}:${sec}  ${time}`;
}

setInterval(() => {
  date.innerHTML = dateFormat(new Date());
}, 200);

const nav = document.querySelectorAll('nav a');
nav.forEach((element) => {
  element.addEventListener('click', (e) => {
    if (e.target.innerText === 'List') {
      document.querySelector('.book-list-container').classList.remove('hide');
      document.querySelector('.new-book').classList.add('hide');
      document.querySelector('.contact-form').classList.add('hide');
    } else if (e.target.innerText === 'Add New') {
      document.querySelector('.new-book').classList.remove('hide');
      document.querySelector('.book-list-container').classList.add('hide');
      document.querySelector('.contact-form').classList.add('hide');
    } else if (e.target.innerText === 'Contact') {
      document.querySelector('.new-book').classList.add('hide');
      document.querySelector('.book-list-container').classList.add('hide');
      document.querySelector('.contact-form').classList.remove('hide');
    }
  });
});