import React from 'react';
import { useField } from 'formik';

import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';

import CheckboxesPalette from '../CheckboxesPalette';

import styles from './DropdownCheckboxesPalette.module.css';

const DropdownCheckboxesPalette = ({
    items,
    variant,
    disabled,
    className,
    itemColSize,
    paletteClassName,
    pillVariant = 'primary',
    menuAlign = 'left',
    collapseValuesCount = 1,
    customLabelNothingSelected = 'Nothing selected',
    ...props
}) => {
    const [field] = useField(props);

    if (!Array.isArray(field.value)) {
        console.error('DropdownCheckboxesPalette: field value should be an Array. Field value type: ', typeof field.value);
        return '';
    }

    const dropdownSizeStyle = [4, 6, 12].indexOf(parseInt(itemColSize)) !== -1 ? 'dropdown-size-' + itemColSize : 'dropdown-size';

    const renderValuePills = () => (
        field.value.length >= collapseValuesCount ? (
            <Badge pill variant={pillVariant}>
                {field.value.length} items selected
            </Badge>
        ) : items.map((item, index) => field.value.indexOf(parseInt(item.id)) !== -1 ? (
            <Badge pill variant={pillVariant} key={index} className="mr-1">
                {item.name}
            </Badge>
        ) : '')
    );

    return (
        <Dropdown>
            <Dropdown.Toggle variant={variant} disabled={disabled}
                             className={`${className} dropdown-select`}
            >
                {field.value.length ? renderValuePills() : customLabelNothingSelected}
            </Dropdown.Toggle>
            <Dropdown.Menu className={`${styles["dropdown"]} ${styles[dropdownSizeStyle]}`}
                           align={menuAlign}
            >
                <CheckboxesPalette {...props}
                                   items={items}
                                   itemColSize={itemColSize}
                                   className={`${styles["palette"]} ${paletteClassName ? paletteClassName.toString() : 'bg-light'}`}
                />
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DropdownCheckboxesPalette;
