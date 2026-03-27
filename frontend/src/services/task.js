const API_URL = "http://localhost:3004/api/tasks";

async function getAllTasks() {
    return await fetch(API_URL).then((res) => res.json());
}

async function createTask(task) {
    return await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    }).then((res) => res.json());
}

async function updateTask(id, task) {
    return await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    }).then((res) => res.json());
}

async function deleteTask(id) {
    return await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    }).then((res) => res.json());
}

export {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};