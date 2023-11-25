class Book {
	constructor(title, type, author, price, photo, id_book, id_user = 0) {
		this.title = title;
		this.type = type;
		this.author = author;
		this.price = price;
		this.photo = photo;
		this.id_book = id_book;
		this.id_user = id_user;
	}
}

module.exports = Book;
