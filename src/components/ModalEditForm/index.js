import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from "yup";

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from '../Button';

const ModalEditForm = ({ children, handleSubmit, fields, modalTitle, modalProps }) => {
    const [formShow, setFormShow] = useState(false);
    const [processing, setProcessing] = useState(false);

    const handleInlineFileUpload = (formik, name, file) => {
        setProcessing(true);

        file.text()
            .then(result => {
                formik.setFieldValue(name, result);
            })
            .finally(() => {
                setProcessing(false);
            });
    };

    const hideForm = () => setFormShow(false);

    const handleSubmitWrapper = values => {
        setProcessing(true);

        handleSubmit(values)
            .finally(() => {
                setProcessing(false);
                hideForm();
            });
    };

    const initialValues = fields.reduce((acc, field) => ({
        ...acc,
        [field.name]: field.value,
    }), {});

    const validationSchema = Yup.object(
        fields.reduce((acc, field) => (
            field.validation ? {
                ...acc,
                [field.name]: field.validation,
            } : acc
        ), {})
    );

    return (
        <>
            {children(() => setFormShow(true))}
            <Modal {...modalProps} show={formShow} onHide={hideForm}>
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
                                {fields.map((field, index) => {
                                    if (field.type === 'inlineFile') {
                                        return (
                                            <Form.Group as={Row} controlId={field.name} key={`modal-edit-form-${field.name}-${index}`}>
                                                <Form.Label column sm={2}>{field.label}</Form.Label>
                                                <Col sm={10}>
                                                    <Form.File type="file" accept={field.fileTypes}
                                                               onChange={e => e.target.files[0] &&
                                                                   e.target.files[0].size &&
                                                                   handleInlineFileUpload(formik, field.name, e.target.files[0])
                                                               }
                                                    />
                                                </Col>
                                            </Form.Group>
                                        );
                                    }
                                    return (
                                        <Form.Group as={Row} controlId={field.name} key={`modal-edit-form-${field.name}-${index}`}>
                                            <Form.Label column sm={2}>{field.label}</Form.Label>
                                            <Col sm={10}>
                                                <Form.Control {...formik.getFieldProps(field.name)}
                                                              type="text"
                                                              isInvalid={!!(formik.touched[field.name] && formik.errors[field.name])}
                                                              disabled={processing}
                                                />
                                                <Form.Control.Feedback type="invalid">{formik.errors[field.name]}</Form.Control.Feedback>
                                            </Col>
                                        </Form.Group>
                                    );
                                })}
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
