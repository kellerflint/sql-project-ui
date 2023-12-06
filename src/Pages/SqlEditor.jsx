import React, { Suspense, useState } from 'react';

import Editor from '../Components/editor/Editor'

import Loader from '@mui/material/LinearProgress';

import { sendGetRequest, sendPostRequest, API_HOSTNAME } from '../Hooks/useApiRequest';

import { Container, Typography } from '@mui/material';

import DataTable from 'react-data-table-component';

import './CSS/SqlEditor.css';

function getResultText(result) {
	if (typeof result === 'string') return result;
	if ('error' in result) return result.error;

	return result.success
		? "You answered correctly!"
		: "Try again";
}

function Question({ question, setQuestion, setHistory, setExpectedResult, setActualResult, result, setResult }) {

	const loadQuestion = (id) => {
		sendGetRequest(`${API_HOSTNAME}/question?q=${id}`, data => {
			setQuestion(data)
			setHistory(data.history.toReversed());
			setExpectedResult(data.expected);
			setActualResult("");
			setResult("");
		});
	}

	if (question === null) {
		loadQuestion(1);

		return (
			<Container sx={{textAlign: 'center'}}>
				<p>Loading...</p>
			</Container>
		);
	} else {
		return (
			<Container sx={{textAlign: 'center'}}>
				<div style={{fontSize: '1.25rem'}}>{question.question}</div>

				<Typography variant="body1">{getResultText(result)}</Typography>
			</Container>
		);
	}
}


function ResultTable({ results }) {
	if (typeof results !== 'object') return <div>{results}</div>;
	else if (!('length' in results) || results.length === 0) return <div></div>;

	const columns = Object.keys(results[0]).map(col => {
		return {
			name: col,
			selector: row => row[col],
			sortable: true,
		}
	});

	return <DataTable columns={columns} data={results}/>;
}

function SqlEditor() {
	const [query, setQuery] = useState('select * from customers');
	const [question, setQuestion] = React.useState(null);
	const [history, setHistory] = useState([]);
	const [expectedResult, setExpectedResult] = useState([]);
	const [actualResult, setActualResult] = useState([]);
	const [result, setResult] = React.useState('');
	

	const loadQuestion = (id) => {
		sendGetRequest(`${API_HOSTNAME}/question?q=${id}`, data => {
			setQuestion(data)
			setHistory(data.history.toReversed());
			setExpectedResult(data.expected);
			setActualResult("");
			setResult("");
		});
	}

	const submitQuery = () => {
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

	const clearHistory = () => {
		sendPostRequest(`${API_HOSTNAME}/clearhistory`, { question: question.id }, data => {
			setHistory([]);
		});
	};

	const loadNextQuestion = () => loadQuestion(question.id + 1);

	return (
		<>
			<div className='solid-background'></div>
			<div style={{'marginBottom': '150px'}}></div>
			<div>
				<div>
					<Suspense fallback={<Loader />}>
						<Question
							question={question}
							setQuestion={setQuestion}
							setHistory={setHistory}
							setExpectedResult={setExpectedResult}
							setActualResult={setActualResult}
							result={result}
							setResult={setResult}
						/>
						<div style={{ 'marginBottom': '16px' }}></div>
						<Editor
							value={query}
							setValue={setQuery}
							history={history}
						/>
						
						{ question !== null &&
							<>
							<button className='secondary-btn' onClick={clearHistory}>Clear history</button>
							
							<div style={{'float': 'right'}}>
								<button className="primary-btn" onClick={submitQuery}>Submit query</button>

								{ result !== null && result.success
									? <button className='secondary-btn' onClick={loadNextQuestion}>Next question</button>
									: <button className='secondary-btn' disabled>Next question</button>
								}
							</div>
							</>
						}

						<table style={{width: "100%"}}>
							<thead>
								<tr>
									<th style={{width: "50%", "borderRight": "1px solid black"}}>Expected Results</th>
									<th style={{width: "50%"}}>Actual Results</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td style={{"borderRight": "1px solid black"}}><ResultTable results={expectedResult}/></td>
									<td><ResultTable results={actualResult}/></td>
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
