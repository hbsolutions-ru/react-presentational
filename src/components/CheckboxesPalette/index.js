import React from 'react';
import { useField, useFormikContext } from 'formik';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { getRandomId, removeArrayValue } from '../../utils/string';

const CheckboxesPalette = ({ items, itemClassName, itemColSize, ...props }) => {
    const idPrefix = 'checkboxes-palette-' + getRandomId();

    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);

    if (!Array.isArray(field.value)) {
        console.error('CheckboxesPalette: field value should be an Array. Field value type: ', typeof field.value);
        return '';
    }

    return (
        <Card>
            <Row>
                {items.map((item, index) => {
                    const id = parseInt(item.id);
                    if (!id) {
                        console.error('CheckboxesPalette: id is missed for the item: ', item);
                        return '';
                    }

                    return (
                        <Col sm={itemColSize || 6} key={id} className={itemClassName || 'mb-1'}>
                            <Form.Check custom
                                        type="checkbox"
                                        id={`${idPrefix}-${id}`}
                                        label={item.name || 'Item #' + index}
                                        checked={field.value.indexOf(id) !== -1}
                                        onChange={e => {
                                            const copy = field.value.slice();
                                            if (e.target.checked) {
                                                copy.push(id);
                                            } else {
                                                removeArrayValue(copy, id);
                                            }
                                            setFieldValue(field.name, copy);
                                        }}
                            />
                        </Col>
                    );
                })}
            </Row>
        </Card>
    );
};

export default CheckboxesPalette;
