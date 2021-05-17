import React from 'react';
import { useField, useFormikContext } from 'formik';

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({...props}) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);

    return (
        <ReactDatePicker {...props}
                         {...field}
                         selected={(field.value && new Date(field.value)) || null}
                         onChange={value => setFieldValue(field.name, value)}
        />
    );
};

export default DatePicker;
