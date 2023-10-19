/* eslint-disable react/display-name */
import React, { useMemo } from 'react';

import { Table } from 'components';
import useData from 'hooks/useData';

import styled from '@emotion/styled';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const QueryTime = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: #1876d1;
	color: #fff;
	padding: 5px;
	border-radius: 8px;
	width: fit-content;
	margin: 0 auto;
	margin-top: 16px;
`;

const TableContainer = React.memo(({ query }) => {
	const { data, queryExecTime, error } = useData(query);

	const columns = useMemo(() => {
		if (data.length > 0) {
			return Object.keys(data[0]).map((key) => {
				const result = data[0][key].replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, ' $1');

				return {
					Header: result,
					accessor: key,
				};
			});
		}
	}, [data]);

	const queryData = useMemo(() => data.slice(1), [data]);
	if (error)
		return (
			<section>
				<h1>Something Went Wrong</h1>
			</section>
		);
	return (
		<>
			{data.length > 0 ? (
				<>
					<QueryTime>
						<Typography variant="body1" fontWeight={300}>
							Query took:
						</Typography>
						<Typography variant="subtitle1" fontWeight={700}>{`${queryExecTime.toFixed(2)} ms`}</Typography>
					</QueryTime>
					<Table columns={columns} completeData={data} data={queryData} query={query} />
				</>
			) : (
				<Stack direction="column" justifyContent={'center'} alignItems={'center'} sx={{ width: '100%', mt: 3 }}>
					<Skeleton width="70%" />
					<Skeleton width="70%" animation="wave" />
					<Skeleton width="70%" />
					<Skeleton width="70%" animation="wave" />
					<Skeleton width="70%" />
					<Skeleton width="70%" animation={false} />
				</Stack>
			)}
		</>
	);
});

export default TableContainer;
