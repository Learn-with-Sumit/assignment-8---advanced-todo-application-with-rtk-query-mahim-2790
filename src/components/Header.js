import React, { useState } from "react";
import { useSelector } from "react-redux";
import tickImage from "../assets/images/double-tick.png";
import noteImage from "../assets/images/notes.png";
import plusImage from "../assets/images/plus.png";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodosQuery,
} from "../features/api/apiSlice";

const Header = () => {
  const filters = useSelector((state) => state.filters);
  const { status, colors } = filters;
  const { data: todos } = useGetTodosQuery({ status, colors });
  const [input, setInput] = useState("");
  const [addTodo] = useAddTodoMutation();
  const [editTodo, { isLoading }] = useEditTodoMutation();
  const [deleteTodo, { isLoading: deleteLoading }] = useDeleteTodoMutation();

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(input);
    setInput("");
  };

  const completeHandler = () => {
    // eslint-disable-next-line array-callback-return
    todos?.map((todo) => {
      if (!todo.completed) {
        editTodo({ id: todo.id, data: { completed: true } });
      }
    });
  };

  const clearHandler = () => {
    // eslint-disable-next-line array-callback-return
    todos?.map((todo) => {
      const id = todo.id;
      if (todo.completed) {
        deleteTodo(id);
      }
    });
  };

  return (
    <div>
      <form
        className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
        onSubmit={handleSubmit}
      >
        <img src={noteImage} className="w-6 h-6" alt="Add todo" />
        <input
          type="text"
          placeholder="Type your todo"
          className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
          value={input}
          onChange={handleInput}
        />
        <button
          type="submit"
          className={`appearance-none w-8 h-8 bg-[url('${plusImage}')] bg-no-repeat bg-contain`}
        ></button>
      </form>

      <ul className="flex justify-between my-4 text-xs text-gray-500">
        <li
          className="flex space-x-1 cursor-pointer"
          onClick={completeHandler}
          disabled={isLoading}
        >
          <img className="w-4 h-4" src={tickImage} alt="Complete" />
          <span>Complete All Tasks</span>
        </li>
        <li
          className="cursor-pointer"
          onClick={clearHandler}
          disabled={deleteLoading}
        >
          Clear completed
        </li>
      </ul>
    </div>
  );
};

export default Header;
