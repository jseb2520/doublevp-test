import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import EntryList from '../../components/EntryList';
import {listDBUsers} from '../../utils/api';

const DBUsers = () => {
	const [users, setUsers] = useState([]);
	const {username} = useParams();

	async function retrieveDBUsers() {
		const list = await listDBUsers(username);
		setUsers(list);
	}

	useEffect(() => {
		retrieveDBUsers();
	}, []);

	return (
		<div className='db-users'>
			<h1>Users saved on DB</h1>
			{users.length < 1 ? (
				<div>
					<h2> No users saved on DB</h2>
				</div>
			) : (
				<EntryList entries={users.length > 0 && users} />
			)}
		</div>
	);
};

export default DBUsers;
