// Reusable api request functions

const API_BASE_URL = 'http://localhost:4000';

const fetchUsers = async () => {
	try {
		const response = await fetch(`${API_BASE_URL}/api/users`);
		const users = await response.json();
		return users;
	} catch (error) {
		console.error('Error fetching users: ', error);
	}
};

const getUser = async (searchText = '') => {
	try {
		const response = await fetch(
			`${API_BASE_URL}/api/users/search?q=${searchText}`
		);
		const user = await response.json();
		return user;
	} catch (error) {
		console.error('Error fetching user: ', error);
	}
};

// save user in db

const exportUser = async (userData = {}) => {
	try {
		const response = await fetch(`${API_BASE_URL}/api/db/users`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(userData),
		});
		const user = await response.json();
		return user;
	} catch (error) {
		console.error('Error exporting user: ', error);
	}
};

// save user in db

const listDBUsers = async () => {
	try {
		const response = await fetch(`${API_BASE_URL}/api/db/users`);
		const list = await response.json();
		return list;
	} catch (error) {
		console.error('Error exporting user: ', error);
	}
};

export {fetchUsers, getUser, exportUser, listDBUsers};
