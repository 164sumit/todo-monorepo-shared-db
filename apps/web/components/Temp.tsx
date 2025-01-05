"use client"
import { useDispatch, useSelector } from 'react-redux';
import {
  addTask,
  deleteTask,
  
  selectAllTasks,
  selectStatus,
  selectError,
  getAll
} from '../lib/taskSlice';
import { useEffect } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { json } from 'stream/consumers';

function TaskComponent() {
    const dispatch = useAppDispatch();
    const tasks = useSelector(selectAllTasks);
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);
    // const currentUserId = useSelector(state => state.auth.currentUser?.id);
    

//   const handleAddTask = async () => {
//     await dispatch(addTask({
//       title: "New Task",
//       description: "Task description",
//       status: "PENDING",
//       userId: currentUserId
//     }));
//   };

//   const handleDeleteTask = async (taskId: number) => {
//     await dispatch(deleteTask(taskId));
//   };

//   const handleEditTask = async (taskId: number) => {
//     await dispatch(editTask({
//       id: taskId,
//       updates: {
//         title: "Updated Title",
//         status: "COMPLETED"
//       }
//     }));
//   };

//   if (status === "loading") return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
const task2: any = {
    id: 2,
      title: "Task 2",
      description: "Task 2 description",
      status: "PENDING",
      
      userId: 1,
  };
  useEffect(() => {
    const fun=async()=>{
        // await dispatch(addTask(task2));
        console.log("dsdsdsd");
        
        // dispatch(getAllTasks(1));
        }
        fun();
  }, [])
  
  return (
    <div>
      <h1>Task Component</h1>
      <button
        onClick={async() => {
          // dispatch(getAllTasks(1));
        }}
      >getAllTasks</button>
      <button
        onClick={async() => {
          dispatch(addTask(task2));
        }}
      >click</button>
      <div>{JSON.stringify(tasks, null, 2)}</div>
    </div>
  );
}
export default TaskComponent;