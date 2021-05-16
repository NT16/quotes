import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function SignUp({ dispatch }) {
    let history = useHistory();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function submit(event) {
        event.preventDefault();

        axios.post('/users', {
            email,
            username,
            password
        }).then((res) => {
            console.log('signup success', res);
            dispatch({ type: 'SET_USER', data: res.data });
            history.push('/public');
        }).catch(e => {
            console.log(e);
            dispatch({ type: 'FETCH_ERROR', data: e.message })
        });
    }

    return (
        <div className='login'>
            <h3>Sign up</h3>
            <form onSubmit={submit}>
                <div className='form-group mb-3'>
                    <label htmlFor='email' className='form-label'>Email</label>

                    <input
                        value={email}
                        id='email'
                        type='email'
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                    ></input>
                </div>
                <div className='form-group mb-3'>
                    <label htmlFor='username' className='form-label'>Username</label>

                    <input
                        value={username}
                        id='username'
                        type='text'
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control"
                    ></input>
                </div>
                <div className='form-group mb-3'>
                    <label htmlFor='pw' className='form-label'>Password</label>

                    <input
                        value={password}
                        id='pw'
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                    ></input>
                </div>
                <button type='submit'>Go</button>
            </form>
        </div>
    )
}

export default SignUp;