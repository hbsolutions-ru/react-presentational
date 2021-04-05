import React, { useState } from 'react';
import { useField, useFormikContext } from 'formik';
import RichTextEditor from 'react-rte';

import styles from './RichTextEditorField.module.css';

const RichTextEditorField = ({ name, format, className, customControlsFactory, inputFormatter, outputFormatter, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(name);

    const input =  typeof inputFormatter === 'function'
        ? inputFormatter(field.value)
        : RichTextEditor.createValueFromString(field.value || '', format);
    const [value, setValue] = useState(input);

    const customControls  = typeof customControlsFactory === 'function'
        ? customControlsFactory(value => setValue(value))
        : null;

    const saveToField = () => {
        const output =  typeof outputFormatter === 'function'
            ? outputFormatter(value)
            : value.toString(format);

        setFieldValue(field.name, output);
    };

    return (
        <div className={`${styles["editor-container"]} ${className ? className.toString() : ''}`}>
            <RichTextEditor customControls={customControls}
                            {...props}
                            value={value}
                            onChange={value => setValue(value)}
                            onBlur={saveToField}
            />
        </div>
    );
};

export default RichTextEditorField;
