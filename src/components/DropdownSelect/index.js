import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Field } from 'formik';

const DropdownSelect = ({ name, variant, options, placeholder, className, isInvalid }) => (
    <Field name={name}>
    {({ field: { value }, form: { setFieldValue, setFieldTouched } }) => (
        <Dropdown onSelect={value => setFieldValue(name, value)} className={isInvalid ? 'is-invalid' : null}>
            <Dropdown.Toggle variant={variant} className={`${className} dropdown-select ${isInvalid ? 'is-invalid' : ''}`}>
                {options[value] || placeholder}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {Object.keys(options).map(key => {
                    return options[key] === null ? (
                        <Dropdown.Divider />
                    ) : (
                        <Dropdown.Item key={key} eventKey={key} href="."
                                       onClick={e => {
                                           e.preventDefault();
                                           setFieldTouched(name, true, false);
                                       }}
                                       active={key === value}
                        >
                            {options[key]}
                        </Dropdown.Item>
                    );
                })}
            </Dropdown.Menu>
        </Dropdown>
    )}
    </Field>
);

export default DropdownSelect;
