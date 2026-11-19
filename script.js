const { useState } = React;

function TodoApp() {

    const [tasks, setTasks] = useState(() => {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    });

    const [input, setInput] = useState("");

    const [filter, setFilter] = useState("all");

    function updateTasks(newTasks) {
        setTasks(newTasks);
        localStorage.setItem("tasks", JSON.stringify(newTasks));
    }

    function addTask() {
        if (input.trim() === "") {
            alert("Please enter a task!");
            return;
        }

        const newTask = {
            id: Date.now(),
            text: input.trim(),
            completed: false
        };

        updateTasks([...tasks, newTask]);
        setInput("");
    }

    function toggleTask(id) {
        const updatedTasks = tasks.map(task =>
            task.id === id
                ? { ...task, completed: !task.completed }
                : task
        );

        updateTasks(updatedTasks);
    }

    function deleteTask(id) {
        const updatedTasks = tasks.filter(
            task => task.id !== id
        );

        updateTasks(updatedTasks);
    }

    const filteredTasks = tasks.filter(task => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    });

    return (
        <div className="container">

            <h1>My TODO List</h1>

            <p className="subtitle">
                Organize your daily tasks
            </p>

            <div className="input-section">

                <input
                    type="text"
                    placeholder="Enter a new task..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === "Enter") addTask();
                    }}
                />

                <button className="add-btn" onClick={addTask}>
                    Add Task
                </button>

            </div>

            <div className="filters">

                <button
                    className={filter === "all" ? "active" : ""}
                    onClick={() => setFilter("all")}
                >
                    All
                </button>

                <button
                    className={filter === "active" ? "active" : ""}
                    onClick={() => setFilter("active")}
                >
                    Active
                </button>

                <button
                    className={filter === "completed" ? "active" : ""}
                    onClick={() => setFilter("completed")}
                >
                    Completed
                </button>

            </div>

            <ul className="task-list">

                {filteredTasks.length === 0 ? (

                    <li className="empty">
                        No tasks found!
                    </li>

                ) : (

                    filteredTasks.map(task => (

                        <li className="task" key={task.id}>

                            <label>

                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id)}
                                />

                                <span className={
                                    task.completed ? "completed" : ""
                                }>
                                    {task.text}
                                </span>

                            </label>

                            <button
                                className="delete-btn"
                                onClick={() => deleteTask(task.id)}
                            >
                                Delete
                            </button>

                        </li>

                    ))

                )}

            </ul>

            <div className="footer">
                Total Tasks: {tasks.length} |
                Completed: {tasks.filter(t => t.completed).length}
            </div>

        </div>
    );
}

const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(<TodoApp />);