import React from 'react';
import { useField, useFormikContext } from 'formik';

import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styles from './DatePicker.module.css';

const DatePicker = ({...props}) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);

    return (
        <ReactDatePicker className="form-control"
                         wrapperClassName={styles["datepicker-wrapper"]}
                         popperClassName={styles["datepicker-popper"]}
                         {...props}
                         {...field}
                         selected={(field.value && new Date(field.value)) || null}
                         onChange={value => setFieldValue(field.name, value)}
        />
    );
};

export default DatePicker;
