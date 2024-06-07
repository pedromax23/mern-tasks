import { Card, Input, Label, Textarea, Button } from '../components/ui';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useTasks } from '../context/TaskContext';

function TaskFormPage() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const { createTask, errors: errorsCreateTask, loadTask, updateTask } = useTasks();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    let task;

    if (!params.id) {
      task = await createTask(data)

    } else {
      task = await updateTask(params.id, data)
    }
    if (task) {
      navigate('/tasks')
    }
  })

  useEffect(() => {
    if (params.id) {
      loadTask(params.id).then(task => {
        setValue('title', task.title)
        setValue('descripccion', task.descripccion)
      })
    }
  }, []);

  return (
    <div className='flex h-[80vh] justify-center items-center'>
      <Card>

        {errorsCreateTask.map((err, i) => (
          <p key={'err' + i} className='text-red-500'>{err}</p>
        ))}

        <h2 className='text-3xl font-bold my-4'>
          {params.id ? "Edit Task" : "Create Task"}
        </h2>

        <form onSubmit={onSubmit}>
          <Label htmlFor={'title'}>Title</Label>
          <Input
            placeholder="Title"
            autoFocus
            {...register('title', {
              required: true,
            })}
          />
          {
            errors.title && <span className='text-red-500'>El titulo es requerido</span>
          }

          <Label htmlFor={'descripccion'}>Descripcción</Label>
          <Textarea
            placeholder="Descripcción"
            rows={3}
            {...register('descripccion')}
          ></Textarea>

          <Button>
            {params.id ? "Edit Task" : "Create Task"}
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default TaskFormPage