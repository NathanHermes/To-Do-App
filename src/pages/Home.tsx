import { CheckIcon, PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import { FormEvent, useState } from 'react'

type Task = {
  id: number
  title: string
  completed: boolean
}

interface TasksData {
  tasks: Task[]
}

export const Home = () => {
  const [ title, setTitle ] = useState( '' )
  const [ tasksData, setTasksData ] = useState<TasksData>()

  const createNewTask = ( event: FormEvent ) => {
    event.preventDefault()

    let _tasks: Task[] = []
    if ( tasksData !== undefined ) {
      _tasks = tasksData.tasks
    }

    _tasks.push( { id: 1, title: 'Test', completed: false } )
    setTasksData( { tasks: _tasks } )

    setTitle( '' )
  }



  // const handleComplete = ( event: React.MouseEvent<HTMLButtonElement>, index: number, task: ITask ) => {
  //   event.preventDefault()


  // }

  return (
    <>
      <h1 className='text-3xl font-black'>To-Do</h1>

      <form onSubmit={ createNewTask } className='w-full h-auto flex items-center justify-center gap-4'>
        <input
          id='title'
          type='text'
          value={ title }
          onChange={ event => setTitle( event.target.value ) }
          className='min-h-8 px-2 py-0.5 outline-none focus:ring-1 ring-offset-2 ring-offset-zinc-950 ring-violet-600 bg-zinc-900' />

        <button
          type='submit'
          className='max-w-8 max-h-8 w-full h-full flex items-center justify-center bg-violet-600'><PlusIcon /></button>
      </form>

      <section className='w-full h-full flex flex-col items-center py-4 gap-1'>
        { tasksData?.tasks.map( ( task, index ) => {
          return (
            <div key={ index } className='w-full flex items-center justify-between p-4 gap-4 bg-zinc-900'>
              <button
                onClick={ event => handleComplete( event, index, task ) }
                className={ clsx( 'max-w-4 max-h-4 w-full h-full flex items-center justify-center', {
                  'bg-zinc-800': !task.completed,
                  'bg-green-600': task.completed,
                } ) }>{ task.completed ? <CheckIcon /> : "" }</button>

              <input
                value={ task.title }
                disabled={ task.completed }
                className={ clsx( 'w-full outline-none bg-transparent', {
                  'line-through': task.completed
                } ) } />

              <button className='p-2 border border-solid border-red-600'><TrashIcon /></button>
            </div> )
        } ) }
      </section>
    </>
  )
}