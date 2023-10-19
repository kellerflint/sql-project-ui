import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import 'ace-builds/src-min-noconflict/mode-mysql';
import 'ace-builds/src-noconflict/theme-monokai';

import React from 'react';

import AceEditor from 'react-ace';

import styled from '@emotion/styled';
import DataObjectIcon from '@mui/icons-material/DataObject';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';

// ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.6/src-noconflict');

const HeroContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr;

	@media (max-width: 700px) {
		display: flex;
		flex-direction: column-reverse;
	}
`;

const Editor = ({ value, setValue, history }) => {
	const onChange = (newValue) => {
		setValue(newValue);
	};

	return (
		<HeroContainer>
			<Container
				sx={{
					background: '#272822',
					maxHeight: '440px',
					overflowY: 'scroll',
					overflowX: 'hidden',
					'&::-webkit-scrollbar': { display: 'none' },
				}}>
				<List
					sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
					component="nav"
					aria-labelledby="nested-list-subheader"
					subheader={
						<ListSubheader component="div" id="nested-list-subheader">
							Queries History
						</ListSubheader>
					}>
					{!history && (
						<Typography variant="subtitle1" fontWeight={700}>
							No history available
						</Typography>
					)}
					{history &&
						history.map((item, id) => (
							<ListItemButton onClick={() => setValue(item)} key={`${item}---${id}`}>
								<ListItemIcon>
									<DataObjectIcon />
								</ListItemIcon>
								<ListItemText primary={item} />
							</ListItemButton>
						))}
				</List>
			</Container>
			<div>
				<label htmlFor="editor">
					<AceEditor
						id="editor"
						aria-label="editor"
						mode="mysql"
						theme="monokai"
						name="editor"
						fontSize={16}
						minLines={20}
						maxLines={50}
						width="100%"
						showPrintMargin={false}
						highlightActiveLine
						showGutter
						placeholder="Write your Query here..."
						editorProps={{ $blockScrolling: true }}
						setOptions={{
							enableBasicAutocompletion: true,
							enableLiveAutocompletion: true,
							enableSnippets: true,
						}}
						value={value}
						onChange={onChange}
						showLineNumbers
					/>
				</label>
			</div>
		</HeroContainer>
	);
};

export default Editor;
