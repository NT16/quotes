import { useState } from 'react'

export const useFormField = (type, name) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        name,
        value,
        onChange
    }
}