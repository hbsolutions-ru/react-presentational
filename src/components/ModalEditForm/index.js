import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik } from 'formik';
import Button from '../Button';

const ModalEditForm = ({ children, handleSubmit, formFields, initialValues, validationSchema, modalTitle }) => {
    const [formShow, setFormShow] = useState(false);
    const [processing, setProcessing] = useState(false);

    const hideForm = () => setFormShow(false);

    const handleSubmitWrapper = values => {
        setProcessing(true);

        handleSubmit(values)
            .finally(() => {
                setProcessing(false);
                hideForm();
            });
    };

    return (
        <>
            {children(() => setFormShow(true))}
            <Modal show={formShow} onHide={hideForm}>
                <Formik onSubmit={handleSubmitWrapper}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                >
                    {formik => (
                        <Form noValidate onSubmit={formik.handleSubmit}>
                            <Modal.Header closeButton>
                                <Modal.Title>{modalTitle}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {Object.keys(formFields).map((field, index) => (
                                    <Form.Group as={Row} controlId={field} key={`modal-edit-form-${field}-${index}`}>
                                        <Form.Label column sm={2}>{formFields[field]}</Form.Label>
                                        <Col sm={10}>
                                            <Form.Control {...formik.getFieldProps(field)}
                                                          type="text"
                                                          isInvalid={!!(formik.touched[field] && formik.errors[field])}
                                                          disabled={processing}
                                            />
                                            <Form.Control.Feedback type="invalid">{formik.errors[field]}</Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                ))}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary"
                                        onClick={hideForm}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit"
                                        processing={processing}
                                        processingTitle="Loading..."
                                        variant="primary"
                                        className="w-25"
                                >
                                    OK
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    );
};

export default ModalEditForm;
