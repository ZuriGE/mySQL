const errorHandling = require("../error/errorHandling");
const myClass = require("../models/book");

//datos para para reto3

let myBook1 = new myClass("El misterio de la cripta embrujada", "Tapa dura", "Eduardo Mendoza", 15.75, "/assets/img/book1.webp", 1);
let myBook2 = new myClass("Ceniza en la boca", "Tapa blanda", "Brenda Navarro", 10.5, "/assets/img/book2.jpg", 2);
let myBook3 = new myClass("Lo peor de todo", "Edición de bolsillo", "Ray Loriga", 12.99, "/assets/img/book3.jpg", 3);
let myBook4 = new myClass("Supersaurio", "Tapa dura", "Meryem El Mehdati", 18.0, "/assets/img/book4.jpg", 4);
let myBook5 = new myClass("Todo el azul del cielo", "Tapa blanda", "Mélissa Da Costa", 11.75, "/assets/img/book5.jpg", 5);
let myBook6 = new myClass("Mindfulness para asesinos", "Edición de bolsillo", "Karsten Dusse", 14.0, "/assets/img/book6.jpg", 6);
let myBook7 = new myClass("El evangelio del nuevo mundo", "Tapa dura", "Maryse Condé", 17.54, "/assets/img/book7.jpg", 7);
let myBook8 = new myClass("Lengua de madera", "Tapa blanda", "Hilario Barrero", 19.0, "/assets/img/book8.jpg", 8);
let myBook9 = new myClass("Hotel de cristal", "Edición de bolsillo", "Emily St. John Mandel", 9.99, "/assets/img/book9.jpg", 9);
let myBook10 = new myClass("La mitad evanescente", "Tapa dura", "Britt Bennett", 14.55, "/assets/img/book10.jpg", 10);
let myBook11 = new myClass("Más allá de mi reino", "Tapa blanda", "Yaa Gyasi", 11.49, "/assets/img/book11.jpg", 11);
let myBook12 = new myClass("Hamnet", "Edición de bolsillo", "Maggie O'Farrell", 13.0, "/assets/img/book12.jpg", 12);
let myBook13 = new myClass("La cara en el abismo", "Tapa dura", "Abraham Merritt", 16.79, "/assets/img/book13.jpg", 13);
let myBook14 = new myClass("El evangelio según Jesucristo", "Tapa blanda", "José Saramago", 12.99, "/assets/img/book14.jpg", 14);
let myBook15 = new myClass("Paraíso", "Edición de bolsillo", "Abdulrazak Gurnah", 15.66, "/assets/img/book15.jpg", 15);
let myBook16 = new myClass("El lunes nos querrán", "Tapa dura", "Nahat El Hachmi", 14.85, "/assets/img/book16.jpg", 16);
let myBook17 = new myClass("Nuestra parte de noche", "Tapa blanda", "Mariana Enríquez", 10.99, "/assets/img/book17.jpg", 17);
let myBook18 = new myClass("Todos en mi familia han matado a alguien", "Edición de bolsillo", "Benjamin Stevenson", 19.47, "/assets/img/book18.jpg", 18);
let myBook19 = new myClass("Te di ojos y miraste las tinieblas", "Tapa dura", "Irene Solà", 16.49, "/assets/img/book19.jpg", 19);
let myBook20 = new myClass("Mi año de descanso y relajación", "Tapa blanda", "Ottessa Moshfegh", 11.79, "/assets/img/book20.jpg", 20);
let myBook21 = new myClass("Vamos a morir todos", "Edición de bolsillo", "Emily Austin", 15.25, "/assets/img/book21.jpg", 21);
let myBook22 = new myClass("El hombre hembra", "Tapa dura", "Joana Russ", 17.99, "/assets/img/book22.jpg", 22);

let serverBookArr = [myBook1, myBook2, myBook3, myBook4, myBook5, myBook6, myBook7, myBook8, myBook9, myBook10, myBook11, myBook12, myBook13, myBook14, myBook15, myBook16, myBook17, myBook18, myBook19, myBook20, myBook21, myBook22];

///funciones reto 3
const getBooksById = (req, res) => {
	let ans;
	let searchId = parseInt(req.query.id);

	if (isNaN(searchId)) {
		ans = { error: false, code: 200, message: "No se ha introducido ID de búsqueda, se muestran todos los libros", data: serverBookArr };
	} else {
		let index = serverBookArr.findIndex((book) => book.id_book == searchId);
		if (index != -1) {
			let ansArr = [];
			ansArr.push(serverBookArr[index]);

			ans = { error: false, code: 200, message: `Libro con ID ${searchId} encontrado`, data: ansArr };
		} else {
			ans = { error: true, code: 200, message: `No se ha encontrado ningún libro con ID${searchId}.` };
		}
	}
	res.send(ans);
};

const addBooks = (req, res) => {
	let ans;
	let newBook = {
		title: "",
		type: "",
		author: "",
		price: 0,
		photo: "",
		id_book: 0,
		id_user: 0,
	};

	newBook = {
		title: req.body.title,
		type: req.body.type,
		author: req.body.author,
		price: req.body.price,
		photo: req.body.photo,
		id_book: req.body.id_book,
		id_user: req.body.id_user,
	};

	const index = serverBookArr.findIndex((b) => b.id_book === newBook.id_book);

	if (index == -1) {
		console.log("error false");
		console.log(newBook);

		serverBookArr.push(newBook);
		ans = { error: false, code: 200, message: `Libro '${newBook.title}' añadido a la lista de libros`, data: [newBook] };
	} else {
		console.log("error true");
		console.log(newBook);

		let usedIds = new Set(serverBookArr.map((book) => book.id_book));
		console.log(usedIds.size);

		let findFreeId = () => {
			let usedIds = new Set(serverBookArr.map((book) => book.id_book));
			let maxId;
			for (let i = 1; i <= 999999; i++) {
				maxId = i;
				if (!usedIds.has(i)) {
					return i;
				}
			}
			return maxId + 1;
		};

		let proposedId = findFreeId();

		newBook.id_book = proposedId;
		ans = { error: true, code: 200, message: `id already exists`, data: [newBook] };
	}
	res.send(ans); // console.log(newBook);
};

const putBooksById = (req, res) => {
	let ans;
	let searchId = parseInt(req.query.id);

	if (isNaN(searchId)) {
		ans = { error: true, code: 200, message: "ERROR: No se ha introducido ID." };
	} else {
		let index = serverBookArr.findIndex((book) => book.id_book == searchId);
		if (index == -1) {
			ans = { error: true, code: 200, message: `No se ha encontrado ningún libro con ese ID.` };
		} else {
			let updatedBook = serverBookArr[index];
			updatedBook = {
				title: req.body.title || updatedBook.title,
				type: req.body.type || updatedBook.type,
				author: req.body.author || updatedBook.author,
				price: req.body.price || updatedBook.price,
				photo: req.body.photo || updatedBook.photo,
				id_book: req.body.id_book || updatedBook.id_book,
				id_user: req.body.ise_user || updatedBook.id_user,
			};
			serverBookArr[index] = updatedBook;
			ans = { error: false, code: 200, message: `Datos del libro con ID ${searchId} actualizados`, data: [serverBookArr[index]] };
		}
	}
	res.send(ans);
};

const delBooksById = (req, res) => {
	let ans;
	let searchId = parseInt(req.query.id);

	if (isNaN(searchId)) {
		ans = { error: true, code: 200, message: "ERROR: No se ha introducido ID." };
	} else {
		let index = serverBookArr.findIndex((book) => book.id_book == searchId);
		if (index == -1) {
			ans = { error: true, code: 200, message: `No se ha encontrado ningún libro con ID${searchId}.` };
		} else {
			serverBookArr.splice(index, 1);
			ans = { error: false, code: 200, message: `Libro con ID${searchId} eliminado.`, data: serverBookArr };
		}
	}
	res.send(ans);
};

module.exports = { getBooksById, addBooks, putBooksById, delBooksById };

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
