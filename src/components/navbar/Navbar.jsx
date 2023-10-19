import React, { useState } from 'react';

import useData from 'hooks/useData';
import useMediaQuery from 'hooks/useMediaQuery';

import JoinFull from '@mui/icons-material/JoinFull';
import PlayCircle from '@mui/icons-material/PlayCircle';
import Storage from '@mui/icons-material/Storage';
import TableChart from '@mui/icons-material/TableChart';
import { Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';

import { AVAILABLE_TABLES, TABLE_FIELDS } from '../../constants/constants';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

function Navbar({ query, setQuery, value, setValue, history, setHistory }) {
	const { showToast, toastMsg } = useData(query);
	const [open, setOpen] = React.useState(false);
	const [state, setState] = useState({
		right: false,
	});
	const [backdropToggle, setBackdropToggle] = useState(false);
	const [selectedTable, setSelectedTable] = useState('categories');
	const isMobileView = useMediaQuery('(max-width: 700px)');

	const toggleDrawer = (anchor, open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setState({ ...state, [anchor]: open });
	};

	const onSubmit = () => {
		var Z = value.toLowerCase().slice(value.indexOf('from') + 'from'.length);
		setQuery(Z.split(' ')[1]);

		if (toastMsg !== '') {
			setOpen(true);
		}

		setHistory([...history, value]);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const horizontal = 'bottom';
	const vertical = 'right';

	const selectTables = (anchor) => (
		<Box
			sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, padding: '10px' }}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}>
			<Typography textAlign="center" variant="subtitle1" fontWeight={700}>
				Available Tables:
			</Typography>
			<Stack direction="column" justifyContent="center" alignItems="center">
				{AVAILABLE_TABLES.map((table) => (
					<>
						<Chip
							sx={{ margin: '10px auto', width: '200px', textAlign: 'start', cursor: 'pointer' }}
							icon={<Storage />}
							color="success"
							key={table}
							label={table}
							onClick={() => {
								setSelectedTable(table);
								setBackdropToggle(true);
							}}
						/>
					</>
				))}
			</Stack>
		</Box>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					{!isMobileView && (
						<>
							<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 0 }}>
								<JoinFull />
							</IconButton>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								SQL Editor
							</Typography>
						</>
					)}
					<Button onClick={onSubmit} color="inherit">
						<PlayCircle sx={{ marginRight: '5px' }} />
						Run Query
					</Button>
					<Button onClick={toggleDrawer('right', true)} color="inherit">
						<TableChart sx={{ marginRight: '5px' }} />
						Available Tables
					</Button>

					{/* Display table fields */}
					<Backdrop
						sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
						open={backdropToggle}
						onClick={() => setBackdropToggle(false)}>
						<Box sx={{ width: '70%' }}>
							<Typography
								sx={{ marginBottom: '2%' }}
								variant="subtitle1">{`Here are the set of available fields in "${selectedTable}" table:`}</Typography>
							<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 3, md: 3 }}>
								{TABLE_FIELDS[`${selectedTable}`].map((field) => (
									<Grid key={field} item xs={6} sm={6} md={4} lg={3}>
										<Item sx={{ cursor: 'pointer' }} onClick={() => setValue(`select ${field} from ${selectedTable}`)}>
											{field}
										</Item>
									</Grid>
								))}
							</Grid>
						</Box>
					</Backdrop>

					<Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
						{selectTables('right')}
					</Drawer>
				</Toolbar>
			</AppBar>
			<Snackbar anchorOrigin={{ horizontal, vertical }} open={open} autoHideDuration={2000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={showToast} sx={{ width: '100%' }}>
					{toastMsg}
				</Alert>
			</Snackbar>
		</Box>
	);
}

export default Navbar;
