import { books, addBook, deleteBookId, updateBookStatus } from './data/books.js';
const modal = document.querySelector("dialog");

let nextId = books.length ? Math.max(...books.map(book => parseInt(book.id))) + 1 : 1;

document.querySelector('.addBook').addEventListener('click', submitBook);
document.querySelector('.fa-xmark').addEventListener('click', () => {
    modal.close()
});
document.getElementById("searchInput").addEventListener("input", searchBooks);


// GET / DisplayBooks to div1
function displayBooks(displayedBooks = books) {
    const container = document.querySelector(".div1");
    container.innerHTML = "";

    displayedBooks.forEach(book => {
        const card = document.createElement("grid--container");
        const categoriesList = book.categories
            .map(category => `<li><a href="#" class="tag">${category}</a></li>`)
            .join("");
        card.className = "grid--container";

        card.innerHTML = `
            <div class="grid--cell">
                <article class="grid--item">
                    <div class="preview--container">
                        <a href="#" class="preview-image--container">
                            <div class="preview-image" style="background-image: url('${book.image_link}');">
                            </div>
                        </a>
                        <div class="meta--container">
                            <a href="#" class="issue">${book.author}</a>
                            <a href="#" class="page">${book.published}</a>
                        </div>
                    </div>
                    <div class="content--container">
                        <div class="title--container">
                            <a class="title--text" href="#">${book.title}</a>
                        </div>
                        <div class="tags--overflow-container">
                            <ul class="tags--container">
                            ${categoriesList}
                            </ul>
                        </div>
                        <div class="hover--options">
                            <a href="#" class="series button">
                                <span class="icon-title ${book.status === "Available" ? "status-active" : "status-inactive"}">
                                    <i class="fad fa-books"></i>${book.status}
                                </span>
                                <span class="new-tab"><i class="fas fa-arrow-circle-right"></i></span>
                            </a>
                            <a href="#" class="delete button" data-id="${book.id}">
                                <span class="icon-title"><i class="fa-solid fa-minus"></i> Delete</span>
                                <span class="new-tab"><i class="fas fa-arrow-circle-right"></i></span>
                            </a>
                            <a href="#" class="status button" data-id="${book.id}">
                                <i class="fas fa-plus"></i>
                            </a>
                        </div>
                    </div>
                </article>
            </div>
        `;

        container.appendChild(card);
    });

    document.querySelectorAll(".delete").forEach(button => {
        button.addEventListener("click", () => deleteBook(parseInt(button.getAttribute("data-id"))));
    });

    document.querySelectorAll(".status").forEach(button => {
        button.addEventListener("click", () => updateStatus(parseInt(button.getAttribute("data-id"))));
    });
}

// POST / SubmitBook to localstorage array books.js structure
function submitBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const categories = document.getElementById("categories").value.split(",").map(cat => cat.trim());
    const status = document.getElementById("status").value;
    const published = document.getElementById("published").value;
    const image_link = document.getElementById("image_link").value;

    if (title && author && (status === "Available" || status === "Sold") && published) {
        addBook({ id: nextId++, title, author, categories, status, published, image_link });
        displayBooks();
        clearForm();
    } else {
        alert("Please fill in all fields correctly.");
    }
}

// Change status
function updateStatus(id) {
    const book = books.find(book => book.id === id);
    if (book) {
        const newStatus = book.status === "Available" ? "Sold" : "Available";
        updateBookStatus(id, newStatus);
        displayBooks();
    }
}

// DESTROY
function deleteBook(id) {
    deleteBookId(id);
    displayBooks();
}


// function filterBooks() {
//     const status = document.getElementById("statusFilter").value;
//     const filteredBooks = status === "All" ? books : books.filter(book => book.status === status);
//     displayBooks(filteredBooks);
// }

// Serach func using filter.
function searchBooks() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const searchedBooks = books.filter(book => book.title.toLowerCase().includes(query));
    displayBooks(searchedBooks);
}

// Clear form after submit
function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("categories").value = "";
    document.getElementById("status").value = "Available";
    document.getElementById("published").value = "";
}

// Initial display of all books
displayBooks();
