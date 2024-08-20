import { useState } from 'react'

export const Home = () => {
  const [ newTask, setNewTask ] = useState( '' )
  const [ tasks, setTasks ] = useState( Array<string> )

  const handleSubmit = ( event: React.MouseEvent<HTMLButtonElement> ) => {
    event.preventDefault()

    setTasks( prevState => [ ...prevState, newTask ] )
    setNewTask( '' )
  }

  return (
    <main>
      <h1>To-Do</h1>

      <form>
        <input id='task' type='text' value={ newTask } onChange={ event => setNewTask( event.target.value ) } />
        <button type='submit' onClick={ event => handleSubmit( event ) }>Add</button>
      </form>

      <section>
        { tasks.map( ( task, index ) => {
          return (
            <div key={ index }>
              { task }
            </div> )
        } ) }
      </section>
    </main>
  )
}