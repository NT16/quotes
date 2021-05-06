import React, { useEffect, useState, useReducer } from 'react';
import { BrowserRouter, Route, Switch, Link, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {Dropdown} from 'react-bootstrap';
import Mine from './components/Mine';
import Public from './components/Public';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AddQuote from './components/AddQuote';
import reducer from './reducer';
import initialState from './initialState';
import axios from 'axios';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [config, setConfig] = useState({});

  let history = useHistory();
  console.log('currenmt state', state);

  function logout(url) {
    console.log('logout');

    axios.post(url,{}, config)
      .then(res => {
        dispatch({
          type: 'LOGOUT'
        });

        history.push('/');
      }).catch(e => {
        console.log('logout fail');
        dispatch({
          type: 'FETCH_ERROR',
          data: e.message
        });
      });
  }

  useEffect(() => {
    if (state.token !== null) {
      setConfig({
        headers: {
          'Authorization': `Bearer ${state.token}`
        }
      });
    }
  }, [state.token]);

  return (
    <div className='App'>
      <h1 className="center">Quote it</h1>

      <BrowserRouter>
        <ul className="nav nav-tabs justify-content-end navigation-bar">
          {
            !state.token &&
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link">Sign up</Link>
              </li>
            </>
          }
          {
            state.token &&
            <>
              <li className="nav-item">
                <Link to="/public" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/me" className="nav-link" >Me</Link>
              </li>
              <li className="nav-item">
                <Link to="/add" className="nav-link">Add</Link>
              </li>
            </>
          }
          <li className='nav-item'>
            <Dropdown>
              {
                state?.user?.username &&
                <>
                  <Dropdown.Toggle
                    variant="success" id="dropdown-basic"
                  >
                    Hi, {state.user.username}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      href="#/logout"
                      onClick={() => logout('/users/logout')}
                    >
                      Logout
                  </Dropdown.Item>
                    <Dropdown.Item
                      href="#/logoutall"
                      onClick={() => logout('/users/logoutAll')}>
                      Logout All
                      </Dropdown.Item>
                  </Dropdown.Menu>
                </>
              }
            </Dropdown>
          </li>
        </ul>

        <div className='notification'>
        {
          state.error && <div className='error-notif'>Error:  {state.error}</div>
        }
        </div>

        <Switch>
          <Route path="/add">
            <AddQuote dispatch={dispatch} config={config} />
          </Route>
          <Route path="/me">
            <Mine quotes={state.mine} dispatch={dispatch} config={config} />
          </Route>
          <Route path="/public">
            <Public quotes={state.all} dispatch={dispatch} config={config} />
          </Route>
          <Route path="/signup" >
            <SignUp dispatch={dispatch} />
          </Route>
          <Route path="/" >
            <Login dispatch={dispatch} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;