const addBook = document.forms['add-book'];
const addBookButton = document.querySelector('#submit');
const bookList = document.querySelector('.book-list');
let bookArray = [];

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = null;
  }
}

if (localStorage.getItem('bookArray') === null) {
  bookArray = [];
} else {
  bookArray = JSON.parse(localStorage.getItem('bookArray'));
}

function createBook(title, author) {
  const newBook = new Book(title, author);
  bookArray.push(newBook);
  localStorage.setItem('bookArray', JSON.stringify(bookArray));
}

addBookButton.addEventListener('click', (event) => {
  event.preventDefault();
  const bookTitle = addBook.querySelector('input[name="title"]').value;
  const bookAuthor = addBook.querySelector('input[name="author"]').value;
  createBook(bookTitle, bookAuthor);
  bookList.innerHTML += `<li class="book">
        <p class="title">${bookTitle}</p>
        <p class="author">${bookAuthor}</p>
        <button type="button" class="delete-btn">Remove</button>
        <hr />
      </li>`;
});

bookList.addEventListener('click', (e) => {
  if (e.target.className === 'delete-btn') {
    const book = e.target.parentElement;
    const bookTitle = book.querySelector('.title').innerHTML;
    const filt = bookArray.filter((book) => bookTitle.toLowerCase() === book.title.toLowerCase());
    const filtIndex = bookArray.indexOf(filt[0]);
    bookArray.splice(filtIndex, 1);
    localStorage.setItem('bookArray', JSON.stringify(bookArray));
    bookList.removeChild(book);
  }
});

bookArray.forEach((book) => {
  bookList.innerHTML += `<li class="book">
          <p class="title">${book.title}</p>
          <p class="author">${book.author}</p>
          <button type="button" class="delete-btn">Remove</button>
          <hr />
        </li>`;
});
