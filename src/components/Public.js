import { useEffect } from 'react';
import axios from 'axios';
import Quote from './Quote';

function Public({ quotes, dispatch, config }) {
    useEffect(() => {
        console.log('getting Public quotes: init');

        dispatch({ type: 'FETCH_INIT' });

        axios.get('/quotes', config)
            .then(res => {
                console.log('success');

                dispatch({
                    type: 'SET_ALL',
                    data: res.data
                })
            }).catch(e => dispatch({
                type: 'FETCH_ERROR'
            }));
    }, []);

    return (
        <div>
            {
                quotes.length !== 0 &&
                quotes.map(quote => <Quote quote={quote} key={quote._id}/>)
            }
        </div>
    );
}

export default Public;