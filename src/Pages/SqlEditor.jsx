import React, { Suspense, useState } from 'react';

import Editor from '../Components/editor/Editor'

import Loader from '@mui/material/LinearProgress';

import { sendGetRequest, sendPostRequest, API_HOSTNAME } from '../Hooks/useApiRequest';

import { Container, Typography, Button } from '@mui/material';

import './CSS/SqlEditor.css';

function Question({ query, question, setQuestion, history, setHistory, setExpectedResult, setActualResult, result, setResult }) {
	
	

	function loadQuestion(id) {
		sendGetRequest(`${API_HOSTNAME}/question?q=${id}`, data => {
			setQuestion(data)
			setHistory(data.history.toReversed());
			setExpectedResult(data.expected);
			setActualResult("");
			setResult("");
		});
	}
	function loadNextQuestion() {
		loadQuestion(question.id + 1);
	}

	if (question === null) {
		loadQuestion(1);

		return (
			<Container
				sx={{
					textAlign: 'center',
				}}>
				<p>Loading...</p>
			</Container>
		);
	} else {
		return (
			<Container
				sx={{
					textAlign: 'center',
				}}>
				<div style={{'font-size': '1.25rem'}}>{question.question}</div>

				<Typography variant="body1">{
					typeof result === 'string' ? result
					: 'error' in result ? result.error : (result.success ? "You answered correctly!" : "Try again")
				}</Typography>
			</Container>
		);
	}
}


function formatQueryResults(results) {
	if (typeof results === 'string') return results;
	else if (!('length' in results) || results.length === 0) return "";

	if (results[0] instanceof Array) {
		return "Please do not enter more than one SELECT query";
	}

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
	
	return <table className='results-table' style={{width: "100%"}}>
		<thead>
			<tr>{columnTh}</tr>
		</thead>
		<tbody>{rows}</tbody>
	</table>;
}

function SqlEditor() {
	const [query, setQuery] = useState('select * from customers');
	const [question, setQuestion] = React.useState(null);
	const [history, setHistory] = useState([]);
	const [expectedResult, setExpectedResult] = useState([]);
	const [actualResult, setActualResult] = useState([]);
	const [result, setResult] = React.useState('');

	function loadQuestion(id) {
		sendGetRequest(`${API_HOSTNAME}/question?q=${id}`, data => {
			setQuestion(data)
			setHistory(data.history.toReversed());
			setExpectedResult(data.expected);
			setActualResult("");
			setResult("");
		});
	}
	function loadFirstQuestion() {
		loadQuestion(1);
	}
	function loadNextQuestion() {
		loadQuestion(question.id + 1);
	}

	function submitQuery() {
		//let query = document.querySelector('#editor textarea').value;

		if (query.length === 0) {
			const result = {
				success: false,
				result: "Please enter a query"
			};

			setResult(result);
			setActualResult(result.result);

			return;
		}

		sendPostRequest(`${API_HOSTNAME}/answer`, { query: query.trim(), question: question.id }, data => {
			setResult(data);
			setActualResult('error' in data ? data.error : data.result);
			setHistory([query, ...history]);
		});
	}

	return (
		<>
			<div className='solid-background'></div>
			<div style={{'margin-bottom': '150px'}}></div>
			<div>
				<div>
					<Suspense fallback={<Loader />}>
						<Question
							query={query}
							question={question}
							setQuestion={setQuestion}
							history={history}
							setHistory={setHistory}
							setExpectedResult={setExpectedResult}
							setActualResult={setActualResult}
							result={result}
							setResult={setResult}
						/>
						<div style={{ 'margin-bottom': '16px' }}></div>
						<Editor
							value={query}
							setValue={setQuery}
							history={history}
							setHistory={setHistory}
							setExpectedResult={setExpectedResult}
							setActualResult={setActualResult}
						/>
						
						{ question !== null &&
							<>
							<button className='secondary-btn' onClick={() => {
								sendPostRequest(`${API_HOSTNAME}/clearhistory`, { question: question.id }, data => {
									setHistory([]);
								});
							}}>
								Clear history
							</button>
							<div style={{'float': 'right'}}>
								<button class="primary-btn" onClick={submitQuery}>
									Submit query
								</button>

								{ result !== null && result.success
									? 	<button className='secondary-btn' onClick={loadNextQuestion}>
											Next question
										</button>
									: 	<button className='secondary-btn' disabled>
											Next question
										</button>
								}
							</div>
							</>
						}

						{/* {query ? <TableContainer query={query} /> : <Placeholder />} */}
						<table style={{width: "100%"}}>
							<thead>
								<tr>
									<th style={{width: "50%", "border-right": "1px solid black"}}>Expected Results</th>
									<th style={{width: "50%"}}>Actual Results</th>
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
		</>
	);
}

export default SqlEditor;
