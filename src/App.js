import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import List from './routes/List';
import Home from './routes/Home';
import Navbar from './components/Navbar';
import Login from './routes/Login';
import Register from './routes/Register';


function App() {
    document.body.style = 'background: #F5F5F5';

    const test = () => {
        const data = {
            username: "caio"
        };

        Axios.post('http://localhost:3002/test', data)
            .then((res) => console.log(res));
    };

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/list">
            <List/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
        </Switch>
        <Route />
      </Router>
   </div>
  );
}

export default App;
