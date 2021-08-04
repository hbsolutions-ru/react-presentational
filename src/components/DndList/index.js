import React from 'react';
import { FieldArray } from 'formik';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import ListGroup from 'react-bootstrap/ListGroup';

import { getRandomId } from '../../utils/string';

const DndList = ({ children, formik, name, onDragEnd }) => {
    // Need unique ids for rendering the droppable and draggable
    const droppableId = 'droppable-' + getRandomId();
    const draggablePrefixId = `draggable-${getRandomId()}-`;

    const onDragEndCallback = ({ arrayHelpers, source, destination }) => {
        if (!(arrayHelpers && source && destination)) {
            return;
        }
        arrayHelpers.move(source.index, destination.index);
        if (typeof onDragEnd === 'function') {
            onDragEnd({
                source: source.index,
                destination: destination.index,
            }, formik.values[name][destination.index]);
        }
    };

    const items = formik.values[name].map(item => ({
        id: item.id || getRandomId(),
        data: item,
    }));

    return (
        <FieldArray name={name}
                    render={arrayHelpers => (
                        <>
                            <DragDropContext onDragEnd={({ source, destination }) => onDragEndCallback({ arrayHelpers, source, destination })}>
                                <Droppable droppableId={droppableId}>
                                    {provided => (
                                        <div ref={provided.innerRef}
                                             {...provided.droppableProps}
                                        >
                                            <ListGroup>
                                                {items.map((item, index) => (
                                                    <Draggable key={draggablePrefixId + item.id} draggableId={draggablePrefixId + item.id} index={index}>
                                                        {provided => (
                                                            <div ref={provided.innerRef}
                                                                 {...provided.draggableProps}
                                                                 {...provided.dragHandleProps}
                                                            >
                                                                <ListGroup.Item>
                                                                    {children(
                                                                        item.data,
                                                                        () => arrayHelpers.remove(index)
                                                                    )}
                                                                </ListGroup.Item>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </ListGroup>
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </>
                    )}
        />
    );
};

export default DndList;
