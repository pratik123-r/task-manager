import { useState, useEffect } from "react";
import { getAllTasks, deleteTask } from "../services/task";

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getAllTasks().then((tasks) => setTasks(tasks));
    }, []);

    const handleDelete = async (id) => {
        await deleteTask(id);
    };
    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.title} - {task.status} - {task.description}
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;