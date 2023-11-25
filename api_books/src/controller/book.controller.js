const errorHandling = require("../error/errorHandling");
const myClass = require("../models/book");

//datos para para reto3

let myBook1 = new myClass("El misterio de la cripta embrujada", "Tapa dura", "Eduardo Mendoza", 15.75, "/assets/img/book1.webp", 1);

let serverBook = myBook1;

//funciones reto 2

//obtener libro
const getBook = (req, res) => {
	// console.log("Petición recibida del cliente");
	// console.log(req.url);
	// console.log(req.method);
	// console.log(req.headers["user-agent"]);

	// res.setHeader("Content-Type", "application/json");

	//no hace falta stringify porque en app hemos puesto: app.use(express.urlencoded({ extended: false })) y app.use(express.json());

	res.status(200).send(serverBook);
};

// crear nuevo libro (si el libro no existe)
const postBook = (req, res) => {
	let ans;
	if (serverBook === null) {
		serverBook = {
			title: req.body.title,
			type: req.body.type,
			author: req.body.author,
			price: req.body.price,
			photo: req.body.photo,
			id_book: req.body.id_book,
			id_user: req.body.ise_user,
		};
		ans = { error: false, code: 200, message: "Libro creado", data: [serverBook] };
	} else {
		ans = { error: true, code: 200, message: "Libro ya existe" };
	}
	res.send(ans);
};

//modificar libro (si el libro existe)
const putBook = (req, res) => {
	let ans;
	if (serverBook !== null) {
		serverBook = {
			title: req.body.title || serverBook.title,
			type: req.body.type || serverBook.type,
			author: req.body.author || serverBook.author,
			price: req.body.price || serverBook.price,
			photo: req.body.photo || serverBook.photo,
			id_book: req.body.id_book || serverBook.id_book,
			id_user: req.body.ise_user || serverBook.id_user,
		};
		ans = { error: false, code: 200, message: "Libro modificado", data: [serverBook] };
	} else {
		ans = { error: true, code: 200, message: "Libro no existe" };
	}
	res.send(ans);
};

//eliminar libro (si el libro existe)
const delBook = (req, res) => {
	let ans;
	if (serverBook != null) {
		serverBook = null;
		ans = { error: false, code: 200, message: "Libro eliminado" };
	} else {
		ans = { error: true, code: 200, message: "El libro no existe o ha sido eliminado." };
	}
	res.send(ans);
};

module.exports = { getBook, postBook, putBook, delBook };

/* libro para pruebas
{
    "title": "Test Book",
    "type": "Test type",
    "author":"Fulanito",
    "price": 13,
    "photo": "/img.jpg",
    "id_book": 15,
    "id_user": 2003
}
*/
