export let books = JSON.parse(localStorage.getItem("books")) || [
  {
    id: "1",
    title: "The Art of Coding",
    author: "Alice Johnson",
    categories: ["Programming", "Technology"],
    status: "Sold",
    published: "2021-03-15",
    book: "978-3-16-148410-0",
    image_link: "https://images.unsplash.com/photo-1639609885872-a1ade31e4db9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
  }, // Array Structure
];

// save array to localStorage
function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

// Add or submit function
export function addBook(book) {
  books.push(book);
  saveBooks(); 
}

// Delete 
export function deleteBookId(id) {
  books = books.filter(book => book.id !== id);
  saveBooks();
}

// Update a book's status by id
export function updateBookStatus(id, newStatus) {
  const book = books.find(book => book.id === id);
  if (book) {
    book.status = newStatus;
    saveBooks(); 
  }
}

// If no books exist in localStorage, save the initial list to it
if (!localStorage.getItem("books")) {
  saveBooks();
}
