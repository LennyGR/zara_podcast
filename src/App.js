import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import Main from './Views/Main';
import { useDispatch } from 'react-redux';
import useMostPopular from './hooks/useMostPopular';
import { useEffect } from 'react';
import { storePopular } from './redux/actions/podcast';
import Podcast from './Views/Podcast';

const App = () => {
	// eslint-disable-next-line no-unused-vars
	const { data, isError, ...props } = useMostPopular();
	const dispatch = useDispatch();

	useEffect(() => {
		if (data && !isError) {
			dispatch(storePopular(data));
		}
	}, [dispatch, data, isError]);

	return (
		<Router>
			<Header />
			<Routes>
				<Route path='/' exact element={<Main />} />
				<Route path='/podcast/:podcastId' element={<Podcast />} />
			</Routes>
		</Router>
	);
};

export default App;
