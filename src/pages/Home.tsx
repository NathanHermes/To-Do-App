import { Task } from "@/api/Task";
import { CheckIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import axios from "axios";
import clsx from "clsx";
import { FormEvent, useEffect, useState } from "react";
export const Home = () => {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    const _tasks = await axios.get("http://localhost:3000/task");

    if (_tasks) setTasks(_tasks.data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleCreate = (event: FormEvent) => {
    event.preventDefault();
    const taskId = !tasks ? 1 : tasks.length + 1;

    const newTask: Task = {
      id: taskId,
      title: title,
      completed: false,
      created_at: new Date(),
      updated_at: new Date(),
    };

    axios.post("http://localhost:3000/task", newTask);
    getTasks();

    setTitle("");
  };

  const handleChange = async (value: string, task: Task) => {
    const updatedTask: Task = {
      ...task,
      title: value,
      updated_at: new Date(),
    };

    await axios.put(
      `http://localhost:3000/task/${updatedTask.id}`,
      updatedTask
    );
    getTasks();
  };

  const handleComplete = async (task: Task) => {
    const updatedTask: Task = {
      ...task,
      completed: !task.completed,
      updated_at: new Date(),
    };

    await axios.put(
      `http://localhost:3000/task/${updatedTask.id}`,
      updatedTask
    );
    getTasks();
  };

  const handleDelete = async (task: Task) => {
    await axios.delete(`http://localhost:3000/task/${task.id}`);
    getTasks();
  };

  return (
    <>
      <h1 className="text-3xl font-black">To-Do</h1>

      <form
        onSubmit={(event) => handleCreate(event)}
        className="w-full h-auto flex items-center justify-center gap-4"
      >
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="min-h-8 px-2 py-0.5 outline-none focus:ring-1 ring-offset-2 ring-offset-zinc-950 ring-violet-600 bg-zinc-900"
        />

        <button
          type="submit"
          className="max-w-8 max-h-8 w-full h-full flex items-center justify-center bg-violet-600"
        >
          <PlusIcon />
        </button>
      </form>

      <section className="w-full h-full flex flex-col items-center py-4 gap-1">
        {tasks &&
          tasks.map((task, index) => {
            return (
              <div
                key={index}
                className="w-full flex items-center justify-between p-4 gap-4 bg-zinc-900"
              >
                <button
                  onClick={() => handleComplete(task)}
                  className={clsx(
                    "max-w-4 max-h-4 w-full h-full flex items-center justify-center",
                    {
                      "bg-zinc-800": !task.completed,
                      "bg-green-600": task.completed,
                    }
                  )}
                >
                  {task.completed ? <CheckIcon /> : ""}
                </button>

                <input
                  value={task.title}
                  onChange={(event) => handleChange(event.target.value, task)}
                  disabled={task.completed}
                  className={clsx("w-full outline-none bg-transparent", {
                    "line-through": task.completed,
                  })}
                />

                <button
                  onClick={() => handleDelete(task)}
                  className="p-2 border border-solid border-red-600"
                >
                  <TrashIcon />
                </button>
              </div>
            );
          })}
      </section>
    </>
  );
};
