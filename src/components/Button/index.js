import React from 'react';
import BootstrapButton from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const Button = ({ children, processing, processingTitle, ...props }) => (
    <BootstrapButton disabled={processing}
                     {...props}
    >
        {
            !processing ? children :
            <>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                &nbsp;
                {processingTitle || children}
            </>
        }
    </BootstrapButton>
);

export default Button;
