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
          <p class="title">${bookTitle}</p>
          <p class="author">${bookAuthor}</p>
          <button type="button" class="delete-btn">Remove</button>
          <hr />
        </li>`;
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
          <p class="title">${book.title}</p>
          <p class="author">${book.author}</p>
          <button type="button" class="delete-btn">Remove</button>
          <hr />
        </li>`;
});
