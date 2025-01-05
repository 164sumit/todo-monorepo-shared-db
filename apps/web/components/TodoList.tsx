// "use client";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// import {
//   fetchTodosByUserId,
//   createTodo,
//   editTodo,
//   deleteTodo,
//   Todo,
// } from "@/lib/todoApi";
// import { AppStore } from "@/lib/store";
// import { addTask, selectAllTasks } from "@/lib/taskSlice";
// import axios from "axios";
// import { addUser } from "@/app/actions/actions";
// // import { addTodo, editTodo as editTodoAction, deleteTodo as deleteTodoAction } from '../store/todosSlice';
// // import { RootState } from '../store/store';

// interface TodoListProps {
//   userId: number;
// }

// const TodoList: React.FC<TodoListProps> = () => {
//   const userId = 1; // replace with actual userId prop
//   const description = "tjhdskjsdjkkjdskjdkj";
//   const dispatch = useDispatch();
//   const [newTodo, setNewTodo] = useState("");
//   const queryClient = useQueryClient();
//   //   const todos = useSelector((state: AppStore) => state.todos.todos);
//   const tasks = useSelector(selectAllTasks);

//   const { data, error, isLoading } = useQuery({
//     queryKey: ["todos", userId],
//     queryFn: () => fetchTodosByUserId(userId),
//   });
//   const createTodo1 = (todo: Omit<Todo, "id">) => {
//     console.log("faltu");

//     return axios.post(`${"http://localhost:3001/api"}/task`, todo);
//   };
//   const {
//     mutate,
//     isError,
//     error: mutationError,
//   } = useMutation({
//     mutationFn: createTodo1,
//     onMutate: async (newTodo: Omit<Todo, "id">) => {
//       await queryClient.cancelQueries({ queryKey: ["todos", userId] });
//       const previousTodos = queryClient.getQueryData<Todo[]>(["todos", userId]);
//       queryClient.setQueryData<Todo[]>(
//         ["todos", userId],
//         (oldQueryData: any): Todo[] => {
//           return [
//             ...oldQueryData,
//             { ...newTodo, id: oldQueryData?.length + 1 },
//           ];
//         }
//       );
//       return { previousTodos };
//     },
//     onError: (error, newTodo, context) => {
//       console.error("Error creating todo:", error);
//       queryClient.setQueryData(["todos", userId], context?.previousTodos);
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ["todos", userId] });
//     },
//   });

//   //   const {mutate} = useMutation({
//   //    mutationFn:   createTodo1,
//   //    onSuccess: () => {
//   //         // dispatch(addTask(data));
//   //         queryClient.invalidateQueries({
//   //           queryKey: ['todos', userId],
//   //         });
//   //         },
//   //     onMutate: async (newTodo: Omit<Todo, 'id'>) => {
//   //       await queryClient.cancelQueries({
//   //         queryKey: ['todos', userId],
//   //       });
//   //       const previousTodos = queryClient.getQueryData<Todo[]>(['todos', userId]);
//   //       queryClient.setQueryData<Todo[]>(['todos', userId],(oldQueryData:any ): Todo[]=>{
//   //         return {
//   //             ...oldQueryData,
//   //             data: [...oldQueryData.data, { ...newTodo, id: oldQueryData?.data?.length + 1 }]
//   //         }

//   //       });
//   //     //   if (previousTodos) {
//   //     //   }
//   //       return { previousTodos };

//   //     },
//   //     onError: (_error, _post, context) => {
//   //         queryClient.setQueryData(['todos', userId], context?.previousTodos)
//   //     },
//   //     onSettled: () => {
//   //         queryClient.invalidateQueries({
//   //             queryKey: ['todos', userId],
//   //         });
//   //     }
//   //     // onSuccess: (data) => {
//   //     //     dispatch(addTask(data));
//   //     //     queryClient.invalidateQueries({
//   //     //       queryKey: ['todos', userId],
//   //     //     });
//   //     //     }

//   //   })
//   //
//   //   const createMutation = useMutation(createTodo, {
//   //     onSuccess: (newTodo) => {
//   //       dispatch(addTodo(newTodo));
//   //       queryClient.invalidateQueries(['todos', userId]);
//   //     },
//   //   });

//   const editMutation = useMutation({
//     mutationFn: (updatedTodo: Todo) => editTodo(updatedTodo),
//     onMutate: async (updatedTodo: Todo) => {
//       await queryClient.cancelQueries({
//         queryKey: ["todos", userId],
//       });
//       const previousTodos = queryClient.getQueryData<Todo[]>(["todos", userId]);
//       if (previousTodos) {
//         const updatedTodos = previousTodos.map((todo) =>
//           todo.id === updatedTodo.id ? updatedTodo : todo
//         );
//         queryClient.setQueryData<Todo[]>(["todos", userId], updatedTodos);
//       }
//       return { previousTodos };
//     },
//   });

//   const deleteMutation = useMutation({
//     mutationFn: (todoId: number) => deleteTodo(todoId),
//     onMutate: async (todoId: number) => {
//       await queryClient.cancelQueries({
//         queryKey: ["todos", userId],
//       });
//       const previousTodos = queryClient.getQueryData<Todo[]>(["todos", userId]);
//       if (previousTodos) {
//         const updatedTodos = previousTodos.filter((todo) => todo.id !== todoId);
//         queryClient.setQueryData<Todo[]>(["todos", userId], updatedTodos);
//       }
//       return { previousTodos };
//     },
//   });

//   const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

//   const handleCreateTodo = () => {
//     // createMutation.mutate({ userId, title: newTodo });
//     console.log("newTodo", newTodo);

//     mutate({ userId, title: newTodo, description });
//     setNewTodo("");
//   };

//   const handleEditTodo = (todo: Todo) => {
//     setEditingTodo(todo);
//     setNewTodo(todo.title);
//   };

//   const handleUpdateTodo = () => {
//     if (editingTodo) {
//       editMutation.mutate({ ...editingTodo, title: newTodo });
//       setEditingTodo(null);
//       setNewTodo("");
//     }
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading todos: {error.message}</div>;
//   const hendeluser=async()=>{
//     console.log("user add buton clicked");
    
//     await addUser()
//   }
//   return (
//     <div>
//       <button onClick={hendeluser}>add user</button>
//       <h2>Todo List</h2>
//       <div>{JSON.stringify(data, undefined)}</div>
//       <input
//         type="text"
//         value={newTodo}
//         onChange={(e) => setNewTodo(e.target.value)}
//         placeholder="Add a new todo"
//       />
//       <button onClick={editingTodo ? handleUpdateTodo : handleCreateTodo}>
//         {editingTodo ? "Update Todo" : "Add Todo"}
//       </button>
//       <ul>
//         {data?.map((todo) => (
//           <li key={todo.id}>
//             {todo.title}
//             <br />
//             {todo.description}
//             <br />
//             <button onClick={() => handleEditTodo(todo)}>Edit</button>
//             <button onClick={() => deleteMutation.mutate(todo.id)}>
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TodoList;

import React from 'react'

const TodoList = () => {
  return (
    <div>TodoList</div>
  )
}

export default TodoList