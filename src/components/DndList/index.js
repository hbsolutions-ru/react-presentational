import React from 'react';
import { FieldArray } from 'formik';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import ListGroup from 'react-bootstrap/ListGroup';

import { getRandomId } from '../../utils/string';

const DndList = ({ children, formik, name, onDragEnd }) => {
    // Need unique ids for rendering the droppable and draggable
    const droppableId = 'droppable-' + getRandomId();
    const draggablePrefixId = `draggable-${getRandomId()}-`;

    return (
        <FieldArray name={name}
                    render={arrayHelpers => (
                        <>
                            <DragDropContext onDragEnd={({ source, destination }) => onDragEnd({ arrayHelpers, source, destination })}>
                                <Droppable droppableId={droppableId}>
                                    {provided => (
                                        <div ref={provided.innerRef}
                                             {...provided.droppableProps}
                                        >
                                            <ListGroup>
                                                {formik.values[name].map((item, index) => (
                                                    <Draggable key={draggablePrefixId + item.id} draggableId={draggablePrefixId + item.id} index={index}>
                                                        {provided => (
                                                            <div ref={provided.innerRef}
                                                                 {...provided.draggableProps}
                                                                 {...provided.dragHandleProps}
                                                            >
                                                                <ListGroup.Item>
                                                                    {children(
                                                                        item,
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
