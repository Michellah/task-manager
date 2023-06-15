import { useTaskManager } from '@/store/useTaskManager';
import React, { ChangeEvent, useRef } from 'react';

interface Task {
  id: number,
  title: string,
  completed: boolean,
}

const TaskManager = () => {
  const createTaskRef = useRef<HTMLInputElement>(null);
  const {
    task,
    addTask,
    updateTask,
    deleteTask
  } = useTaskManager();

  const handleAddTask = () => {
    const title = ""; // Replace with the value in the createTaskRef 
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    addTask(newTask);
    console.log(newTask);
    
  };

  const handleUpdateTask = (taskId: number, updatedTask: Task) => {
    updateTask(taskId, updatedTask.title);
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    // setSearchTask(e.target.value);
  };

  // See! I already give you everything!
  // const filteredTasks = task.filter((task: any) =>
  //   task.title.toLowerCase().includes(searchTask.toLowerCase())
  // );

  return (
    <div>
      <h1>Task Manager</h1>

      <input type="text" ref={createTaskRef}/>

      <button onClick={handleAddTask}>Add Task</button>

      <input type="text" onChange={handleSearch} placeholder="Search Task" />

      <ul>

        
        {task.map((task: any) => (
          <li key={task.id}>
            <input
              type="text"
              value={task.title}
              onChange={(e) =>
                handleUpdateTask(task.id, {...task,  title: e.target.value })
              }
            />
            
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
       
      </ul>
    </div>
  );
};

export default TaskManager;
