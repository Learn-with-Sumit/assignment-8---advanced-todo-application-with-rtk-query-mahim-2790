import React from "react";
import { useSelector } from "react-redux";
import { useGetTodosQuery } from "../features/api/apiSlice";
import Error from "./Error";
import Todo from "./Todo";

const TodoList = () => {
  const { status, colors } = useSelector((state) => state.filters);
  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useGetTodosQuery({ status, colors });

  let content = null;

  if (isLoading) {
    content = <div>Loading.....</div>;
  }

  if (!isLoading && isError) {
    content = <Error message={error.message} />;
  }

  if (!isLoading && !isError && todos?.length > 0) {
    content = todos?.map((todo) => <Todo key={todo.id} todo={todo} />);
  }

  return (
    <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
      {content}
    </div>
    // <div></div>
  );
};

export default TodoList;
