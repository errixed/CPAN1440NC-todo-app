import { useState } from "react";
import React from "react";
import CompletedTodo from "@/components/CompletedTodo";
import AddedTodo from "@/components/AddedTodo";

export default function Todo() {
    const [todo, setTodo] = useState<string[]>([]); // state for storing todo items
    const [text, setText] = useState(""); // state for storing input text
    const [editedText, setEditedText] = useState("") // state for storing input text after editing an existing todo item
    const [isEditRequested, setIsEditRequested] = useState(false); // state for checking is edit button clicked
    const [editIndex, setEditIndex] = useState<number | null>(null); // state for storing a todo item index before editing it
    const [completedTodos, setCompletedTodos] = useState<string[]>([]); // state for storing complete todo items

    const addHandler = (event: React.SubmitEvent) => { // handles both adding and updating
        event.preventDefault(); // prevent browser to reload after adding or updating
        if (isEditRequested) { //if edit is requested, todo item will be updated, else will be added
            setTodo(list => // check the index if it is equal to the index of the todo item we want to edit. If yes, replaces it with the new input
                list.map((item, index) =>
                    index === editIndex ? editedText : item
                )
            );

            setIsEditRequested(false);
            setEditIndex(null);
            setEditedText("");
        } else {
            setTodo(newItem => newItem.concat(text)) // add a new item by joining the string of "text" to the list items which is "" / "".concat("text") returns text 
            setText("");
        }
    }

    const completeHandler = (i: number) => { // handles checking a todo as completed
        setCompletedTodos((completedItem) => completedItem.concat(todo[i]))
        setTodo(todo.filter((value, index) => index !== i)); // filters out the index of the completed item. Then pass it to "setTodo"
    }

    const editRequestHandler = (i: number) => { // pressing the edit button, will trigger this function. 
        setIsEditRequested(true);
        setEditIndex(i);
        setEditedText(todo[i]);
    };

    const cancelEdit = () => { // pressing the cancel button will trigger this function.
        setIsEditRequested(false);
        setEditIndex(null);
        setEditedText("");
    };

    const deleteCompletedHandler = (i: number) => { // handels deleting after an item is completed
        setCompletedTodos(list =>
            list.filter((value, index) => index !== i) // deletes the item by filtering the index out
        );
    };


    return (
        <div className="paper container todo-container">
            <form onSubmit={addHandler} className="todo-form">
                {!isEditRequested ? ( /*If edit button is pressed, shows the initial input field, else shows a new input for editing*/
                    <input type="text" placeholder="Enter a todo item" value={text} onChange={(e) => setText(e.target.value)} className="input-block"/>
                ) : (
                    <input type="text" value={editedText} onChange={(e) => setEditedText(e.target.value)} className="input-block"/>
                )}

                <button type="submit" className="btn-primary add-button">{isEditRequested ? "Update" : "Add"}</button> {/*changes the submit button text to either update or add depending on isEditRequested*/}

                {isEditRequested && (
                    <button type="button" onClick={cancelEdit} className="btn-cancel btn-outline">Cancel</button>
                )} {/*If edit is requested, it shows a cancel button*/}
            </form>
            <br />
            <AddedTodo items={todo} onComplete={completeHandler} onEdit={editRequestHandler} />
            <CompletedTodo items={completedTodos} onDelete={deleteCompletedHandler} />

        </div>
    )
}