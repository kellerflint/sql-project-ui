import './App.css';

import tw from 'twin.macro';

import styled from '@emotion/styled';

import Routes from './routes';

const Container = styled.div`
	${tw`
  font-extrabold
  text-3xl
  `};
`;

function App() {
	return (
		<Container>
			<Routes />
		</Container>
	);
}

export default App;
