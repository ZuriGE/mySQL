const { pool } = require("../database");

const getMarks = async (req, res) => {
	try {
		let params = [req.query.student_id];
		let sql = "SELECT CONCAT(students.first_name, ' ', students.last_name) as Alumno, AVG(mark) as Nota_media FROM marks JOIN students ON marks.student_id = students.student_id WHERE marks.student_id = ?";

		let [result] = await pool.query(sql, params);
		console.log(result);
		res.send(result);
	} catch (err) {
		console.log(err);
	}
};

const getSignedUp = async (req, res) => {
	try {
		let sql;
		let params = [];
		if (req.query.student_id == null) {
			sql = "SELECT students.first_name, students.last_name, GROUP_CONCAT(subjects.title SEPARATOR ', ') as subjects FROM students JOIN `groups` ON students.group_id = groups.group_id JOIN subject_teacher ON groups.group_id = subject_teacher.group_id JOIN subjects ON subject_teacher.subject_id = subjects.subject_id GROUP BY student_id";
		} else {
			params.push(`${req.query.student_id}`);
			sql = "SELECT subjects.title FROM subjects JOIN subject_teacher on subjects.subject_id = subject_teacher.subject_id JOIN students ON subject_teacher.group_id=students.group_id WHERE students.student_id = ?";
		}

		let [result] = await pool.query(sql, params);
		console.log(result);
		res.send(result);
	} catch (err) {
		console.log(err);
	}
};

const getTeacherSubject = async (req, res) => {
	try {
		let sql;
		let params = [];
		if (req.query.teacher_id == null) {
			sql = "SELECT t.first_name as name, t.last_name as surname, GROUP_CONCAT(DISTINCT s.title SEPARATOR ', ') as subjects FROM teachers as t JOIN subject_teacher st on t.teacher_id = st.teacher_id JOIN subjects as s ON st.subject_id = s.subject_id GROUP BY t.teacher_id";
		} else {
			params.push(`${req.query.teacher_id}`);
			sql = "SELECT DISTINCT s.title FROM teachers as t JOIN subject_teacher st on t.teacher_id = st.teacher_id JOIN subjects as s ON st.subject_id = s.subject_id WHERE t.teacher_id = ?";
		}

		let [result] = await pool.query(sql, params);
		console.log(result);
		res.send(result);
	} catch (err) {
		console.log(err);
	}
};

module.exports = { getMarks, getSignedUp, getTeacherSubject };
