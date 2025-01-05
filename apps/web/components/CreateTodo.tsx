"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addTask, addTask1, setTask, Task, updateTask } from "@/lib/taskSlice";
import { PlusCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";

const CreateTodo = () => {
  // const userId = 1;
  const {data:session}=useSession()
  const userId1=session?.user?.image! ;
  const userId=parseInt(userId1)
  console.log(userId);
  
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const validStatuses = ["PENDING", "IN_PROGRESS", "COMPLETED"];
  const [status, setStatus] = useState<string>("PENDING");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const createTodo1 = (todo: Omit<Task, "id">) => {
    return axios.post(`${"http://localhost:3001/api"}/task`, todo);
  };

  const { mutate, isError, error: mutationError } = useMutation({
    mutationFn: createTodo1,
    onMutate: async (newTodo: Task) => {
      await queryClient.cancelQueries({ queryKey: ["todos", userId] });
      const previousTodos = queryClient.getQueryData<Task[]>(["todos", userId]);
      queryClient.setQueryData<Task[]>(
        ["todos", userId],
        (oldQueryData: Task[] | undefined): Task[] => {
          return [
            ...(oldQueryData || []),
            { ...newTodo, id: (oldQueryData?.length || 0) + 1 },
          ];
        }
      );
      const optimisticTodo: Task = {
        ...newTodo,
        id: previousTodos?.length ? previousTodos.length + 1 : 1,
      };
      dispatch(addTask(optimisticTodo));
      return { previousTodos };
    },
    onError: (error, newTodo, context) => {
      console.error("Error creating todo:", error);
      queryClient.setQueryData(["todos", userId], context?.previousTodos);
      dispatch(setTask(context?.previousTodos || []));
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["todos", userId] });
      dispatch(addTask1(data.data));
    },
  });

  const handleCreateTodo = () => {
    if (!title.trim()) return;
    mutate({ userId, title, description, status });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <PlusCircle className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold text-gray-800">Create Task</h2>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-gray-700">
            Title
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="Enter task title"
            className="w-full"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description
          </Label>
          <Input
            id="description"
            type="text"
            placeholder="Enter task description"
            className="w-full"
            onChange={(e) => setDescription(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && handleCreateTodo()}
            value={description}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status" className="text-sm font-medium text-gray-700">
            Status
          </Label>
          <Select
            onValueChange={(value) => setStatus(value)}
            value={status}
          >
            <SelectTrigger id="status" className="w-full">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                {validStatuses.map((status) => (
                  <SelectItem
                    key={status}
                    value={status}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    {status.replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleCreateTodo}
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          disabled={!title.trim()}
        >
          Create Task
        </Button>
      </form>

      {isError && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          An error occurred while creating the task. Please try again.
        </div>
      )}
    </div>
  );
};

export default CreateTodo;