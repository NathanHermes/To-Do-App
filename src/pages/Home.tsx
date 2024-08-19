import { useState } from 'react'

export const Home = () => {
  const [ newTask, setNewTask ] = useState( '' )
  const [ tasks, setTasks ] = useState( Array<string> )

  const handleSubmit = ( event: React.MouseEvent<HTMLButtonElement> ) => {
    event.preventDefault()

    setTasks( prevState => [ ...prevState, newTask ] )
  }

  return (
    <main>
      <h1>To-Do</h1>

      <form>
        <input id='task' type='text' onChange={ event => setNewTask( event.target.value ) } />
        <button type='submit' onClick={ event => handleSubmit( event ) }>Add</button>
      </form>

      <ul id="ToDoList">
        { tasks.map( ( task, index ) => {
          return <li key={ index }>{ task }</li>
        } ) }
      </ul>
    </main>
  )
}