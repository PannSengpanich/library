let myLibrary = [];

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

const submit = document.querySelector(".submit");
submit.addEventListener("click", submitFunction);

const libraryContainer = document.querySelector(".library-container");
//event delegation
libraryContainer.addEventListener("change", changeBookStatus);

function submitFunction(event) {
  event.preventDefault();

  const requiredInputs = document.querySelectorAll("input[required]");

  let isFormValid = true;
  requiredInputs.forEach((input) => {
    if (!input.value) {
      isFormValid = false;
    }
  });

  if (isFormValid) {
    addBookToLibrary();
    clearForm();
    hideForm();
    displayBook();
  } else {
    alert("Please fill in all required fields.");
  }
}

function showForm() {
  var form = document.getElementById("myForm");
  form.style.display = "grid";
  form.style.gridTemplateRows = "repeat(4, 1fr) 0.5fr";
}

function addBookToLibrary() {
  const inputs = document.querySelectorAll("input");
  const book = {};
  inputs.forEach((input) => (book[input.id] = input.value));

  const newBook = new Book(
    book["book-title"],
    book["book-author"],
    book["book-pages"],
    book["book-status"],
  );
  myLibrary.push(newBook);
}

function clearForm() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => (input.value = ""));
}

function hideForm() {
  var form = document.getElementById("myForm");
  form.style.display = "none";
}

function displayBook() {
  const existingBooks = libraryContainer.querySelectorAll(".book");

  // update status of existing books
  existingBooks.forEach((bookDiv) => {
    const bookTitle = bookDiv.querySelector("h2").textContent;
    const book = myLibrary.find((book) => book.title === bookTitle);
    bookDiv.querySelector("select[name='status']").value = book.status;
  });

  // create a new container to hold the new book elements
  const newBooksContainer = document.createElement("div");

  myLibrary.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book", "list");
    bookDiv.innerHTML = `
      <h2>${book.title}</h2>
      <p>${book.author}</p>
      <p>${book.pages}</p>
      <select name="status">
        <option value="read" ${
          book.status === "read" ? "selected" : ""
        }>Read</option>
        <option value="not-read" ${
          book.status === "not-read" ? "selected" : ""
        }>Not Read</option>
      </select>
      <button class="delete" onclick="deleteBook(this)">Delete</button>
    `;

    newBooksContainer.appendChild(bookDiv);
  });

  libraryContainer.innerHTML = "";
  libraryContainer.appendChild(newBooksContainer);
}

function changeBookStatus(event) {
  if (event.target.tagName === "SELECT") {
    const bookTitle = event.target.parentNode.querySelector("h2").textContent;
    const book = myLibrary.find((book) => book.title === bookTitle);
    book.status = event.target.value;
  }
}

function deleteBook(button) {
  const divToDelete = button.parentNode; // get the parent div of the button
  const nameToRemove = divToDelete.querySelector("h2").textContent;
  myLibrary = myLibrary.filter((element) => element.title !== nameToRemove);
  divToDelete.remove(); // remove the div from the DOM
}
