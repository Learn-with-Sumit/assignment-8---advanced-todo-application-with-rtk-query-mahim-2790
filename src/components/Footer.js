import { useDispatch, useSelector } from "react-redux";
import { useGetTodosQuery } from "../features/api/apiSlice";
import { addType, toggleColor } from "../features/filter/filterSlice";

const numberOfTodos = (no_of_todos) => {
  switch (no_of_todos) {
    case 0:
      return "No task";
    case 1:
      return "1 task";
    default:
      return `${no_of_todos} tasks`;
  }
};

export default function Footer() {
  const filters = useSelector((state) => state.filters);
  const { status, colors } = filters;
  const { data: todos } = useGetTodosQuery({ status, colors });

  const dispatch = useDispatch();
  const todosRemaining = todos?.filter((todo) => !todo.completed).length;

  const handleStatusChange = (status) => {
    dispatch(addType(status));
  };

  const handleColorChange = (color) => {
    if (colors.includes(color)) {
      dispatch(toggleColor({ color, status: "remove" }));
    } else {
      dispatch(toggleColor({ color, status: "add" }));
    }
  };

  return (
    <div className="mt-4 flex justify-between text-xs text-gray-500">
      <p>{numberOfTodos(todosRemaining)} left</p>
      <ul className="flex space-x-1 items-center text-xs">
        <li
          className={`cursor-pointer ${status === "all" && "font-bold"}`}
          onClick={() => handleStatusChange("all")}
        >
          All
        </li>
        <li>|</li>
        <li
          className={`cursor-pointer ${status === "incomplete" && "font-bold"}`}
          onClick={() => handleStatusChange("incomplete")}
        >
          Incomplete
        </li>
        <li>|</li>
        <li
          className={`cursor-pointer ${status === "complete" && "font-bold"}`}
          onClick={() => handleStatusChange("complete")}
        >
          Complete
        </li>
        <li></li>
        <li></li>
        <li
          className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${
            colors.includes("green") && "bg-green-500"
          }`}
          onClick={() => handleColorChange("green")}
        ></li>
        <li
          className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${
            colors.includes("red") && "bg-red-500"
          }`}
          onClick={() => handleColorChange("red")}
        ></li>
        <li
          className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${
            colors.includes("yellow") && "bg-yellow-500"
          }`}
          onClick={() => handleColorChange("yellow")}
        ></li>
      </ul>
    </div>
  );
}
