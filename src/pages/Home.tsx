import { useThemeSwitcher } from "../stores/useThemeSwitcher";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { Input } from "../components/ui/Input";
import Logo from "/images/logo.svg";

// Icons
import { Circle } from "lucide-react";
import { Button } from "../components/ui/Button";
import { CheckboxTask } from "../components/CheckboxTask";
import { useState, KeyboardEvent } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export const HomePage = () => {
  const { theme } = useThemeSwitcher();
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      const newTask: Task = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setInputValue(""); // Limpar o input após adicionar a tarefa
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <>
      <section className="z-10 pt-16">
        <div className="custom-container">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-12">
            <div className="invsible-grid col-span-12 sm:col-span-3"></div>

            <div className="col-span-12 sm:col-span-6">
              <div className="flex items-center justify-between">
                <img src={Logo} alt="ToDo" />

                <ThemeSwitcher />
              </div>
              <div className="mt-16">
                <Input
                  placeholder="Create a new todo..."
                  icon={<Circle className="opacity-25" strokeWidth={1} />}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="mt-9">
                <div
                  className={`w-full rounded shadow-lg ${theme === "light" ? "bg-light-very-light-gray" : "bg-dark-very-dark-desaturated-blue"}`}
                >
                  {/* RENDERIZAR TASKS */}
                  {tasks.map((task) => (
                    <div key={task.id}>
                      <CheckboxTask
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task.id)}
                        onDelete={() => deleteTask(task.id)}
                      >
                        {task.text}
                      </CheckboxTask>
                    </div>
                  ))}
                  {/* Footer */}
                  <div className="flex items-center justify-between gap-4 px-6 py-4">
                    <span
                      className={`${theme === "light" ? "text-dark-very-dark-desaturated-blue" : "text-light-very-light-grayish-blue"}`}
                    >
                      {tasks.filter((task) => !task.completed).length} items
                      left
                    </span>
                    <div className="flex items-center gap-4">
                      <Button>All</Button>
                      <Button>Active</Button>
                      <Button>Completed</Button>
                    </div>
                    <div>
                      <Button
                        onClick={() =>
                          setTasks(tasks.filter((task) => !task.completed))
                        }
                      >
                        Clear Completed
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <h1
                className={`mt-16 text-center ${theme === "light" ? "text-dark-very-dark-desaturated-blue" : "text-light-very-light-grayish-blue"}`}
              >
                Drag and drop to reorder list
              </h1>
            </div>

            <div className="invsible-grid col-span-12 sm:col-span-3"></div>
          </div>
        </div>
      </section>
    </>
  );
};
