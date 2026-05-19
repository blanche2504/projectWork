# Project work

Project work di Federico De Vietro e Mattia Grassotti :).

# Info per uso strettamente interno

private e inviolabili perfavore ignorare grazie millissimo

### Dipendenze

- express
- cors
- mongodb
- jsonwebtoken
- nodemon
- react
- bootstrap
- axios

### MongoDB

database: pw_libreria

collection: books

collection: users

User di default:

username: admin

password: admin

### Sito

Al mio stimato collega,

una volta che avvi il backend con `npm start` e il frontend con `npm run dev`, il backend si avvia su `localhost:3000` e il frontend su `localhost:5173`.

### Routes

| Method | Route            | Auth | Description   |
| ------ | ---------------- | ---- | ------------- |
| POST   | `/api/login`     | No   | Login         |
| GET    | `/api/books`     | No   | Get all books |
| POST   | `/api/books`     | Yes  | Add a book    |
| PUT    | `/api/books/:id` | Yes  | Update a book |
| DELETE | `/api/books/:id` | Yes  | Delete a book |
