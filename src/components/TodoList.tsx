// TodoList.tsx
import React, { useEffect, useState } from "react";
import Task from "./Task";

interface TaskItem {
  id: number;
  text: string;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTasks = [...tasks, { id: Date.now(), text: newTask.trim() }];
      setTasks(newTasks);
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      setNewTask("");
    }
  };

  const deleteTask = (taskId: number) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const editTask = (taskId: number, newText: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, text: newText } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const moveTask = (dragIndex: number, hoverIndex: number) => {
    const draggedTask = tasks[dragIndex];
    const updatedTasks = [...tasks];
    updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, draggedTask);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    console.log("Loading tasks from local storage");
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  }, []);

  return (
    <div className="main-dev">
      <h1>Todo List</h1>
      <div className="addtodolist">
        <input
          type="text"
          value={newTask}
          placeholder="Add todo list"
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="list">
        {tasks !== null ? (
          tasks.map((task, index) => (
            <Task
              key={task.id}
              task={task}
              onDelete={() => deleteTask(task.id)}
              onEdit={(newText) => editTask(task.id, newText)}
              onMove={moveTask}
              index={index}
            />
          ))
        ) : (
          <p>Loading tasks...</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
