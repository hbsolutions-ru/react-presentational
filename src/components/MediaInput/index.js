import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import MediaPreview from '../MediaPreview';

const MediaInput = ({ uri, type, accept, onChange, disabled, loading, error, removeButton }) => {

    if (error) {
        return (
            <Alert variant="danger">
                Error: failed to perform action
            </Alert>
        );
    }

    if (loading) {
        return (
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        );
    }

    if (uri) {
        return (
            <>
                <div>
                    <MediaPreview uri={uri} type={type} />
                </div>
                {disabled ? '' : removeButton}
            </>
        );
    }

    if (disabled) {
        return (
            <Form.Control type="file" disabled={true} />
        );
    }

    return (
        <Form.File type="file" accept={accept}
                   onChange={e => onChange(e.target.files[0])}
        />
    );
};

export default MediaInput;
