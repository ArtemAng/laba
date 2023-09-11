class Book {
  /**
   * @param {string} title - The title of the book.
   * @param {string} author - The author of the book.
   * @param {string} ISBN - The ISBN number of the book.
   * @param {number} price - The price of the book.
   * @param {boolean} availability - The availability of the book.
   */
  constructor(title, author, ISBN, price, availability) {
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;
    this.price = price;
    this.availability = availability;
  }
}

/**
 * Represents a fictional book in the bookstore.
 */
class FictionBook extends Book {
  constructor(title, author, ISBN, price, availability, genre) {
    super(title, author, ISBN, price, availability);
    this.genre = genre;
  }
}

/**
 * Represents a non-fiction book in the bookstore.
 */
class NonFictionBook extends Book {
  constructor(title, author, ISBN, price, availability, topic) {
    super(title, author, ISBN, price, availability);
    this.topic = topic;
  }
}

/**
 * Represents a User of the bookstore.
 */
class User {
  /**
   * @param {string} name - The name of the user.
   * @param {string} email - The email of the user.
   * @param {string} userId - The unique ID of the user.
   */
  constructor(name, email, userId) {
    this.name = name;
    this.email = email;
    this.userId = userId;
  }
}

/**
 * Represents a shopping cart in the bookstore.
 */
class Cart {
  constructor() {
    this.books = [];
  }

  /**
   * Adds a book to the cart.
   * @param {Book} book - The book to be added.
   */
  addBook(book) {
    this.books.push(book);
  }

  /**
   * Removes a book from the cart.
   * @param {Book} book - The book to be removed.
   */
  removeBook(book) {
    const index = this.books.indexOf(book);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }

  /**
   * Calculates the total price of all books in the cart.
   * @returns {number} - The total price of the books in the cart.
   */
  calculateTotalPrice() {
    let totalPrice = 0;
    for (const book of this.books) {
      totalPrice += book.price;
    }
    return totalPrice;
  }
}

/**
 * Represents an order placed by a user.
 */
class Order {
  /**
   * @param {User} user - The user who placed the order.
   * @param {Book[]} books - The books included in the order.
   */
  constructor(user, books) {
    this.user = user;
    this.books = books;
    this.totalPrice = this.calculateTotalPrice();
  }

  /**
   * Calculates the total price of all books in the order.
   * @returns {number} - The total price of the books in the order.
   */
  calculateTotalPrice() {
    let totalPrice = 0;
    for (const book of this.books) {
      totalPrice += book.price;
    }
    return totalPrice;
  }
}


// Create book objects
const book1 = new FictionBook("Title 1", "Author 1", "ISBN 1", 10.10, true, 'classic');
const book2 = new NonFictionBook("Title 2", "Author 2", "ISBN 2", 11.10, true, 'science');
const book3 = new Book("Title 3", "Author 3", "ISBN 3", 12.10, true, 'comedy');

// Create user objects
const user1 = new User("John Doe", "john.doe@example.com", "12345");
const user2 = new User("Jane Doe", "jane.doe@example.com", "54321");

// Create cart objects
const cart1 = new Cart();
const cart2 = new Cart();

// User 1 adds books to cart 1
cart1.addBook(book1);
cart1.addBook(book2);

// User 2 adds books to cart 2
cart2.addBook(book2);
cart2.addBook(book3);

// User 1 places an order
const order1 = new Order(user1, cart1.books);

// User 2 places an order
const order2 = new Order(user2, cart2.books);

console.log(order1, order2);
console.log(cart1, cart2);