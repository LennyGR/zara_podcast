import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import Main from './Views/Main';
import { useDispatch } from 'react-redux';
import useMostPopular from './hooks/useMostPopular';
import { useEffect } from 'react';
import { storePopular } from './redux/actions/podcast';

const App = () => {
  const { data, error} = useMostPopular();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!error) {
      dispatch(storePopular(data));
    }
  },[dispatch, data, error]);

  return (
    <Router>
      <Header />
        <Routes>
        <Route path='/' exact element={<Main />} />
        </Routes>
    </Router>
  );
}

export default App;
