// Images
import Logo from "/images/logo.svg";

// Components
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { CheckboxTask } from "../components/CheckboxTask";

// Icons
import { Circle } from "lucide-react";

// Types
import { useState, KeyboardEvent } from "react";
import { useThemeSwitcher } from "../stores/useThemeSwitcher";

// Drag and Drop
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

// Componente Sortable para cada tarefa
const SortableTask = ({
  task,
  toggleTaskCompletion,
  deleteTask,
}: {
  task: Task;
  toggleTaskCompletion: (id: number) => void;
  deleteTask: (id: number) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CheckboxTask
        checked={task.completed}
        onChange={() => toggleTaskCompletion(task.id)}
        onDelete={() => deleteTask(task.id)}
      >
        {task.text}
      </CheckboxTask>
    </div>
  );
};

export const HomePage = () => {
  const { theme } = useThemeSwitcher();
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  // Configurar sensores para drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

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

  // Função para lidar com o fim do drag and drop
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
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
                  icon={<Circle className="opacity-25" strokeWidth={2} color="var(--color-gray-600)" />}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="mt-9">
                <div
                  className={`w-full rounded shadow-lg ${theme === "light" ? "bg-white" : "bg-dark-very-dark-desaturated-blue"}`}
                >
                  {/* RENDERIZAR TASKS COM DRAG AND DROP */}
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={tasks.map((task) => task.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {tasks.map((task) => (
                        <SortableTask
                          key={task.id}
                          task={task}
                          toggleTaskCompletion={toggleTaskCompletion}
                          deleteTask={deleteTask}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>

                  {/* Footer */}
                  <div className="flex items-center justify-between gap-4 px-6 py-4">
                    <span
                      className={`${theme === "light" ? "text-dark-very-dark-desaturated-blue" : "text-light-very-light-grayish-blue"}`}
                    >
                      {tasks.filter((task) => !task.completed).length} items
                      left
                    </span>
                    <div className="flex items-center gap-4">
                      <Button onClick={() => setTasks(tasks)}>All</Button>
                      <Button
                        onClick={() =>
                          setTasks(tasks.filter((task) => !task.completed))
                        }
                      >
                        Active
                      </Button>
                      <Button
                        onClick={() =>
                          setTasks(tasks.filter((task) => task.completed))
                        }
                      >
                        Completed
                      </Button>
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
