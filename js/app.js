// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI() {}

// Local Storage constructor
function Store() {}

/* LS prototypes */
// Get books
Store.prototype.getBooks = function () {
  let books;
  // Check local storage
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  return books;
}

// Display books
Store.prototype.displayBooks = function () {
  const store = new Store();
  const books = store.getBooks();

  books.forEach(book => {
    const ui = new UI();

    // Add book to UI
    ui.addBookToList(book);
  });
}

// Add book
Store.prototype.addBook = function (book) {
  const store = new Store();
  const books = store.getBooks();

  books.push(book);

  localStorage.setItem('books', JSON.stringify(books));
}

// Remove book
Store.prototype.removeBook = function (isbn) {
  const store = new Store();
  const books = store.getBooks();

  books.forEach((book, index) => {
    if (book.isbn === isbn) {
      books.splice(index, 1);
    }
  });

  localStorage.setItem('books', JSON.stringify(books));
}

/* UI prototypes */
// Add book
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');
  // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete" title="Delete Book"><i class="fas fa-times delete"></i></a></td>
  `;
  list.appendChild(row);
};

// Delete book
UI.prototype.deleteBook = function (target) {
  if (target.classList.contains('delete')) {
    target.parentElement.parentElement.parentElement.remove();
  }
}

// Clear field
UI.prototype.clearFields = function () {
  // Clear inputs
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
  // Get focus
  document.getElementById('title').focus();
}

// Show alert
UI.prototype.showAlert = function (msg, className) {
  // Create div
  const div = document.createElement('div');
  // Add class
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(msg));
  // Get parent
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  // Insert alert
  container.insertBefore(div, form);
  // Remove msg after 3 mns
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
}

// Event listeners
// DOM Load event
document.addEventListener('DOMContentLoaded', function () {
  const store = new Store();
  store.displayBooks();
});
// Event listener for add book
document.getElementById('book-form').addEventListener('submit', function (e) {
  // Get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI 
  const ui = new UI();

  // Validate
  if (title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Add to LS
    const store = new Store();
    store.addBook(book);

    // Show success
    ui.showAlert('Book Added...', 'success');

    // Clear fields
    ui.clearFields();
  }


  e.preventDefault();
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
  // Instantiate UI 
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);

  // Remove from LS
  const store = new Store();
  store.removeBook(e.target.parentElement.parentElement.previousElementSibling.textContent);

  // Show alert
  ui.showAlert('Book removed', 'success');

  e.preventDefault();
});