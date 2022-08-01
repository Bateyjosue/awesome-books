const addBook = document.forms['add-book'];
const addBookButton = document.querySelector('#submit');
const bookList = document.querySelector('.book-list')
const bookArray = [
    {
        title: 'Lorem Ipsum 1',
        author: 'Author A'
    },
    {
        title: 'Lorem Ipsum 2',
        author: 'Author B'
    },
];

class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

function createBook(title, author) {
    const newBook = new Book(title, author);
    bookArray.push(newBook);
}

bookArray.forEach((book) => {
    bookList.innerHTML += `<li class="book">
            <p class="title">${book.title}</p>
            <p class="author">${book.author}</p>
            <button type="button" class="delete-btn">Remove</button>
            <hr />
          </li>`;
})

addBookButton.addEventListener('click', function (event) {
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

})


