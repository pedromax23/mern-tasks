import { useEffect } from "react";
import TaskCard from '../components/tasks/TaskCard';
import { useTasks } from '../context/TaskContext.jsx';

function TasksPage() {

  const { tasks, loadTasks } = useTasks();

  useEffect(() => {
    loadTasks();
  }, [])

  return (
    <div className="grid grid-cols-3 gap-2">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}

export default TasksPage