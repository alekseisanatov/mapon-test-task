import { Route, Routes } from 'react-router-dom';
import './App.scss';
// import { fetchData } from './store/reducers/user.reducer';
// import { useDispatch } from 'react-redux';

function App() {
  // const dispatch = useDispatch();

  // dispatch(fetchData())
  //   .unwrap()
  //   .then((data) => {console.log(data)})
  return (
    <div className="App">
      App
      <Routes>
        <Route></Route>
      </Routes>
    </div>
  );
}

export default App;
