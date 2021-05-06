import { useState } from 'react';
import axios from 'axios';

function AddQuote({ config, dispatch }) {
    const [quote, setQuote] = useState('');
    const [by, setBy] = useState('');

    function submit(event) {
        event.preventDefault();

        let obj = { text: quote };

        if (by.length !== 0) {
            obj.by = by;
        }

        if (event.target.isPublic.checked === true) {
            obj.private = false;
        }

        console.log('posting this quote', obj);

        axios.post('/quotes', obj, config)
            .then(res => {
                console.log(res);
                dispatch({
                    type: 'ADD_QUOTE',
                    data: obj
                })
            }).catch(e => dispatch({
                type: 'ERROR',
                data: e.message
            }));

    }

    return (
        <div className='add'>
            <h2 >Add Quote</h2>
            <form onSubmit={submit}>
                <div className='mb-1'>
                    <label className='form-label'>Quote </label>
                    <input value={quote} onChange={(e) => setQuote(e.target.value)} className="form-control"></input>
                </div>

                <div className='mb-1'>
                    <label className='form-label'>By </label>
                    <input value={by} onChange={(e) => setBy(e.target.value)} className="form-control"></input>
                </div>

                <div className='form-check mb-1'>
                    <input className='form-check-input' type='checkbox' id='isPublic' />
                    <label className='form-check-label' htmlFor='isPublic'>Public</label>
                </div>

                <button className='btn btn-primary' type='submit'>Add</button>
            </form>
        </div>
    )
}

export default AddQuote;