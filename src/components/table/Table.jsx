/* eslint-disable react/jsx-key */
import React, { useState } from 'react';

import CsvDownload from 'react-json-to-csv';
import { useAsyncDebounce, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import { exportToJson } from 'utils';

import styled from '@emotion/styled';
import {
	DownloadForOffline,
	KeyboardArrowLeft,
	KeyboardArrowRight,
	KeyboardDoubleArrowLeft,
	KeyboardDoubleArrowRight,
	Search,
} from '@mui/icons-material';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { styled as s } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const SearchContainer = styled.div`
	border: 2px solid #1876d0;
	padding: 5px;
	border-radius: 4px;
`;

const StyledTableCell = s(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = s(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const SearchRow = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) => {
	const count = preGlobalFilteredRows.length;
	const [value, setValue] = useState(globalFilter);
	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 200);

	return (
		<SearchContainer>
			<Stack direction="row" justifyContent="center" alignItems="center">
				<FormControl variant="outlined">
					<InputLabel htmlFor="input-with-icon-adornment">{`${count} records...`}</InputLabel>
					<Input
						id="input-with-icon-adornment"
						onChange={(e) => {
							setValue(e.target.value);
							onChange(e.target.value);
						}}
						value={value || ''}
						startAdornment={
							<InputAdornment position="start">
								<Search />
							</InputAdornment>
						}
					/>
				</FormControl>
			</Stack>
		</SearchContainer>
	);
};

const TableComponent = ({ columns, data, completeData, query }) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,
		previousPage,
		nextPage,
		canPreviousPage,
		canNextPage,
		state,
		setPageSize,
		pageOptions,
		gotoPage,
		pageCount,
		setGlobalFilter,
		preGlobalFilteredRows,
	} = useTable(
		{
			columns,
			data,
		},
		useGlobalFilter,
		useSortBy,
		usePagination,
	);

	return (
		<>
			<Stack sx={{ padding: '2% 5%' }} direction="row" justifyContent="space-between" alignItems="center">
				<SearchRow
					preGlobalFilteredRows={preGlobalFilteredRows}
					globalFilter={state.globalFilter}
					setGlobalFilter={setGlobalFilter}
				/>
				<Stack direction="row" justifyContent="space-between" alignItems="center">
					<CsvDownload style={{ border: 'none', padding: 0 }} data={completeData} filename={`${query}.csv`}>
						<Button sx={{ border: 'none' }} variant="contained" color="primary">
							<DownloadForOffline sx={{ marginRight: '5px' }} />
							CSV
						</Button>
					</CsvDownload>
					<Button sx={{ ml: 2 }} onClick={() => exportToJson(completeData, query)} variant="contained" color="inherit">
						<DownloadForOffline sx={{ marginRight: '5px' }} />
						JSON
					</Button>
				</Stack>
			</Stack>

			<TableContainer component={Paper}>
				<Table {...getTableProps()} sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						{headerGroups.map((headerGroup) => (
							<TableRow {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<StyledTableCell>
										<Typography variant="body2">{column.render('Header')}</Typography>
									</StyledTableCell>
								))}
							</TableRow>
						))}
					</TableHead>

					<TableBody {...getTableBodyProps()}>
						{page.map((row) => {
							prepareRow(row);
							return (
								<StyledTableRow {...row.getRowProps()} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									{row.cells.map((cell) => {
										return <StyledTableCell {...cell.getCellProps()}>{cell.render('Cell')}</StyledTableCell>;
									})}
								</StyledTableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>

			<Stack
				sx={{ marginTop: '5%', marginBottom: '5%' }}
				direction="column"
				justifyContent="center"
				alignItems="center">
				<Typography variant="subtitle1">{`Page ${state.pageIndex + 1} of ${pageOptions.length}`}</Typography>
				<Stack direction="row" justifyContent="flex-end" alignItems="center">
					<FormControl sx={{ m: 1, minWidth: 120 }}>
						<InputLabel>Rows per page</InputLabel>
						<Select
							value={state.pageSize}
							label="Rows per page"
							onChange={(e) => {
								setPageSize(Number(e.target.value));
							}}>
							<MenuItem value={5}>5</MenuItem>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={20}>20</MenuItem>
						</Select>
					</FormControl>
					<Stack direction="row" justifyContent="center" alignItems="center">
						<IconButton onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
							<KeyboardDoubleArrowLeft />
						</IconButton>
						<IconButton onClick={() => previousPage()} disabled={!canPreviousPage}>
							<KeyboardArrowLeft />
						</IconButton>
						<IconButton onClick={() => nextPage()} disabled={!canNextPage}>
							<KeyboardArrowRight />
						</IconButton>
						<IconButton onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
							<KeyboardDoubleArrowRight />
						</IconButton>
					</Stack>
				</Stack>
			</Stack>
		</>
	);
};

export default TableComponent;
