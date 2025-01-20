async function fetchBooks() {
    try {
        const response = await fetch('https://trello.vimlc.uz/books');
        const books = await response.json();

        displayBooks(books); 
    } catch (error) {
        console.error('Xatolik yuz berdi:', error);
    }
}

function displayBooks(books) {
    const cardContainer = document.querySelector('.card_s');
    cardContainer.innerHTML = ''; 

    books.forEach(book => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <p>Kitob nomi: <span>${book.title}</span></p>
            <p>Muallifi: <span>${book.author}</span></p>
            <p>Chiqarilgan yili: <span>${book.year}</span></p>
            <button class="delete_btn" data-id="${book.id}">O'chirish</button>
            <button class="edit_btn" data-id="${book.id}">Tahrirlash</button>
        `;
        cardContainer.appendChild(productDiv);
    });

    const deleteButtons = document.querySelectorAll('.delete_btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => deleteBook(button));
    });
}

async function deleteBook(button) {
    const bookId = button.getAttribute('data-id'); 
    try {
        const response = await fetch(`https://trello.vimlc.uz/books/${bookId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log(`${bookId} o'chirildi`);
            fetchBooks(); 
        } else {
            console.error(`Xatolik: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
    }
}

async function addBook(event) {
    event.preventDefault(); 

    const inputs = document.querySelectorAll('.inp input');
    const title = inputs[0].value; 
    const author = inputs[1].value; 
    const year = parseInt(inputs[2].value); 

    const newBook = { title, author, year };
    console.log(newBook);

    try {
        const response = await fetch('https://trello.vimlc.uz/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook),
        });

        if (response.ok) {
            console.log('Yangi kitob qo‘shildi!');
            inputs.forEach(input => input.value = '');
            fetchBooks(); 
        } else {
            console.error('Xatolik:', response.status);
        }
    } catch (error) {
        console.error('Xatolik yuz berdi:', error);
    }
}

async function searchBook(event) {
    event.preventDefault();

    const searchInput = document.querySelector('#searchForm input[name="search"]').value.toLowerCase();
    const searchResult = document.getElementById('searchResult');

    if (!searchInput) {
        searchResult.textContent = 'Qidiruv uchun soz kiriting!';
        return;
    }

    try {
        const response = await fetch('https://trello.vimlc.uz/books');
        const books = await response.json();

        const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchInput));

        if (filteredBooks.length > 0) {
            displayBooks(filteredBooks);
            searchResult.textContent = `${filteredBooks.length} ta natija topildi.`;
        } else {
            searchResult.textContent = 'Hech qanday natija topilmadi.';
        }
    } catch (error) {
        searchResult.textContent = 'Xatolik yuz berdi!';
        console.error(error);
    }
}
document.getElementById('inp').addEventListener('submit', addBook);
document.getElementById('searchForm').addEventListener('submit', searchBook);

fetchBooks();
