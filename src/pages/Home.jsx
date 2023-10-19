import React, { Suspense, useState } from 'react';

import { Editor, Navbar, Placeholder, TableContainer } from 'components';

import Loader from '@mui/material/LinearProgress';

function Home() {
	const [query, setQuery] = useState('');
	const [value, setValue] = useState('select * from customers');
	const [history, setHistory] = useState([]);

	return (
		<div>
			<Navbar
				query={query}
				setQuery={setQuery}
				value={value}
				setValue={setValue}
				history={history}
				setHistory={setHistory}
			/>
			<div>
				<Suspense fallback={<Loader />}>
					<Editor value={value} setValue={setValue} history={history} />
					{query ? <TableContainer query={query} /> : <Placeholder />}
				</Suspense>
			</div>
		</div>
	);
}

export default Home;
