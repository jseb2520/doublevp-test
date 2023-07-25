const express = require('express');
const cors = require('cors');
const axios = require('axios').default;
const app = express();
const {Pool} = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const port = 4000;

// GitHub public API base endpoint
const GH_API = 'https://api.github.com/search/users';

const pool = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_DATABASE,
});

// Parse request body with express middleware
app.use(express.json());

// Enable CORS
app.use(cors());

// Endpoint to get all public users
app.get('/api/users', async (req, res) => {
	const gh_data = await axios
		.get(GH_API + '?q=abcd&per_page=10')
		.then((response) => response.data);
	res.status(200).json(gh_data);
});

// Endpoint to search a public user by username
app.get('/api/users/search', async (req, res) => {
	const searchText = req.query.q;
	const user_data = await axios
		.get(`${GH_API}?q=${searchText}`)
		.then((response) => response.data);
	res.status(200).json(user_data);
});

// PG DB requests

// Create the users table
async function createUsersTable() {
	try {
		const client = await pool.connect();
		const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        login TEXT NOT NULL,
        avatar_url TEXT
      )
    `;
		await client.query(query);
		client.release();
		console.log("Users table created (if it didn't exist).");
	} catch (err) {
		console.error('Error creating users table:', err);
	}
}

// Endpoint to get all users from DB
app.get('/api/db/users', async (req, res) => {
	try {
		const client = await pool.connect();
		const result = await client.query('SELECT * FROM users');
		client.release();
		res.status(200).json(result.rows);
	} catch (err) {
		console.error('Error fetching entries:', err);
		res.status(500).json({error: 'An error occurred while fetching entries'});
	}
});

// POST endpoint to create an entry
app.post('/api/db/users', async (req, res) => {
	const user = req.body;

	if (!user.login || !user.id || !user.avatar_url) {
		return res
			.status(400)
			.json({error: 'login, id and avatar_url are required fields.'});
	}

	try {
		const client = await pool.connect();
		const result = await client.query(
			'INSERT INTO users (login, id, avatar_url) VALUES ($1, $2, $3) RETURNING *',
			[user.login, user.id, user.avatar_url]
		);
		client.release();

		res.status(201).json(result.rows);
	} catch (err) {
		console.error('Error creating user:', err);
		res.status(500).json({error: 'An error occurred while creating the user.'});
	}
});

// Create the users table on database
createUsersTable();

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
