"use client"
import { Task, selectAllTasks, setTask } from '@/lib/taskSlice';
import { fetchTodosByUserId } from '@/lib/todoApi';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ClipboardList, Loader2 } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { useSession } from 'next-auth/react';
// import { TaskCard } from './TaskCard';

const AllTasks = ({userId}:{userId:number}) => {
  const {data:session}=useSession()
    // const userId1=session?.user?.image! ;
    // const userId=parseInt(userId1)
  const dispatch = useDispatch();
  
  const { data: allTasks, error, isLoading } = useQuery({
    queryFn: () => fetchTodosByUserId(userId),
    queryKey: ['task', userId],
  });

  useEffect(() => {
    if (allTasks) {
      dispatch(setTask(allTasks));
    }
  }, [allTasks, dispatch]);

  const tasks = useSelector(selectAllTasks);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        Error loading tasks: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <ClipboardList className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold text-gray-800">Your Tasks</h2>
      </div>
      
      <div className="grid gap-4">
        {tasks?.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No tasks found. Create a new task to get started.
          </div>
        ) : (
          tasks?.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  );
};

export default AllTasks;