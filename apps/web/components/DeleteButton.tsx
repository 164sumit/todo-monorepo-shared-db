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
import { deleteTask, setTask, Task } from "@/lib/taskSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

export function DeleteButton({ task }: { task: Task }) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const deleteTodo = (taskId: number) => {
    return axios.delete(`http://localhost:3001/api/tasks/${task.id}`);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: deleteTodo,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["todos", task.userId] });
      const previousTodos = queryClient.getQueryData(["todos", task.userId]);
      dispatch(deleteTask(task.id!));
      return { previousTodos };
    },
    onError: (err, variables, context: any) => {
      console.error("Error deleting task:", err);
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos", task.userId], context.previousTodos);
        dispatch(setTask(context.previousTodos));
      }
    },
    onSuccess: () => {
      setIsDialogOpen(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", task.userId] });
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50">
          <Trash2 className="h-4 w-4" />
          <span>Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{task.title}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="ghost"
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => mutate(task.id!)}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete Task'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}