import { useEffect } from 'react';
import axios from 'axios';
import Quote from './Quote';

function Mine({ quotes, dispatch, config }) {

    useEffect(() => {
        if (quotes.length === 0) {
            console.log('getting my quotes: init');

            dispatch({ type: 'FETCH_INIT' });

            axios.get('/quotes/me', config)
                .then(res => {
                    console.log('success');
                    dispatch({
                        type: 'SET_MINE',
                        data: res.data
                    })

                }).catch(e => dispatch({
                    type: 'FETCH_ERROR'
                }));
        }
    }, [quotes]);

    return (
        <div className="center">
            {
                quotes.length !== 0 &&
                quotes.map(quote => <Quote quote={quote} key={quote._id}/>)
            }
        </div>
    )
}

export default Mine;