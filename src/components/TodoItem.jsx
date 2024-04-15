


import { Checkbox } from "@/components/ui/checkbox"
import { FaTrash } from 'react-icons/fa'

const todoItem = ({todo, onChange, onDelete}) => {
  return (
    <div className="flex items-center justify-between bg-card m-2 p-4 w-11/12 border-card rounded-md">
      <Checkbox id={`elem-{todo.id}`} checked={todo.completed} onClick={onChange} />
        <p className={`ms-3 text-lg decoration-primary decoration-2 w-full block ${todo.completed ? 'line-through' : ''}`}>{todo.text}</p>
        <button onClick={onDelete} className="ms-auto text-red-500"><FaTrash /></button>
    </div>
    )
}

export default todoItem