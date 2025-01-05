"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { setTask, Task, updateTask } from "@/lib/taskSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Pencil, Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

export function EditButton({ task }: { task: Task }) {
  const validStatuses = ["PENDING", "IN_PROGRESS", "COMPLETED"];
  const queryClient = useQueryClient();
  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(task.description);
  const [status, setStatus] = useState<string>(task.status || "PENDING");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const editTodo = (updatedTask: Task) => {
    return axios.put(`http://localhost:3001/api/tasks/${task.id}`, updatedTask);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: editTodo,
    onMutate: async (updatedTask: Task) => {
      await queryClient.cancelQueries({ queryKey: ["todos", task.userId] });
      const previousTodos = queryClient.getQueryData<Task[]>(["todos", task.userId]);
      
      queryClient.setQueryData<Task[]>(
        ["todos", task.userId],
        (oldQueryData: Task[] | undefined): Task[] => {
          return oldQueryData
            ? oldQueryData.map((t) => t.id === updatedTask.id ? { ...t, ...updatedTask } : t)
            : [];
        }
      );

      dispatch(updateTask(updatedTask));
      return { previousTodos };
    },
    onError: (error, updatedTask, context) => {
      console.error("Error updating todo:", error);
      queryClient.setQueryData(["todos", task.userId], context?.previousTodos);
      dispatch(setTask(context?.previousTodos || []));
    },
    onSuccess: () => {
      setIsDialogOpen(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", task.userId] });
    },
  });

  const handleUpdateTodo = () => {
    if (!title.trim()) return;
    mutate({ ...task, title, description, status });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <Pencil className="h-4 w-4" />
          <span>Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Make changes to your task here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={setStatus} value={status}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  {validStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleUpdateTodo}
            disabled={isPending || !title.trim()}
            className="w-full sm:w-auto"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}