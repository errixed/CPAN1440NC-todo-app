import { useState } from "react";

type AddedTodoProps = {
  items: string[];
  onComplete: (index: number) => void;
  onEdit: (index: number) => void;
};

export default function AddedTodo({ items, onComplete, onEdit }: AddedTodoProps) { // accepts todo, completeHandler and editRequestHandler as props
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // state for storing selected item index 

  const handleSelect = (index: number) => { // handles selection by passing selected item's index to setSelectedIndex
    setSelectedIndex(index);
  };

  const handleUnselect = () => { // handles unselection by setting setSelectedIndex to null
    setSelectedIndex(null)
  }

  const handleComplete = () => { // handles completing a todo using onComplete prop. passes selectedIndex to onComplete if it is not null
    if (selectedIndex !== null){
        onComplete(selectedIndex);
    } 
    setSelectedIndex(null);
  };

  const handleEdit = () => { // handles editing using onEdit prop. passes selectedIndex to onEdit if it is not null 
    if (selectedIndex !== null) {
        onEdit(selectedIndex);
    }
  };

  return (
    <div className="todo-card">
      <h3 className="todo-title">Todos</h3>

      {items.length === 0 ? ( // shows messages depending on existence of todo item
        <p className="todo-item-muted">You are all done</p>
      ) : (
        <div>
          <ul className="todo-list">
            {items.map((value, index) => (
              // when an li is clicked, it triggers handleSelect and passes the selected index. If it is selected, the list becomes normal, else it will be normal
              <li key={index} onClick={() => handleSelect(index)} className="todo-item card" style={{cursor: "pointer", fontWeight: selectedIndex === index ? "bold" : "normal"}}>
                <span className="todo-item-text">{value}</span>
              </li>
            ))}
          </ul>

          <div className="todo-item-actions">
            <button onClick={handleComplete} disabled={selectedIndex === null} className="btn-success">
              Complete
            </button>
            <button onClick={handleEdit} disabled={selectedIndex === null} className="btn-warning btn-outline">
              Edit Selected
            </button>
            <button onClick={handleUnselect} disabled={selectedIndex === null}>
              Unselect
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
