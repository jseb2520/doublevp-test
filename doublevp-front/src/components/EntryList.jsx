import React from 'react';
import {Link} from 'react-router-dom';

const EntryList = ({entries}) => {
	return (
		<ul>
			{entries.map((entry, index) => (
				<li key={index}>
					<div
						style={{
							padding: '24px',
							margin: '24px 0',
							border: '1.5px solid #eaeaea',
							display: 'flex',
							alignItems: 'center',
							gap: '20px',
						}}
					>
						Username:{' '}
						<Link to={`/users/${entry.login}`}>{entry.login}</Link>
						<p>ID: {entry.id}</p>
						<div>
							<img
								style={{borderRadius: '50%'}}
								width={50}
								height={50}
								src={entry.avatar_url}
								alt={entry.login}
							/>
						</div>
					</div>{' '}
				</li>
			))}
		</ul>
	);
};

export default EntryList;
