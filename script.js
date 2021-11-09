const addForm = document.getElementById('add-form');
let library = [];

class Book {
	constructor(title, author, pages, date) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.date = date;
	}
	addToLibrary() {
		library.push(this);
	}
}

const displayController = (() => {
	function addBookToLibrary() {
		let bookTitle = document.getElementById('title').value;
		let bookAuthor = document.getElementById('author').value;
		let bookPages = document.getElementById('pages').value;
		let bookDate = document.getElementById('date').value;
	
		let book = new Book(bookTitle, bookAuthor, bookPages, bookDate);
		book.addToLibrary();

		// Check for valid form entries
		const form = document.querySelector('form');
		const bookDisplay = document.querySelector('.book-container');
	
		if (form.checkValidity()) {
			addForm.style.display = 'none';
			bookDisplay.innerHTML += `
				<div class="book">
				<h2 class="book-title">${book.title}</h2>
				<p class="book-author">Author: ${book.author}</p>
				<p class="book-pages">Pages: ${book.pages}</p>
				<p class="book-published">Published: ${book.date}</p>
				<label class="switch">
				<p class="read-tag">Read:</p>
				<input type="checkbox">
				<span class="slider round"></span>
				</label>
				</div>
				`;
		} else if (!form.checkValidity()) {
			const inputs = addForm.querySelectorAll('input');
	
			inputs.forEach((input) => {
				if (input.value === '') {
					input.nextSibling.style.display = 'flex';
				} else {
					input.nextSibling.style.display = 'none';
				}
			});
		}
	}

	function updateLog() {
		const libraryLog = document.querySelector('.log-container');
		let count = library.length;
	
		libraryLog.innerHTML = `
			<h2>Library Log</h2>
			<p class="books-count">Total Books: ${count}</p>
			<p class="read-count">Read: 0</p>
			<p class="unread-count">Not Read: 0</p>
		`;
	}

return { addBookToLibrary, updateLog }
})();

const addBookBtn = document.querySelector('.add-book');
addBookBtn.addEventListener('click', (e) => {
	addForm.style.display = 'flex';
});

const submitBtn = document.querySelector('.form-submit');
submitBtn.addEventListener('click', (e) => {
	e.preventDefault();
	e.stopPropagation();
	displayController.addBookToLibrary();
	displayController.updateLog();
});

const closeFormBtn = document.querySelector('.close-form');
closeFormBtn.addEventListener('click', (e) => {
	e.preventDefault();
	addForm.style.display = 'none';
});

const readSwitch = document.querySelectorAll('input[type=checkbox]');
const bookCard = document.querySelectorAll('.book');
readSwitch.forEach((box) => {
	box.addEventListener('change', (e) => {
		if (box.checked) {
			console.log('hello checked');
			box.closest('div').classList.add('read-active');
		} else {
			box.closest('div').classList.remove('read-active');
		}
	});
});
