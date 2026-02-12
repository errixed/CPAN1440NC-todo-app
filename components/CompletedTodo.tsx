import { useState } from 'react';

type CompletedListProps = {
    items: string[];
    onDelete: (index: number) => void;
};

export default function CompletedTodo({ items, onDelete }: CompletedListProps) { // accepts completedTodos and deleteCompletedHandler function
    const [confirmIndex, setConfirmIndex] = useState<number | null>(null); // state for storing index of the item before deleting.

    const handleDeleteClick = (index: number) => { // by pressing delete button, index of that todo item is stored in setConfirmIndex
        setConfirmIndex(index);
    };

    const handleConfirmDelete = () => { // after clicking Confirm button, this functions delete the todo item using onDelete prop
        if (confirmIndex !== null){
             onDelete(confirmIndex);
        }
        setConfirmIndex(null);
    };

    const handleCancel = () => { // after clicking cancel button, this function set the index to null so handleConfirmDelete wont delete anything
        setConfirmIndex(null);
    }
    return (
        <div className="todo-card">
            <h3 className="todo-title">Completed Todos</h3>

            {items.length === 0 ? ( //checks if any completed completed items exists, then shows messages accordingly
                <p className="todo-item-muted">Nothing here yet</p>
            ) : (
                <ul className="todo-list">
                    {items.map((item, index) => (
                        <li key={index} className="todo-item">
                            <span className="todo-item-text">
                                <del>{item}</del>
                            </span>

                            {confirmIndex === index ? ( // shows Confirm and Cancel button if user clicked Delete, else wont
                                <div className="todo-item-actions">
                                    <button onClick={handleConfirmDelete} className='btn-danger'>Confirm</button>
                                    <button onClick={handleCancel} className='btn-cancel'>Cancel</button>
                                </div>
                            ) : (
                                <button onClick={() => handleDeleteClick(index)} className="btn-danger">Delete</button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
