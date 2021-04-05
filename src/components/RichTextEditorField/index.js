import React, { useState } from 'react';
import { useField, useFormikContext } from 'formik';
import RichTextEditor from 'react-rte';

import styles from './RichTextEditorField.module.css';

const RichTextEditorField = ({ name, format, className, customControlsFactory, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(name);

    const [value, setValue] = useState(RichTextEditor.createValueFromString(field.value || '', format));

    const customControls  = typeof customControlsFactory === 'function'
        ? customControlsFactory(value => setValue(value))
        : null;

    return (
        <div className={`${styles["editor-container"]} ${className ? className.toString() : ''}`}>
            <RichTextEditor customControls={customControls}
                            {...props}
                            value={value}
                            onChange={value => setValue(value)}
                            onBlur={() => setFieldValue(field.name, value.toString(format))}
            />
        </div>
    );
};

export default RichTextEditorField;
