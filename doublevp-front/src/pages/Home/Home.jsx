import React, {useState, useEffect} from 'react';
import SearchBar from '../../components/SearchBar';
import EntryList from '../../components/EntryList';
import './Home.css';

import {fetchUsers, getUser} from '../../utils/api';

const Home = () => {
	const [entries, setEntries] = useState([]);
	const [filteredEntries, setFilteredEntries] = useState([]);

	async function retrieveUsers() {
		const users = await fetchUsers();
		setEntries(users.items);
	}

	useEffect(() => {
		retrieveUsers();
	}, []);

	const handleSearch = async (searchText) => {
		if (searchText.length < 4) {
			alert('search must have at least 4 characters...');
		} else if (searchText === 'doublevpartners') {
			alert('user cannot be doublevpartners');
		} else {
			const user = await getUser(searchText);
			setFilteredEntries(user.items);
		}
	};

	return (
		<div className='App'>
			<h1>GitHub users List App</h1>
			<SearchBar onSearch={handleSearch} />
			<EntryList
				entries={filteredEntries.length > 0 ? filteredEntries : entries}
			/>
		</div>
	);
};

export default Home;
