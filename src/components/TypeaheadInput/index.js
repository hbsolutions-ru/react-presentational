import React from 'react';
import { useField, useFormikContext } from 'formik';

import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import { getRandomId } from '../../utils/string';

const TypeaheadInput = ({ labelKey, options, placeholder, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);

    const elementId = 'typeahead-input-' + props.name + '-' + getRandomId();

    return (
        <Typeahead {...props}
                   id={elementId}
                   labelKey={labelKey}
                   onChange={value => setFieldValue(field.name, value)}
                   options={options}
                   placeholder={placeholder}
                   selected={field.value || []}
        />
    );
};

export default TypeaheadInput;
