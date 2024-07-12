import { TodoContext } from "./context/TodoContext";
import { nanoid } from "nanoid";
import TodoCard from "./TodoCard";
import React, { useContext, useState } from "react";
import { Check } from "lucide-react";

function Todo() {
  const { todoList, addTodo, totalComplete, updateTodo } =
    useContext(TodoContext);
  const [input, setInput] = useState("");
  const [update, setUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input == "") {
      setInput("");
    } else {
      const todo = {
        id: nanoid().substring(0, 6),
        task: input,
        complete: false,
      };
      addTodo(todo);
      setInput("");
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setUpdate(!update);
    if (input !== "") {
      updateTodo(updateId, input);
      setInput("");
    }
  };

  return (
    <div className="flex justify-start py-8 items-center flex-col m-8 rounded-2xl h-[80%]">
      <section className="border-[1px] border-gray-500 p-8 mb-4 rounded-2xl flex justify-center items-center gap-6 text-gray-400 w-[95%] sm:w-[85%] md:w-[70%] lg:w-[40%] sm:justify-around">
        <h2>
          <span className="text-2xl sm:text-4xl font-semibold">Task Done</span>
          <br />
          <span className="sm:text-lg">keep it up</span>
        </h2>
        <div className="bg-orange-600 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex justify-center items-center">
          {todoList.length == 0 ? (
            <p className="text-4xl font-bold text-black">Hi</p>
          ) : (
            <p className="text-4xl font-bold text-black">{`${totalComplete}/${todoList.length}`}</p>
          )}
        </div>
      </section>
      <section className="mt-4 mb-8">
        <form className="flex justify-center items-center gap-4">
          <input
            type="text"
            placeholder="Write your next Task"
            className="sm:w-[60vw] md:w-[57vw] lg:w-[32vw]
            rounded-xl py-2 px-4 outline-none bg-slate-800 text-gray-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {update ? (
            <button
              className="font-bold bg-orange-600 flex justify-center items-center w-[30px] h-[30px] text-black rounded-full text-2xl"
              onClick={handleUpdate}
            >
              <Check />
            </button>
          ) : (
            <button
              className="font-bold bg-orange-600 flex justify-center items-center w-[40px] h-[40px] pb-1 text-black rounded-full text-3xl"
              onClick={handleSubmit}
            >
              +
            </button>
          )}
        </form>
      </section>
      <section className="w-[75vw] md:w-[65vw] lg:w-[37vw]">
        {todoList.map((todo) => (
          <div key={todo.id}>
            <TodoCard
              task={todo.task}
              id={todo.id}
              complete={todo.complete}
              setUpdate={setUpdate}
              setInput={setInput}
              setUpdateId={setUpdateId}
            />
          </div>
        ))}
      </section>
    </div>
  );
}

export default Todo;
