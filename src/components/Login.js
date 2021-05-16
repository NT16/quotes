import { useState } from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

function Login({ dispatch }) {
    let history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function submit(event) {
        event.preventDefault();
        console.log('login init')

        axios.post('/users/login', { email, password })
            .then((res) => {
                console.log('login success', res);
                dispatch({ type: 'SET_USER', data: res.data });
                history.push('/me');
            })
            .catch(e => {
                console.log('login fail', e);
                dispatch({ type: 'FETCH_ERROR', data: e.message })
            });
    }

    return (
    <div className='login'>
        <h2>Login</h2>
        <form onSubmit={submit}>
            <div className='form-group mb-3'>
                <label htmlFor='email' className='form-label'>
                    Email
                </label>

                <input
                    value={email}
                    id='email'
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                />
            </div>

            <div className='form-group  mb-3'>
                <label htmlFor='pw' className='form-label'>
                    Password
                </label>

                <input
                    value={password}
                    id='pw'
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                />
            </div>
            <button type='submit'>Go</button>
        </form>
    </div>
    );
}

export default Login;