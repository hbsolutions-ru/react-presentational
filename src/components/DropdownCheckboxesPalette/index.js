import React from 'react';
import { useField } from 'formik';

import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';

import CheckboxesPalette from '../CheckboxesPalette';

import styles from './DropdownCheckboxesPalette.module.css';

const DropdownCheckboxesPalette = ({ variant, pillVariant, menuAlign, disabled, className, itemColSize, paletteClassName, ...props }) => {
    const [field] = useField(props);

    if (!Array.isArray(field.value)) {
        console.error('DropdownCheckboxesPalette: field value should be an Array. Field value type: ', typeof field.value);
        return '';
    }

    const dropdownSizeStyle = [4, 6, 12].indexOf(parseInt(itemColSize)) !== -1 ? 'dropdown-size-' + itemColSize : 'dropdown-size';

    return (
        <Dropdown>
            <Dropdown.Toggle variant={variant} disabled={disabled}
                             className={`${className} dropdown-select`}
            >
                {field.value.length ? (
                    <Badge pill variant={pillVariant || 'primary'}>
                        {field.value.length} items selected
                    </Badge>
                ) : 'Any'}
            </Dropdown.Toggle>
            <Dropdown.Menu className={`${styles["dropdown"]} ${styles[dropdownSizeStyle]}`}
                           align={menuAlign || 'left'}
            >
                <CheckboxesPalette {...props}
                                   itemColSize={itemColSize}
                                   className={`${styles["palette"]} ${paletteClassName ? paletteClassName.toString() : 'bg-light'}`}
                />
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DropdownCheckboxesPalette;
