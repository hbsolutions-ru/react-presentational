import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import Button from '../Button';

const Confirmation = ({ children, action, title, message }) => {
    const [modalShow, setModalShow] = useState(false);
    const [processing, setProcessing] = useState(false);

    const hideForm = () => setModalShow(false);

    const handleSubmit = () => {
        setProcessing(true);

        const result = action();

        if (result instanceof Promise) {
            result.finally(() => hideForm());
        } else {
            hideForm();
        }
    };

    return (
        <>
            {children(() => setModalShow(true))}
            <Modal show={modalShow} onHide={hideForm}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" disabled={processing} onClick={hideForm}>Cancel</Button>
                    <Button variant="primary" processing={processing} onClick={handleSubmit} className="w-25">OK</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Confirmation;
