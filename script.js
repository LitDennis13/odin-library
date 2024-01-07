const addBookDialog = document.querySelector("#add-book-dialog-container");
const addBookBtn = document.querySelector("#add-book-button");
const addBook = document.querySelector("#add-book-dialog-button");
const closeBookDialog = document.querySelector("#close-book-dialog-button");



addBookBtn.addEventListener("click", () => {
    addBookDialog.showModal();
});

closeBookDialog.addEventListener("click", (event) => {
    addBookDialog.close();
    event.preventDefault();
});

addBook.addEventListener("click", (event) => {
    
    addBookDialog.close();
    event.preventDefault();
});