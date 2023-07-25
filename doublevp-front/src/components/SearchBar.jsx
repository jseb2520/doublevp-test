import React, {useState} from 'react';

export default function SearchBar({onSearch}) {
	const [searchText, setSearchText] = useState('');

	const handleChange = (event) => {
		setSearchText(event.target.value);
	};

	const handleSearch = () => {
		onSearch(searchText);
	};

	return (
		<div>
			<input
				type='text'
				value={searchText}
				onChange={handleChange}
				placeholder='Search...'
				style={{height: 32}}
			/>
			<button onClick={handleSearch}>Search</button>
		</div>
	);
}
