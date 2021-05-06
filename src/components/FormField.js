import React from 'react';

const FormField = ({label, attributes , id}) => {
    return (<div className='form-group'>
        <label htmlFor={id}>{label}</label>
        <input {...attributes} id={id} className="form-control" />
    </div>)
};

export default FormField;