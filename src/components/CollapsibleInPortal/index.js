import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Collapse from 'react-bootstrap/Collapse';

const CollapsibleInPortal = ({ children, formRef, switchButton }) => {
    const [childrenShow, setChildrenShow] = useState(true);

    // Toggle immediately after mounted to render Portal
    useEffect(() => {
        setChildrenShow(false);
    }, [formRef]);

    return (
        <>
            {switchButton(() => setChildrenShow(!childrenShow))}
            {formRef.current && createPortal((
                <Collapse in={childrenShow}>
                    <div>
                        {children(() => setChildrenShow(false))}
                    </div>
                </Collapse>
            ), formRef.current)}
        </>
    );
};

export default CollapsibleInPortal;
