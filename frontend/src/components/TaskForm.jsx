
import { useState } from "react";
import { createTask } from "../services/task";

function TaskForm() {
    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "pending"
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!task.title) {
            alert("Title is required");
            return;
        }
        try {
            await createTask(task);
            setTask({
                title: "",
                description: "",
                status: "pending"
            });
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <input type="text" placeholder="Title" value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} />
            <input type="text" placeholder="Description" value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })} />
            <select value={task.status} onChange={(e) => setTask({ ...task, status: e.target.value })}>
                <option value="pending">Pending</option>
                <option value="done">Done</option>
            </select>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default TaskForm;