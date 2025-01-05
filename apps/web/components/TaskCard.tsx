"use client "
import { Task } from "@/lib/taskSlice";
import { EditButton } from "./EditButton";
import { DeleteButton } from "./DeleteButton";
import { Badge } from "@/components/ui/badge";

export function TaskCard({ task }: { task: Task }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h3>
          <p className="text-gray-600 mb-3">{task.description}</p>
        </div>
        <Badge className={`${getStatusColor(task.status!)} px-3 py-1 rounded-full`}>
          {task.status!.replace("_", " ")}
        </Badge>
      </div>
      <div className="flex space-x-3">
        <EditButton task={task} />
        <DeleteButton task={task} />
      </div>
    </div>
  );
}