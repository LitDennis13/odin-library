const addBookDialog = document.querySelector("#add-book-dialog-container");
const addBookBtn = document.querySelector("#add-book-button");
const addBook = document.querySelector("#add-book-dialog-button");
const closeBookDialog = document.querySelector("#close-book-dialog-button");

let book_inputs = {
    Title: document.querySelector("#book-title-form"),
    Author: document.querySelector("#book-author-form"),
    Pages: document.querySelector("#book-pages-form"),
    Read: document.querySelector("#book-read-form"),
    Reset: () => {
        book_inputs.Title.value = "";
        book_inputs.Author.value = "";
        book_inputs.Pages.value = "";
        book_inputs.Read.checked = false;
    }
};

addBookBtn.addEventListener("click", () => {
    refreshBookNames();
    addBookDialog.showModal();
});

closeBookDialog.addEventListener("click", (event) => {
    book_inputs.Reset();
    addBookDialog.close();
    event.preventDefault();
});




let bookNames = [];

let bookStorageHTML = document.querySelector("#book-storage");
let bookStorageJS = [];

function Book(title,author,pages,read,id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function refreshBookNames() {
    bookNames = [];
    for (const book of bookStorageJS) {
        bookNames.push(book.title);
    }
}

function checkNameAvailable(name) {
    
    for (const book of bookStorageJS) {
        if (book.title === name) {
            console.log(book.title,name);
            return false;
        }
    }
    return true;
    
}

const current = bookStorageHTML.innerHTML;
function refreshBookStorage() {
    bookStorageHTML.innerHTML = current;
    for (const book of bookStorageJS) {
        bookStorageHTML.innerHTML += `<div id="book">
        <h2 id="book-title">${book.title}</h2>
        <h3 id="book-author"> By ${book.author}</h3>
        <h3 id="book-pages">${book.pages} Pages</h3>
        <button id="book-read-button" class="${book.read ? "read" : "not-read"}">${book.read ? "Read" : "Not Read"}</button>
        <button id="book-remove-button">Remove</button>
    </div>`;
    }
}
book_inputs.Title.addEventListener("input",() => {
    if (!checkNameAvailable(book_inputs.Title.value)) {
        book_inputs.Title.setCustomValidity("This Book Exists Already");
    }
    else {
        book_inputs.Title.setCustomValidity("");
    }
});

refreshBookStorage();
addBook.addEventListener("click", (event) => {
    
    if (book_inputs.Title.checkValidity() && book_inputs.Author.checkValidity() && book_inputs.Pages.checkValidity()) {

        book_inputs.Title.setCustomValidity("");
        const newBook = new Book(book_inputs.Title.value,book_inputs.Author.value,book_inputs.Pages.value,book_inputs.Read.checked);
        bookStorageJS.push(newBook);
        refreshBookStorage();
        
    }
});


const addBookBar = document.querySelector("#add-book-bar");


addBookBar.addEventListener("click", () => {
    book_inputs.Reset();
});





bookStorageHTML.addEventListener("click", (event) => {
    let target = event.target;
    if (target.id === "book-read-button") {
        if (target.classList == "read") {
            target.textContent = "Not read";
            target.classList = "not-read";
            updateBookJS(target.parentNode.querySelector("#book-title").textContent,false);
        }
        else {
            target.textContent = "Read";
            target.classList = "read";
            updateBookJS(target.parentNode.querySelector("#book-title").textContent,true);
        }
    }
});
function updateBookJS(bookTitle,read) {
    for (const book of bookStorageJS) {
        if (book.title === bookTitle) {
            book.read = read;
            return;
        }
    }
}


bookStorageHTML.addEventListener("click", (event) => {
    let target = event.target;
    if (target.id === "book-remove-button") {
        removeBook(target.parentNode.querySelector("#book-title").textContent);
    }
});

function removeBook(bookTitle) {
    let amountOfBooks = bookStorageJS.length;
    
    for (let i = 0; i < amountOfBooks;i++) {
        if (bookStorageJS[i].title === bookTitle) {
            bookStorageJS.splice(i,1);
            refreshBookStorage();
            break;
        }
    }
}

// ### Left to do ###
// 2. Top bars shrinking as books are added