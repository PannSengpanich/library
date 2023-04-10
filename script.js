let myLibrary = [];
function showForm() {
  var form = document.getElementById("myForm");
  form.style.display = "grid";
  form.style.gridTemplateRows = "repeat(4, 1fr) 0.5fr";
}
function submitFunction() {
  addBookToLibrary();
  hideForm();
}
function hideForm() {
  var form = document.getElementById("myForm");
  form.style.display = "none";
}
const submit = document.querySelector(".submit");
submit.addEventListener("click", submitFunction);

function Book(name, author, pages, status) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(event) {
  event.preventDefault();
  const name = document.querySelector("#book-title").value;
  const author = document.querySelector("#book-author").value;
  const pages = document.querySelector("#book-pages").value;
  const status = document.querySelector("#book-status").value;

  const newBook = new Book(name, author, pages, status);
  myLibrary.push(newBook);
}
