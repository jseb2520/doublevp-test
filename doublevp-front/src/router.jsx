import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {HomeView} from './pages/Home';
import {UserView} from './pages/User';
import {DBUsers} from './pages/SavedUsers';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<HomeView />} />
			<Route path='/users/:username' element={<UserView />} />
			<Route path='/db/users' element={<DBUsers />} />
		</Routes>
	);
};

export default Router;
