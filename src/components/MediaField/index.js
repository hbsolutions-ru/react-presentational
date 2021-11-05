import React, { useEffect, useState } from 'react';
import { useField, useFormikContext } from 'formik';

import Confirmation from '../Confirmation';
import MediaInput from '../MediaInput';

const MediaField = ({ acceptTypes, disabled, fetchCallback, uploadCallback, removeCallback, payload, removeButtonRenderer, ...props }) => {
    const emptyMedia = {
        id: null,
        resource: null,
        type: null,
    };

    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);

    const [initValue, setInitValue] = useState(parseInt(field.value) || null); // Make pseudo-dep for useEffect
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [media, setMedia] = useState(emptyMedia);

    // Initial effect
    useEffect(() => {
        let isMounted = true;

        if (loading || error || media.resource || !initValue) {
            return;
        }

        setLoading(true);

        // Delay to avoid double start of the async function
        // TODO: use useAsyncEffect (from use-async-effect) to avoid such workaround
        setTimeout(() => {
            if (!isMounted) {
                return;
            }

            fetchCallback(initValue)
                .then(result => {
                    if (!isMounted) {
                        return;
                    }

                    setMedia(result);
                    setFieldValue(field.name, parseInt(result.id) || null);
                })
                .catch(() => {
                    if (!isMounted) {
                        return;
                    }

                    setError(true);
                })
                .finally(() => {
                    if (!isMounted) {
                        return;
                    }

                    setLoading(false);
                    setInitValue(null);
                });
        }, 10);

        return () => {
            isMounted = false;
        };
    }, [initValue]);

    // Field update effect
    useEffect(() => {
        if (parseInt(field.value) || media.resource === null) {
            return;
        }
        setMedia(emptyMedia);
    }, [field.value]);

    const uploadMedia = file => {
        if (!file) {
            return;
        }

        setLoading(true);
        uploadCallback(file, payload || {})
            .then(result => {
                setMedia(result);
                setFieldValue(field.name, parseInt(result.id) || null);
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const removeMedia = () => {
        if (!media.id) {
            return;
        }

        setLoading(true);
        removeCallback(media.id, payload || {})
            .then(() => {
                setMedia(emptyMedia);
                setFieldValue(field.name, null);
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const removeButton = disabled ? (
        <span/>
    ) : (
        <Confirmation action={removeMedia}
                      title="Delete media"
                      message="Are you sure you want to remove this media?"
        >
            {showModal => removeButtonRenderer(showModal)}
        </Confirmation>
    );

    const resetField = () => {
        setError(false);
        removeMedia();
    };

    return (
        <MediaInput uri={media.resource}
                    type={media.type}
                    accept={acceptTypes.join(',')}
                    onChange={uploadMedia}
                    onReset={resetField}
                    disabled={disabled}
                    loading={loading}
                    error={error}
                    removeButton={removeButton}
        />
    );
};

export default MediaField;
