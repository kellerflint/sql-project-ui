import React, { Suspense, useState } from 'react';

import Editor from '../Components/editor/Editor'

import Loader from '@mui/material/LinearProgress';

function formatQueryResults(results) {
	if (typeof results === 'string') return results;
	else if (!('length' in results) || results.length == 0) return "";

	let columns = [];
	for (let key in results[0]) columns.push(key);

	let width = `${100 / columns.length}%`;

	let columnTh = []
	for (let val of columns) columnTh.push(<td style={{width: width}}>{val}</td>)

	let rows = [];
	for (let row of results) {
		let columnData = [];

		for (let key of columns) columnData.push(<td style={{"font-weight": "normal"}}>{row[key]}</td>);

		rows.push(<tr>{columnData}</tr>);
	}
	
	return <table style={{width: "100%"}}>
		<thead>
			<tr>{columnTh}</tr>
		</thead>
		<tbody>{rows}</tbody>
	</table>;
}

function SqlEditor() {
	const [query, setQuery] = useState('');
	const [value, setValue] = useState('select * from customers');
	const [history, setHistory] = useState([]);
	const [expectedResult, setExpectedResult] = useState([]);
	const [actualResult, setActualResult] = useState([]);

	return (
		<div>
			<div>
				<Suspense fallback={<Loader />}>
					<Editor
						value={value}
						setValue={setValue}
						history={history}
						setHistory={setHistory}
						setExpectedResult={setExpectedResult}
						setActualResult={setActualResult}
					/>
					{/* {query ? <TableContainer query={query} /> : <Placeholder />} */}
					<table style={{width: "100%"}}>
						<thead>
							<tr>
								<th style={{width: "50%", "border-right": "1px solid black"}}>Expected</th>
								<th style={{width: "50%"}}>Actual</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td style={{"border-right": "1px solid black"}}>{formatQueryResults(expectedResult)}</td>
								<td>{formatQueryResults(actualResult)}</td>
							</tr>
						</tbody>
					</table>
				</Suspense>
			</div>
		</div>
	);
}

export default SqlEditor;
