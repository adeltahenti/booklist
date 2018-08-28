class Book {
  constructor(titlt, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookList(book) {
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
  }

  showAlert(msg, className) {
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

  deleteBook(target) {
    if (target.classList.contains('delete')) {
      target.parentElement.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    // Clear inputs
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
    // Get focus
    document.getElementById('title').focus();
  }
}