const booksContainer = document.getElementById('books-container');

fetch('https://sheets.googleapis.com/v4/spreadsheets/1eFNyOTc1sjFwoBYA5FzB4f-ecGs0w-COjOZ_mXLWBbo/values/Sheet1!A1:I100?key=AIzaSyB5WTjIR5OZt108xl9uQApzeoNRWuMyYRE')
  .then(response => response.json())
  .then(data => {
    const books = data.values.slice(1); // Skip header row

    books.forEach(book => {
      const title = book[0];
      const cover = book[1];
      const author = book[2];
      const review = book[4];
      const bookId = book[1]; // Assuming the book ID is in the second column (index 1)

      const bookElement = document.createElement('div');
      bookElement.classList.add('book');

      const coverImage = document.createElement('img');
      coverImage.src = cover;
      coverImage.classList.add('book-cover');

      const titleElement = document.createElement('h2');
      titleElement.textContent = title;
      titleElement.classList.add('book-title');

      const authorElement = document.createElement('p');
      authorElement.textContent = `بقلم: ${author}`;
      authorElement.classList.add('book-author');

      const reviewElement = document.createElement('p');
      reviewElement.textContent = review;
      reviewElement.classList.add('book-review');

      bookElement.addEventListener('click', () => {
        window.location.href = `view.html?bookId=${bookId}`;
      });

      bookElement.appendChild(coverImage);
      bookElement.appendChild(titleElement);
      bookElement.appendChild(authorElement);
      bookElement.appendChild(reviewElement);

      booksContainer.appendChild(bookElement);
    });
  });

const bookId = new URLSearchParams(window.location.search).get('bookId');

fetch('https://sheets.googleapis.com/v4/spreadsheets/1eFNyOTc1sjFwoBYA5FzB4f-ecGs0w-COjOZ_mXLWBbo/values/Sheet1!A1:I100?key=AIzaSyB5WTjIR5OZt108xl9uQApzeoNRWuMyYRE')
  .then(response => response.json())
  .then(data => {
    const books = data.values.slice(1); // Skip header row

    const book = books.find(book => book[1] === bookId); // Assuming the book ID is in the second column (index 1)

    if (book) {
      const title = book[0];
      const cover = book[1];
      const author = book[2];
      const review = book[4];
      const bookDetailsElement = document.getElementById('book-details');

      const coverImage = document.createElement('img');
      coverImage.src = cover;
      coverImage.classList.add('book-cover');

      const titleElement = document.createElement('h2');
      titleElement.textContent = title;
      titleElement.classList.add('book-title');

      const authorElement = document.createElement('p');
      authorElement.textContent = `بقلم: ${author}`;
      authorElement.classList.add('book-author');

      const reviewElement = document.createElement('p');
      reviewElement.textContent = review;
      reviewElement.classList.add('book-review');

      bookDetailsElement.appendChild(coverImage);
      bookDetailsElement.appendChild(titleElement);
      bookDetailsElement.appendChild(authorElement);
      bookDetailsElement.appendChild(reviewElement);
    } else {
      const bookDetailsElement = document.getElementById('book-details');
      bookDetailsElement.textContent = 'لا يوجد كتاب بهذا المعرف.';
    }
  });
