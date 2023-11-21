import React from 'react';
import { sendGetRequest, sendPostRequest, API_HOSTNAME } from '../../Hooks/useApiRequest';

import { Container, Typography, Button } from '@mui/material';

function Question({ query, history, setHistory, setExpectedResult, setActualResult }) {
	const [question, setQuestion] = React.useState({});
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

		sendPostRequest(`${API_HOSTNAME}/answer`, { query: query.trim(), question: question.id }, data => {
			setResult(data);
			setActualResult('error' in data ? data.error : data.result);
			setHistory([query, ...history]);
		});
	}

	function clearHistory() {
		sendPostRequest(`${API_HOSTNAME}/clearhistory`, { question: question.id }, data => {
			setHistory([]);
		});
	}

	// TODO: Use a typescript class to define what question objects should contain.
	let hasQuestion = 'question' in question && 'context' in question && 'id' in question && 'history' in question;

	if (!hasQuestion) {
		return (
			<Container
				sx={{
					textAlign: 'center',
				}}>
				<Button variant="contained" onClick={loadFirstQuestion}>
					Begin assignment
				</Button>
			</Container>
		);
	} else {
		return (
			<Container
				sx={{
					textAlign: 'center',
				}}>
				<Typography variant="body1">{question.question}</Typography>
				<Button variant="contained" onClick={submitQuery}>
					Submit query
				</Button>
				<Button variant="contained" onClick={clearHistory}>
					Clear history
				</Button>

				<Typography variant="body1">{
					typeof result === 'string' ? result
					: 'error' in result ? result.error : (result.success ? "You answered correctly!" : "Try again")
				}</Typography>
				{
					result.success
						? <Button variant="contained" onClick={loadNextQuestion}>Next</Button>
						: <></>
				}
			</Container>
		);
	}
}

export default Question;
