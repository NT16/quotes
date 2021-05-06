import { useState } from 'react';
import axios from 'axios';

function SignUp({ dispatch }) {
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
        }).catch(e => console.log(e));
    }

    return (
        <div>
            <h3>Sign up</h3>
            <form onSubmit={submit}>
                <label htmlFor='email' >Email</label>
                <input value={email} id='email' onChange={(e) => setEmail(e.target.value)} ></input>
                <label htmlFor='username' >Username</label>
                <input value={username} id='username' onChange={(e) => setUsername(e.target.value)}></input>
                <label htmlFor='pw'>Password</label>
                <input value={password} id='pw' onChange={(e) => setPassword(e.target.value)}></input>
                <button type='submit'>Go</button>
            </form>
        </div>
    )
}

export default SignUp;