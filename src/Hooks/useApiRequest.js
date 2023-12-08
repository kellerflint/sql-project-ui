export function sendGetRequest(url, oncomplete) {
	fetch(url, { method: 'GET' }).then((res) => res.json().then((data) => oncomplete(data)));
}
export function sendPostRequest(url, body, oncomplete) {
	fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((res) => res.json().then((data) => oncomplete(data)));
}

// TODO: This should go in a config file
export const API_HOSTNAME = 'http://localhost:3001';
