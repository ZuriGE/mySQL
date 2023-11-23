const mysql = require("mysql2/promise");

const main = async () => {
	try {
		let connection = await mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "4823",
			database: "museo",
		});
		console.log("Conexión OK");

		// let sqlTable1 = `CREATE TABLE exp_mode(exp_mode_id INT AUTO_INCREMENT PRIMARY KEY, description VARCHAR(100))`;
		// let sqlTable2 = `CREATE TABLE collection (collection_id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(100), exp_mode_id INT, FOREIGN KEY (exp_mode_id) REFERENCES exp_mode(exp_mode_id))`;
		// let sqlTable3 = `CREATE TABLE loc_type(loc_type_id INT AUTO_INCREMENT PRIMARY KEY, description VARCHAR(100))`;
		// let sqlTable4 = `CREATE TABLE location (loc_id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR (20), loc_type_id INT, FOREIGN KEY (loc_type_id) REFERENCES loc_type(loc_type_id))`;
		// let sqlTable5 = `CREATE TABLE author (author_id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR (20), surname VARCHAR (50))`;
		// let sqlTable6 = `CREATE TABLE owner (owner_id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR (20), surname VARCHAR (50), email VARCHAR(20), address VARCHAR(100))`;
		// let sqlTable7 = `CREATE TABLE loan (loan_id INT AUTO_INCREMENT PRIMARY KEY,borrower INT,lender INT, start_date DATE, end_date DATE, FOREIGN KEY (borrower) REFERENCES owner(owner_id), FOREIGN KEY (lender) REFERENCES owner(owner_id))`;
		// let sqlTable8 = `CREATE TABLE piece (piece_id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), description VARCHAR (500), year INT(4), author_id INT, collection_id INT, owner_id INT, loc_id INT, owned BOOLEAN, loan_id INT, FOREIGN KEY (collection_id) REFERENCES collection(collection_id),FOREIGN KEY (author_id) REFERENCES author(author_id), FOREIGN KEY (owner_id) REFERENCES owner(owner_id), FOREIGN KEY (loc_id) REFERENCES location(loc_id), FOREIGN KEY (loan_id) REFERENCES loan(loan_id)) `;

		// let [resultCreateTable] = await connection.query(sqlTable8);
		// console.log("Tablas creadas correctamente");
		// console.log(resultCreateTable);

		let loan_param = ["1"];
		let loan_sql = "SELECT piece.piece_id, piece.name as piece, location.name as location , l.end_date, CONCAT( owner.name, ' ', owner.surname) as owner, owner.email FROM location JOIN piece ON location.loc_id = piece.loc_id JOIN loan as l ON piece.loan_id = l.loan_id JOIN owner ON l.lender = owner.owner_id WHERE NOT(piece.owner_id = ?)";

		// let [resultLoans] = await connection.query(loan_sql, loan_param);
		// console.log("Consula OK");
		// console.log(resultLoans);

		let exp_mode_sql = "SELECT COUNT(piece.piece_id) as num_pieces, exp_mode.description FROM piece JOIN collection on piece.collection_id = collection.collection_id JOIN exp_mode ON collection.exp_mode_id = exp_mode.exp_mode_id GROUP BY collection.exp_mode_id order by num_pieces DESC";
		let [resultExp_mode] = await connection.query(exp_mode_sql);
		console.log("Consula OK");
		console.log(resultExp_mode);
	} catch (error) {
		console.log(error);
		await connection.end();
	}
};

main();
