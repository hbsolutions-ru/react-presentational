import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed';
import Spinner from 'react-bootstrap/Spinner';

import styles from './MediaInput.module.css';

const MediaInput = ({ uri, type, accept, onChange, disabled, loading, error, removeButton }) => {

    const renderPreview = (uri, type) => {
        if (type.split('/')[0] === 'image') {
            return (
                <Image src={uri} />
            );
        }

        if (type.split('/')[0] === 'video') {
            return (
                <video controls>
                    <source src={uri} type={type} />
                </video>
            );
        }

        return (
            <ResponsiveEmbed aspectRatio="16by9">
                <embed type={type} src={uri} />
            </ResponsiveEmbed>
        );
    };

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
                    <div className={styles["preview-wrap"]}>
                        {renderPreview(uri, type)}
                    </div>
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
