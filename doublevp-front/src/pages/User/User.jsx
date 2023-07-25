import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getUser, exportUser} from '../../utils/api';

const User = () => {
	const [userData, setUserData] = useState({});
	const {username} = useParams();

	async function retrieveUser() {
		const user = await getUser(username);
		setUserData(user.items[0]);
	}

	const saveUser = async () => {
		try {
			let user = {
				login: userData.login,
				id: userData.id,
				avatar_url: userData.avatar_url,
			};

			const response = await exportUser(user);
			console.log('response export :>> ', response);
		} catch (error) {
			console.log('error exporting user: ', error);
		}
	};

	useEffect(() => {
		retrieveUser();
	}, [username]);

	return (
		<div
			style={{
				padding: '24px',
				margin: '24px 0',
				borderTop: '1.5px solid #eaeaea',
				display: 'flex',
				alignItems: 'center',
				gap: '16px',
			}}
		>
			<img
				style={{borderRadius: '50%'}}
				width={100}
				height={100}
				src={userData.avatar_url}
				alt={userData.login}
			/>
			<div>
				<h2>Username: {userData.login}</h2>
				<h2>Type: {userData.type}</h2>
				<h2>Score: {userData.score}</h2>
			</div>
			<button onClick={saveUser}>Export user</button>
		</div>
	);
};

export default User;
