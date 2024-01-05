const addButton = document.querySelector(".book-add");

const titleInput = document.querySelector("#book");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#page-number");
const statusInput = document.querySelector("#status-select");

const form = document.querySelector(".form");

form.addEventListener('submit', e => {
        e.preventDefault()
})

 function addBook(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}
      
function checkTitle(title) {
    return bookLibrary.some(obj => obj.title === title);
  }

const bookLibrary = [ 
    {
    "title": "Harry Potter and the Chamber of Secrets",
    "author": "J. K. Rowling",
    "pages": "251",
    "status": "not-read"
    }
]

function updateLibrary() {
    const booksList = document.querySelector(".books");

    booksList.innerHTML = "";

    for (i = 0; i < bookLibrary.length; i++) {
        const div = document.createElement("div");

        booksList.appendChild(div);

        div.id = `book${i}`;
        div.classList.add('book-card');

        const book_Title = document.createElement("h1");
        div.appendChild(book_Title);
        book_Title.classList.add("book_Title");
        book_Title.innerHTML = `"${bookLibrary[i].title}"`;

        const book_Author = document.createElement("h1");
        div.appendChild(book_Author);
        book_Author.classList.add("book_Author");
        book_Author.innerHTML = bookLibrary[i].author;

        const book_Pages = document.createElement("h1");
        div.appendChild(book_Pages);
        book_Pages.classList.add("book_Pages");
        book_Pages.innerHTML = `${bookLibrary[i].pages} Pages`;

        const book_Status = document.createElement("button");
        div.appendChild(book_Status);
        book_Status.classList.add("book_Status");
        book_Status.setAttribute('data-title', bookLibrary[i].title);

        book_Status.addEventListener("click", function() {
            toggleStatus(findIndex(book_Status.dataset.title));
        })

        if (bookLibrary[i].status == "read") {
            book_Status.classList.remove("not_read");
            book_Status.classList.add("read");
            book_Status.innerHTML = "Read";
        } else if (bookLibrary[i].status == "not-read") {
            book_Status.classList.remove("read");
            book_Status.classList.add("not-read");
            book_Status.innerHTML = "Not Read";
        }

        const removeButton = document.createElement("button");
        div.appendChild(removeButton);
        removeButton.classList.add("removeButton");
        removeButton.innerHTML = "Remove";
        removeButton.setAttribute('data-title', bookLibrary[i].title);

        removeButton.addEventListener("click", function() {
            removeBook(findIndex(removeButton.dataset.title));
        })
    }
}

function removeBook(index) {
    bookLibrary.splice(index, 1);
    updateLibrary();
}

function findIndex(title) {
    return bookLibrary.findIndex(obj => obj.title === title);
  }

addButton.addEventListener("click", function() {
    if (checkTitle(titleInput.value)) {
        window.alert("That book is already on the library!")
    } else if (titleInput.value != "" && authorInput.value != "" && pagesInput.value != "" && statusInput.value != "") {
        const book = new addBook(titleInput.value, authorInput.value, pagesInput.value, statusInput.value);
        bookLibrary.push(book);
        updateLibrary();
    } else {
        return;
    }

})

function toggleStatus(index) {
    let bookToToggle = bookLibrary[index].status;

    if (bookToToggle == "read") {
        bookLibrary[index].status = "not-read";
        updateLibrary();
    } else if (bookToToggle == "not-read") {
        bookLibrary[index].status = "read";
        updateLibrary();
}}

updateLibrary()