import { createAppSlice } from "@/lib/createAppSlice";
import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id?: number;
  title: string;
  description: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  userId: number;
}

export interface TasksSliceState {
  tasks: Task[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}
const task1: Task = {
  id: 1,
    title: "Task 1",
    description: "Task 1 description",
    status: "PENDING",
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
    userId: 1,
};
// const task2: Task = {
//   id: 2,
//     title: "Task 2",
//     description: "Task 2 description",
//     status: "PENDING",
    
//     userId: 1,
// };
const initialState: TasksSliceState = {
  tasks: [],
  status: "idle",
  error: null,
};
const getall=async()=>{
    const response = await fetch('http://localhost:3001/api/tasks', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId:1}),
    });
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
}
export const getAll=createAsyncThunk('/api/tasks',getall);


export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState,
  reducers: (create) => ({
    // Add Task
    addTask: create.reducer(
      (state, action: PayloadAction<Task>) => {
        state.tasks.push({...action.payload});
      },
    ),
    addTask1: create.reducer(
      (state, action: PayloadAction<Task>) => {
        state.tasks.pop();
        state.tasks.push({...action.payload});


      },
    ),
    // Set Task
    setTask: create.reducer(
      (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
      },
    ),
    // Update Task
    updateTask: create.reducer(
      (state, action: PayloadAction<Task>) => {
        // state.tasks.map()
        console.log(action.payload);
        
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      },
    ),
    // Delete Task
    deleteTask: create.reducer(
      (state, action: PayloadAction<number>) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      },
    ),

    // addTask: create.asyncThunk(
    //   async (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    //     const response = await fetch('http://localhost:3001/api/task', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(taskData),
    //     });
    //     if (!response.ok) throw new Error('Failed to create task');
    //     return response.json();
    //   },
    //   {
    //     pending: (state) => {
    //       state.status = "loading";
    //     },
    //     fulfilled: (state, action) => {
    //       state.status = "idle";
    //       state.tasks.push(action.payload);
    //     },
    //     rejected: (state, action) => {
    //       state.status = "failed";
    //       state.error = action.error.message ?? "Failed to create task";
    //     },
    //   }
    // ),

    // // Delete Task
    // deleteTask: create.asyncThunk(
    //   async (taskId: number) => {
    //     const response = await fetch(`/api/tasks/${taskId}`, {
    //       method: 'DELETE',
    //     });
    //     if (!response.ok) throw new Error('Failed to delete task');
    //     return taskId;
    //   },
    //   {
    //     pending: (state) => {
    //       state.status = "loading";
    //     },
    //     fulfilled: (state, action) => {
    //       state.status = "idle";
    //       state.tasks = state.tasks.filter(task => task.id !== action.payload);
    //     },
    //     rejected: (state, action) => {
    //       state.status = "failed";
    //       state.error = action.error.message ?? "Failed to delete task";
    //     },
    //   }
    // ),

    // // Edit Task
    // editTask: create.asyncThunk(
    //   async ({ id, updates }: { id: number; updates: Partial<Task> }) => {
    //     const response = await fetch(`/api/tasks/${id}`, {
    //       method: 'PATCH',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(updates),
    //     });
    //     if (!response.ok) throw new Error('Failed to update task');
    //     return response.json();
    //   },
    //   {
    //     pending: (state) => {
    //       state.status = "loading";
    //     },
    //     fulfilled: (state, action) => {
    //       state.status = "idle";
    //       const index = state.tasks.findIndex(task => task.id === action.payload.id);
    //       if (index !== -1) {
    //         state.tasks[index] = action.payload;
    //       }
    //     },
    //     rejected: (state, action) => {
    //       state.status = "failed";
    //       state.error = action.error.message ?? "Failed to update task";
    //     },
    //   }
    // ),

    // // Get All Tasks
    // getAllTasks: create.asyncThunk(
    //   async (userId: number) => {
    //     const response = await fetch('http://localhost:3001/api/tasks', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({userId}),
    //       });
    //     if (!response.ok) throw new Error('Failed to fetch tasks');
    //     return response.json();
    //   },
    //   {
    //     pending: (state) => {
    //       state.status = "loading";
    //     },
    //     fulfilled: (state, action) => {
    //       state.status = "idle";
    //       state.tasks = action.payload;
    //     },
    //     rejected: (state, action) => {
    //       state.status = "failed";
    //       state.error = action.error.message ?? "Failed to fetch tasks";
    //     },
    //   }
    // ),
  }),
  selectors: {
    selectAllTasks: (state) => state.tasks,
    selectTaskById: (state, taskId: number) =>
      state.tasks.find((task) => task.id === taskId),
    selectTasksByStatus: (state, status: string) =>
      state.tasks.filter((task) => task.status === status),
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
 
});

// Export actions
// export const { addTask, deleteTask, editTask, getAllTasks } = tasksSlice.actions;
export const { addTask,addTask1, deleteTask, updateTask, setTask } = tasksSlice.actions;
// export const { addTask, deleteTask, editTask } = tasksSlice.actions;

// Export selectors
export const {
  selectAllTasks,
  selectTaskById,
  selectTasksByStatus,
  selectStatus,
  selectError,
} = tasksSlice.selectors;