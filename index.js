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

		//Funciones
		//crear tablas
		const crud = async (sql) => {
			let [result] = await connection.query(sql);
			console.log("todo OK");
			console.log(result);
		};

		//Strings con el código sql
		//crear tablas
		let sqlTeachers = `CREATE TABLE teachers (
            teacher_id INT AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(30),
            last_name VARCHAR(30))`;

		let sqlSubjects = `CREATE TABLE subjects (
            subject_id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(50))`;

		//groups es palabra reservada, hay que ponerla entre comillas de estas >> ` y la \ para que no cierre las comillas (fundamentos)
		let sqlGroups = `CREATE TABLE \`groups\` (
            group_id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(30))`;

		let sqlStudents = `CREATE TABLE students (
            student_id INT AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(30),
            last_name VARCHAR(30),
            group_id INT,
            FOREIGN KEY (group_id) REFERENCES \`groups\`(group_id)
        );`;

		let sqlTMarks = `CREATE TABLE marks (
            mark_id INT AUTO_INCREMENT PRIMARY KEY,
            student_id INT,
            subject_id INT,
            date DATE,
            mark INT,
            FOREIGN KEY (student_id) REFERENCES students(student_id),
            FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
        )`;
		let sqlSubject_teacher = `CREATE TABLE subject_teacher (
            id INT AUTO_INCREMENT PRIMARY KEY,
            subject_id INT,
            teacher_id INT,
            group_id INT,
            FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
            FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id),
            FOREIGN KEY (group_id) REFERENCES \`groups\`(group_id)
        )`;

		let sqlDirection = `CREATE TABLE direction (
            direction_id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(30),
            teacher_id INT,           
            FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id))`;

		//insertar datos

		let insertTeachers = `INSERT INTO teachers (first_name, last_name)
        VALUES
        ('Ana', 'Abad'),
        ('Beñat', 'Berroya'),
        ('Carlos', 'Chaparro'),
        ('Diana', 'Del Monte'),
        ('Eric', 'Etxeberria'),
        ('Filomena', 'Fernández'),
        ('Goretti', 'García'),
        ('Hassan', 'Hernández'),
        ('Inés', 'Irigoyen'),
        ('Jon', 'Jiménez')`;

		let insertSubjects = `INSERT INTO subjects (title)
        VALUES
        ('Cálculo'),
        ('Álgebra'),
        ('Tecnología'),
        ('Mecánica de fluidos'),
        ('Física'),
        ('Química'),
        ('Dibujo técnico'),
        ('Técnicas experimentales'),
        ('Termodinámica'),
        ('Electrotecnia'),
        ('Electrónica'),
        ('EyR de materiales'),
        ('Cálculo de estructuras'),
        ('Mantenimiento aeronáutico'),
        ('Aerodinámica'),
        ('Arquitectura de aeronaves')`;

		let insertGroups = "INSERT INTO `groups` (name)" + " VALUES" + "('1A'), ('1B'),('1C'),('1D'),('2A'),('2B'),('2C'),('3A'),('3B'),('3C')";

		let insertSubjectTeacher = `INSERT INTO subject_teacher (subject_id, teacher_id, group_id)
        VALUES
        (1, 1, 1),
        (2, 2, 1),
        (3, 5, 1),
        (5, 3, 1),
        (7, 6, 1),
        (1, 1, 2),
        (2, 2, 2),
        (3, 6, 2),
        (5, 3, 2),
        (7, 5, 2),
        (1, 2, 3),
        (2, 1, 3),
        (5, 3, 3),
        (6, 4, 3),
        (8, 8, 3),
        (1, 2, 4),
        (2, 1, 4),
        (5, 3, 4),
        (6, 4, 4),
        (8, 8, 4),
        (4, 8, 5),
        (9, 4, 5),
        (10, 7, 5),
        (11, 7, 5),
        (13, 9, 5),
        (4, 8, 6),
        (10, 7, 6),
        (11, 7, 6),
        (13, 9, 6),
        (9, 4, 7),
        (10, 7, 7),
        (11, 7, 7),
        (13, 9, 7),
        (12, 10, 8),
        (14, 10, 8),
        (15, 8, 8),
        (16, 6, 8),
        (12, 10, 9),
        (14, 10, 9),
        (15, 8, 9),
        (16, 5, 9),
        (12, 10, 10),
        (14, 10, 10),
        (15, 8, 10),
        (16, 5, 10)
        `;

		let insertStudents = `INSERT INTO students (first_name, last_name, group_id)
        VALUES
        ('Gabriel', 'García', 7),
        ('Ana', 'Martínez', 3),
        ('Javier', 'Fernández', 5),
        ('Sofía', 'López', 8),
        ('Diego', 'Pérez', 2),
        ('Isabel', 'González', 6),
        ('Alejandro', 'Rodríguez', 1),
        ('María', 'Hernández', 4),
        ('Daniel', 'Díaz', 9),
        ('Laura', 'Torres', 7),
        ('Carlos', 'Sánchez', 3),
        ('Elena', 'Ramírez', 5),
        ('Miguel', 'Muñoz', 8),
        ('Paula', 'Iglesias', 2),
        ('Adrián', 'Romero', 6),
        ('Valeria', 'Ortega', 1),
        ('Juan', 'Jiménez', 4),
        ('Carmen', 'Lara', 9),
        ('José', 'Vega', 7),
        ('Natalia', 'Alvarez', 3),
        ('Francisco', 'Ruiz', 5),
        ('Marta', 'Gómez', 10),
        ('Ricardo', 'Flores', 2),
        ('Beatriz', 'Navarro', 6),
        ('Pablo', 'Cruz', 1),
        ('Lucía', 'Morales', 4),
        ('Andrés', 'Santos', 10),
        ('Rosa', 'Castro', 7),
        ('Fernando', 'Molina', 3),
        ('Victoria', 'Delgado', 5)`;

		let insertMarks = `INSERT INTO marks (student_id, subject_id, date, mark)
        VALUES
        (7, 1, '2023-12-10', 4),
        (7, 2, '2022-04-10', 4),
        (7, 3, '2021-7-10', 1),
        (7, 5, '2021-12-20', 9),
        (7, 7, '2020-04-20', 3),
        (16, 1, '2019-7-20', 1),
        (16, 2, '2022-12-30', 7),
        (16, 3, '2021-04-30', 2),
        (16, 5, '2017-7-30', 6),
        (16, 7, '2018-12-10', 5),
        (25, 1, '2016-04-10', 0),
        (25, 2, '2017-7-10', 1),
        (25, 3, '2015-12-20', 5),
        (25, 5, '2023-04-20', 6),
        (25, 7, '2014-7-20', 8),
        (5, 1, '2013-12-30', 4),
        (5, 2, '2012-04-30', 2),
        (5, 3, '2011-12-30', 1),
        (5, 5, '2011-04-10', 8),
        (5, 7, '2022-7-10', 8),
        (14, 1, '2021-12-10', 4),
        (14, 2, '2019-04-20', 6),
        (14, 3, '2010-7-20', 10),
        (14, 5, '2018-12-20', 9),
        (14, 7, '2016-04-30', 8),
        (23, 1, '2017-7-30', 0),
        (23, 2, '2017-12-30', 3),
        (23, 3, '2023-04-10', 10),
        (23, 5, '2009-7-10', 10),
        (23, 7, '2014-12-10', 7),
        (2, 1, '2014-04-20', 9),
        (2, 2, '2022-7-20', 8),
        (2, 5, '2021-12-20', 9),
        (2, 6, '2014-04-30', 7),
        (2, 8, '2017-7-30', 4),
        (11, 1, '2014-12-30', 5),
        (11, 2, '2015-04-10', 9),
        (11, 5, '2023-7-10', 8),
        (11, 6, '2019-12-10', 10),
        (11, 8, '2014-04-20', 7),
        (20, 1, '2018-7-20', 2),
        (20, 2, '2016-12-20', 8),
        (20, 5, '2017-04-30', 10),
        (20, 6, '2022-7-30', 8),
        (20, 8, '2021-12-30', 0),
        (29, 1, '2014-04-10', 5),
        (29, 2, '2014-12-10', 8),
        (29, 5, '2014-04-10', 4),
        (29, 6, '2013-7-20', 2),
        (29, 8, '2013-12-20', 8),
        (8, 1, '2012-04-20', 5),
        (8, 2, '2020-7-30', 5),
        (8, 5, '2019-12-30', 2),
        (8, 6, '2011-04-30', 5),
        (8, 8, '2011-7-10', 3),
        (17, 1, '2010-12-10', 9),
        (17, 2, '2017-04-10', 7),
        (17, 5, '2008-7-20', 3),
        (17, 6, '2019-12-20', 7),
        (17, 8, '2014-04-20', 3),
        (26, 1, '2018-7-30', 1),
        (26, 2, '2016-12-30', 4),
        (26, 5, '2017-04-30', 4),
        (26, 6, '2007-7-10', 5),
        (26, 8, '2017-12-10', 5),
        (3, 4, '2009-04-10', 4),
        (3, 9, '2020-7-20', 7),
        (3, 10, '2020-12-20', 10),
        (3, 11, '2020-04-20', 8),
        (3, 13, '2020-7-30', 7),
        (12, 4, '2019-12-30', 10),
        (12, 9, '2012-04-30', 8),
        (12, 10, '2018-7-10', 2),
        (12, 11, '2016-12-10', 6),
        (12, 13, '2017-04-10', 10),
        (21, 4, '2012-12-20', 3),
        (21, 9, '2015-04-20', 3),
        (21, 10, '2022-7-20', 2),
        (21, 11, '2021-12-30', 9),
        (21, 13, '2015-04-30', 10),
        (30, 4, '2017-7-30', 4),
        (30, 9, '2017-12-10', 5),
        (30, 10, '2020-04-10', 3),
        (30, 11, '2012-7-10', 3),
        (30, 13, '2012-12-20', 6),
        (6, 4, '2019-04-20', 7),
        (6, 10, '2013-7-20', 4),
        (6, 11, '2018-12-30', 10),
        (6, 13, '2016-04-30', 7),
        (15, 4, '2017-7-30', 4),
        (15, 10, '2023-12-10', 2),
        (15, 11, '2007-04-10', 10),
        (15, 13, '2008-7-10', 4),
        (24, 4, '2023-12-20', 2),
        (24, 10, '2013-04-20', 0),
        (24, 11, '2009-7-20', 2),
        (24, 13, '2017-12-30', 2),
        (1, 9, '2013-04-30', 8),
        (1, 10, '2011-7-30', 7),
        (1, 11, '2011-12-10', 1),
        (1, 13, '2010-04-10', 0),
        (10, 9, '2021-7-10', 7),
        (10, 10, '2009-12-20', 3),
        (10, 11, '2014-04-20', 3),
        (10, 13, '2010-12-20', 0),
        (19, 9, '2020-04-30', 2),
        (19, 10, '2020-7-30', 2),
        (19, 11, '2017-12-30', 10),
        (19, 13, '2011-04-10', 6),
        (28, 9, '2013-7-10', 8),
        (28, 10, '2013-12-10', 10),
        (28, 11, '2013-04-20', 0),
        (28, 13, '2011-7-20', 10),
        (4, 12, '2011-12-20', 10),
        (4, 14, '2010-04-30', 9),
        (4, 15, '2009-7-30', 8),
        (4, 16, '2017-12-30', 10),
        (13, 12, '2012-04-10', 6),
        (13, 14, '2022-7-10', 2),
        (13, 15, '2021-12-10', 9),
        (13, 16, '2020-04-20', 9),
        (9, 12, '2011-7-20', 8),
        (9, 14, '2015-12-20', 5),
        (9, 15, '2015-04-30', 7),
        (9, 16, '2011-7-30', 7),
        (18, 12, '2022-12-30', 8),
        (18, 14, '2021-04-10', 2),
        (18, 15, '2017-7-10', 3),
        (18, 16, '2009-12-10', 0),
        (22, 12, '2012-04-20', 7),
        (22, 14, '2011-7-20', 8),
        (22, 15, '2022-12-20', 9),
        (22, 16, '2021-04-30', 10),
        (27, 12, '2020-12-30', 7),
        (27, 14, '2014-04-30', 7),
        (27, 15, '2009-7-10', 4),
        (27, 16, '2007-12-10', 5)`;

		let insertDirection = `INSERT INTO direction (title, teacher_id)
        VALUES
        ('director', 8),
        ('jefe de estudios', 6),
        ('secretario', 9)`;

		//operaciones tabla dirección
		let addCol = `ALTER TABLE direction ADD COLUMN new_title VARCHAR(50)`;
		let delCol = `ALTER TABLE direction DROP COLUMN title`;
		let tableDelete = `DROP TABLE direction`;

		//modificar y obtener datos
		let setMarks = `UPDATE marks SET mark=0`;
		let getStudents = `SELECT first_name, last_name FROM students`;
		let getTeacherData = `SELECT * FROM teachers`;

		// //Llamadas a las funciones
		// //Crear tablas
		// crud(sqlTeachers);
		// crud(sqlSubjects);
		// crud(sqlGroups);
		// crud(sqlStudents);
		// crud(sqlTMarks);
		// crud(sqlSubject_teacher);
		// crud(sqlDirection);

		// //Insertar datos
		// crud(insertTeachers);
		// crud(insertSubjects);
		// crud(insertGroups);
		// crud(insertStudents);
		// crud(insertSubjectTeacher);
		// crud(insertMarks);
		// crud(insertDirection);

		// //Operaciones tabla dirección
		// crud(addCol);
		// crud(delCol);
		// crud(tableDelete);

		// //poner todas las notas a 0
		// crud(setMarks);

		// // nombre y apellido de todos los estudiantes
		// crud(getStudents);

		// //Todos los datos de los profesores
		// crud(getTeacherData);
	} catch (error) {
		console.log(error);
		await connection.end();
	}
};

main();
