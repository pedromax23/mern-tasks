import { useEffect } from "react";
import TaskCard from '../components/tasks/TaskCard';
import { useTasks } from '../context/TaskContext.jsx';

function TasksPage() {

  const { tasks, loadTasks } = useTasks();

  useEffect(() => {
    loadTasks();
  }, [])

  if (tasks.length === 0) return (
    <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
      <h1 className="text-3xl font-bold">No se encontraron tareas</h1>
    </div>
  )

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}

export default TasksPage