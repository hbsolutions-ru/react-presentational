import React from 'react';

import Image from 'react-bootstrap/Image';
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed';

import styles from './MediaPreview.module.css';

const MediaPreview = ({ uri, type }) => {

    const renderWrapper = children => (
        <div className={styles["preview-wrap"]}>
            {children}
        </div>
    );

    if (type.split('/')[0] === 'image') {
        return renderWrapper(
            <Image src={uri} />
        );
    }

    if (type.split('/')[0] === 'video') {
        return renderWrapper(
            <video controls>
                <source src={uri} type={type} />
            </video>
        );
    }

    return renderWrapper(
        <ResponsiveEmbed aspectRatio="16by9">
            <embed type={type} src={uri} />
        </ResponsiveEmbed>
    );
};

export default MediaPreview;
