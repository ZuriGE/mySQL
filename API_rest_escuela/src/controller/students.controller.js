const { pool } = require("../database");

const getStudent = async (req, res) => {
	try {
		let sql;
		let params = [];
		let ans;
		console.log(req.query.student_id);
		if (req.query.student_id == null) {
			sql = "SELECT * FROM students";
		} else {
			sql = "SELECT * FROM students WHERE student_id = ?";
			params.push(`${req.query.student_id}`);
		}
		let [result] = await pool.query(sql, params);

		console.log(result);
		if (result.length == 0) {
			ans = { error: true, code: 1, message: "student not found", data: result };
		} else {
			ans = { error: false, code: 200, message: "student found", data: result };
		}

		console.log(result);
		res.send(ans);
	} catch (err) {
		console.log(err);
	}
};

const postStudent = async (req, res) => {
	try {
		console.log(req.body);
		let params = [`${req.body.first_name}`, `${req.body.last_name}`, `${req.body.group_id}`, `${req.body.year}`];
		let sql = "INSERT INTo students (first_name, last_name, group_id, year) VALUES (?,?,?,?)";

		let [result] = await pool.query(sql, params);
		console.log(result);

		if (result.insertId) {
			// res.send(String(result.insertId));
			ans = { error: false, code: 200, message: String(result.insertId), data: result };
		} else {
			ans = { error: true, code: 1, message: "student not created", data: result };
		}

		res.send(ans);
	} catch (err) {
		console.log(err);
	}
};

const putStudent = async (req, res) => {
	try {
		let sql;
		// let params = [`${req.body.first_name}`, `${req.body.last_name}`, `${req.body.group_id}`, `${req.body.year}`, `${req.body.student_id}`];
		let params = [req.body.first_name, req.body.last_name, req.body.group_id, req.body.year, req.body.student_id];
		sql = "UPDATE students SET first_name = COALESCE(?, first_name),last_name = COALESCE(?, last_name),group_id = COALESCE(?, group_id), year = COALESCE(?, year) WHERE student_id = ?";

		console.log(sql);

		let [result] = await pool.query(sql, params);
		console.log(result);
		res.send(result);
	} catch (err) {
		console.log(err);
	}
};
const delStudent = async (req, res) => {
	try {
		let params = [req.body.student_id];
		let sql = "DELETE FROM students WHERE student_id = ?";
		let [result] = await pool.query(sql, params);

		res.send(result);
	} catch (err) {
		console.log(err);
	}
};

module.exports = { getStudent, postStudent, putStudent, delStudent };
