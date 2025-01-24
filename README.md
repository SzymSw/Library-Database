# Library Database
Simple library database system built using MongoDB (Mongoose), Express.js, Node.js. and JWT.
## Starting
1. Install MongoDB & Postman on your computer.
2. Clone the repository:
```
git clone https://github.com/SzymSw/library-database
```
3. Change to root folder:
```
cd library-database
```
5. Install all necessary dependiencies:
```
npm install
```
7. Configure the .env file according to your preferences, for example:
```
JWT_KEY=yourSecretKey
DB_USER=admin
DB_PASSWORD=admin123
DB_NAME=library
PORT=3000
```
6. Run the app:
```
node server.js
```
## Endpoints
### Register & Login
| Endpoint | Method | Description |
| ------------- | ------------- | ------------- |
| ```/auth/register``` | POST | Register a new user |
| ```/auth/login``` | POST | Log in and get JWT token to execute methods |
### Books
| Endpoint | Method | Description | Role |
| ------------- | ------------- | ------------- | ------------- |
| ```/books``` | GET | View all books | ```customer``` and ```librarian``` |
| ```/books/:id``` | GET | View specific book by ID | ```customer``` and ```librarian``` |
| ```/books``` | POST | Add new book | ```librarian``` |
| ```/books/:id``` | PUT | Update book by ID | ```librarian``` |
| ```/books/:id``` | DELETE | Delete book by ID | ```librarian``` |
### Authors
| Endpoint | Method | Description | Role |
| ------------- | ------------- | ------------- | ------------- |
| ```/authors``` | GET | View all authors | ```customer``` and ```librarian``` |
| ```/authors/:id``` | GET | View specific author by ID | ```customer``` and ```librarian``` |
| ```/authors``` | POST | Add new author | ```librarian``` |
| ```/authors/:id``` | PUT | Update author by ID | ```librarian``` |
| ```/authors/:id``` | DELETE | Delete author by ID | ```librarian``` |
### Loans
| Endpoint | Method | Description | Role |
| ------------- | ------------- | ------------- | ------------- |
| ```/loans``` | GET | View all loans | ```librarian``` |
| ```/loans/:id``` | GET | View specific loan by ID | ```librarian``` |
| ```/loans``` | POST | Add new loan | ```librarian``` |
| ```/loans/:id``` | PUT | Update loan by ID | ```librarian``` |
| ```/loans/:id``` | DELETE | Delete loan by ID | ```librarian``` |
### Users
| Endpoint | Method | Description | Role |
| ------------- | ------------- | ------------- | ------------- |
| ```/users``` | GET | View all users | ```admin``` |
| ```/users/:id``` | GET | View specific user by ID | ```admin``` |
| ```/users``` | POST | Add new user | ```admin``` |
| ```/users/:id``` | PUT | Update user by ID | ```admin``` |
| ```/users/:id``` | DELETE | Delete user by ID | ```admin``` |
## Schemas
### Register & Login
```
{
  "firstName": "",
  "lastName": "",
  "email": "",
  "password": "",
  "role": ""
}
```
```
{
  "email": "",
  "password": "",
}
```
### Books
```
{
  "title": "",
  "author": "<author's ID>",
  "genre": "",
  "pages": ,
  "quantityAvailable":
}
```
### Authors
```
{
  "firstName": "",
  "middleName": "",
  "lastName": ""
}
```
### Loans
```
{
  "user": "<user's ID>",
  "book": "<book's ID">",
  "borrowDate": "",
  "returnDate": "",
  "returned":
}
```
### Users
```
{
  "firstName": "",
  "lastName": "",
  "email": "",
  "password": "",
  "role": ""
}
```
## User roles
User's role can only be one of these:
| Name | Rights |
| ------------- | ------------- |
| ```customer``` | Can only view Books and Authors, all or by ID |
| ```librarian``` | Can view, add, update and delete documents from Books, Authors and Loans collections |
| ```admin``` | Can view, add, update and delete documents from Users collection |
