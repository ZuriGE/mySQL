const mysql = require("mysql2/promise");

const main = async () => {
	try {
		let connection = await mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "4823",
			database: "dia1",
		});
		console.log("Conexión OK");

		//RETO 1

		// //calcular nota media de los alumnos de la asignatura 1.
		// let params1_1 = ["1"];
		// let sql1_1 = "SELECT AVG(mark) FROM marks WHERE marks.subject_id = ?";
		// let [result1_1] = await connection.query(sql1_1, params1_1);
		// console.log("Media asignatura");
		// console.log(result1_1);

		// //Calcular el número total de alumnos que hay en el bootcamp
		// let sql1_2 = "SELECT COUNT (*) FROM students";
		// let [result1_2] = await connection.query(sql1_2);
		// console.log("Número de alumnos");
		// console.log(result1_2);

		// //listar todos los campos de la tabla groups
		// let sql1_3 = "SELECT * FROM `groups`";
		// let [result1_3] = await connection.query(sql1_3);
		// console.log("Número de alumnos");
		// console.log(result1_3);

		// // Elimina todas las notas de la base de datos que estén por encima de 5 y que sean del año pasado (no utilices BETWEEN).
		// let params1_4 = ["5", "2023-01-01"];
		// let sql1_4 = "DELETE FROM marks WHERE (mark > ? AND date < ?)";
		// let [result1_4] = await connection.query(sql1_4, params1_4);
		// console.log("Media asignatura");
		// console.log(result1_4);

		// //Obtén los datos de todos los estudiantes que estén en el bootcamp este año. Para ello la tabla de estudiantes debe tener un campo que sea el año de ingreso.
		// let params1_5 = ["2023"];
		// let sql1_5 = "SELECT * FROM students WHERE year = ?";
		// let [result1_5] = await connection.query(sql1_5, params1_5);
		// console.log("Datos alumnos");
		// console.log(result1_5);

		// //Calcular el numero de profesores que hay por cada asignatura.
		// let sql1_6 = "SELECT subjects.title, COUNT(teacher_id) as number_of_teachers FROM subject_teacher JOIN subjects ON subject_teacher.subject_id =subjects.subject_id GROUP BY subject_teacher.subject_id";
		// let [result1_6] = await connection.query(sql1_6);
		// console.log("Numero de profesores por asignatura");
		// console.log(result1_6);

		// //RETO2
		// // Obtén el id y la nota de los alumnos que tengan un id entre 1 y 20, o que tenga una nota mayor de 8 y la nota tenga fecha del año pasado.
		// let params2_1 = ["1", "20", "2022-01-01", "2022-12-31"];
		// let sql2_1 = "SELECT student_id, mark FROM marks WHERE ((student_id BETWEEN ? AND ?) OR (mark > 8 AND date BETWEEN ? AND ?))";
		// let [result2_1] = await connection.query(sql2_1, params2_1);
		// console.log("Alumno / nota");
		// console.log(result2_1);

		// Obtén la media de las notas que se han dado en el último año por asignatura.
		// let params2_2 = ["2022-11-22"];
		// let sql2_2 = "SELECT title, AVG (mark) FROM marks as m JOIN subjects as s on m.subject_id = s.subject_id WHERE date > ? GROUP BY title";
		// let [result2_2] = await connection.query(sql2_2, params2_2);
		// console.log("media por asignatura");
		// console.log(result2_2);

		//Obtén la media aritmética de las notas que se han dado en el último año por alumno.
		// let params2_3 = ["2022-11-22"];
		// let sql2_3 = "SELECT first_name as nombre, last_name as apellido, AVG (mark) as nota_media FROM marks as m JOIN students as s on m.student_id = s.student_id WHERE date > ? GROUP BY s.student_id";
		// let [result2_3] = await connection.query(sql2_3, params2_3);
		// console.log("Nota media por alumno");
		// console.log(result2_3);

		// // Reto 3
		// // Obtén los nombres y apellidos de los alumnos y los nombres de las asignaturas en las que están apuntados.
		// let sql3 = "SELECT students.first_name, students.last_name, GROUP_CONCAT(subjects.title SEPARATOR ', ') as subjects FROM students JOIN `groups` ON students.group_id = groups.group_id JOIN subject_teacher ON groups.group_id = subject_teacher.group_id JOIN subjects ON subject_teacher.subject_id = subjects.subject_id GROUP BY student_id";
		// let [result3] = await connection.query(sql3);
		// console.log("Asignaturas por alumno");
		// console.log(result3);

		// // Reto 4
		// //Obtén todos los nombres y apellidos de los profesores y los nombres de las asignaturas que imparten.
		// let sql4 = "SELECT t.first_name as name, t.last_name as surname, GROUP_CONCAT(DISTINCT s.title SEPARATOR ', ') as subjects FROM teachers as t JOIN subject_teacher st on t.teacher_id = st.teacher_id JOIN subjects as s ON st.subject_id = s.subject_id GROUP BY t.teacher_id";
		// let [result4] = await connection.query(sql4);
		// console.log("Asignaturas por profesor");
		// console.log(result4);

		//Reto 5
		//Obtén el número total de alumnos por asignatura, el nombre de la asignatura y el nombre y apellidos del profesor que la imparte.
		let sql5 = "SELECT subjects.title, CONCAT(teachers.first_name,' ', teachers.last_name) AS profesor, subject_teacher.group_id FROM subjects JOIN subject_teacher ON (subjects.subject_id = subject_teacher.subject_id ) JOIN teachers on subject_teacher.teacher_id = teachers.teacher_id";
		let [result5] = await connection.query(sql5);
		console.log("Asignaturas por profesor");
		console.log(result5);
	} catch (error) {
		console.log(error);
		await connection.end();
	}
};

main();
