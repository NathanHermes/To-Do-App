export interface Task {
  id: number;
  title: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
}

export async function findAllTasks() {
  const tasks = localStorage.getItem("tasks");
  return tasks ?? {};
}
