import { useEffect, useState } from 'react';

import alasql from 'alasql';
import { AVAILABLE_TABLES } from 'constants/constants';

const getURL = (name) =>
	`https://api.github.com/repos/graphql-compose/graphql-compose-examples/contents/examples/northwind/data/csv/${name}.csv`;

const useData = (tableName) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(false);
	const [queryExecTime, setQueryExecTime] = useState();
	const [showToast, setShowToast] = useState('');
	const [toastMsg, setToastMsg] = useState('');

	const convertToJson = (data) => {
		alasql
			.promise("SELECT * FROM CSV(?, {headers: false, separator:','})", [data])
			.then((data) => {
				setData(data);
				setShowToast('success');
				setToastMsg('Query ran successfully');
			})
			.catch((e) => {
				setShowToast('error');
				setToastMsg(e.message);
			});
	};

	useEffect(() => {
		const fetchData = (tableName) => {
			setData([]);
			const name = AVAILABLE_TABLES.find((currName) => currName === tableName);
			if (name) {
				setError(false);
				fetch(getURL(tableName), {
					headers: {
						Accept: 'application/vnd.github.v4+raw',
					},
				})
					.then((res) => {
						if (res.ok) {
							return res.json();
						} else {
							throw new Error('Something went wrong');
						}
					})
					.then((data) => convertToJson(atob(data.content.replace('\n', ''))))
					.catch((error) => {
						setShowToast('error');
						setToastMsg(error.message);
					});
			} else {
				setError(true);
				setShowToast('error');
				setToastMsg('Please enter a valid query');
			}
		};
		let startTime = performance.now();
		fetchData(tableName);
		let endTime = performance.now();
		setQueryExecTime(endTime - startTime);
	}, [tableName]);

	return { data, queryExecTime, error, showToast, toastMsg };
};

export default useData;
