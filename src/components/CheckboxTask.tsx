import { X } from "lucide-react";
import { useThemeSwitcher } from "../stores/useThemeSwitcher";

interface CheckboxTaskProps {
  children: string;
  onDelete?: () => void;
  checked?: boolean;
  onChange?: () => void;
}

export const CheckboxTask = ({
  children,
  onDelete,
  checked = false,
  onChange,
}: CheckboxTaskProps) => {
  const { theme } = useThemeSwitcher();

  return (
    <section
      className={`w-full border-b ${theme === "light" ? "border-gray-300" : "border-gray-600"} px-6 py-4`}
    >
      <div className="flex items-center justify-between">
        <div className="task flex gap-4">
          <input
            type="checkbox"
            className="cursor-pointer"
            checked={checked}
            onChange={onChange}
          />
          <span
            className={`${theme === "light" ? "text-dark-very-dark-desaturated-blue" : "text-light-very-light-grayish-blue"}`}
          >
            {children}
          </span>
        </div>
        <button
          onClick={onDelete}
          className="hover:text-primary-bright-blue cursor-pointer"
        >
          <X size={24} strokeWidth={1} color="var(--color-gray-600)" />
        </button>
      </div>
    </section>
  );
};
