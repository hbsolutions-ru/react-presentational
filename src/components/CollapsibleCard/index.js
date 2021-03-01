import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';

import styles from './CollapsibleCard.module.css';

const CollapsibleCard = ({ children, switchCard, className }) => {
    const [cardShow, setCardShow] = useState(false);

    return (
        <>
            <Card body className={[styles.link, className].join(' ')} onClick={() => setCardShow(!cardShow)}>
                {switchCard}
            </Card>
            <Collapse in={cardShow}>
                <div>
                    <Card body className={className}>
                        {children(() => setCardShow(false))}
                    </Card>
                </div>
            </Collapse>
        </>
    );
};

export default CollapsibleCard;
