import React, { useState } from 'react';
import { useField, useFormikContext } from 'formik';
import RichTextEditor from 'react-rte';

import styles from './RichTextEditorField.module.css';

const RichTextEditorField = ({ autoFocus, className, format, customControlsFactory, placeholder, readOnly, toolbarConfig, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);

    const [value, setValue] = useState(RichTextEditor.createValueFromString(field.value || '', format));

    const customControls  = typeof customControlsFactory === 'function'
        ? customControlsFactory(value => setValue(value))
        : null;

    return (
        <div className={`${styles["editor-container"]} ${className ? className.toString() : ''}`}>
            <RichTextEditor {...{autoFocus, placeholder, readOnly, toolbarConfig, customControls}}
                            value={value}
                            onChange={value => setValue(value)}
                            onBlur={() => setFieldValue(field.name, value.toString(format))}
            />
        </div>
    );
};

export default RichTextEditorField;
