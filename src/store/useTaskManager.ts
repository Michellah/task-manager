import { create } from "zustand";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskStoreActions {
  task: Task[];
  addTask: (task: any) => void;
  updateTask: (taskId: number, newTitle: string) => void;
  deleteTask: (taskId: number) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const useTaskManager = create<TaskStoreActions>((set: any) => ({

  task:  [],

  addTask: () => {
    const newTask = {
      id: generateId(),
      title: '',
      completed: false,
    };

    set((state:TaskStoreActions) => ({
      tasks: [...state.task, newTask],
    }));
  },

  updateTask: (taskId:any, newTitle:any) => {
    set((state:any) => ({
      tasks: state.tasks.map((task:any) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      ),
    }));
  },

  deleteTask: (taskId:any) => {
    set((state:any) => ({
      tasks: state.tasks.filter((task:any) => task.id !== taskId),
    }));
  },
}))

export {
  useTaskManager
}