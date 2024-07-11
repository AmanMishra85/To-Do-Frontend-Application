import { TodoContext } from "./context/TodoContext";
import React, { useContext, useEffect, useState, useRef } from "react";
import { Circle, CircleCheckBig, FilePenLine, Trash } from "lucide-react";

const TodoCard = ({ task, id, complete, setInput, setUpdate, setUpdateId }) => {
  const { removeTodo, todoList, setTodoList, setTotalComplete, totalComplete } =
    useContext(TodoContext);
  const [status, setStatus] = useState(complete);
  const textareaRef = useRef(null);

  const handleRemove = (e) => {
    removeTodo(id);
  };

  const handleCheck = (e) => {
    setStatus(!status);
    todoList.map((todo) => {
      if (todo.id == id) {
        todo.complete = !status;
      }
    });
    setTodoList(todoList);
    if (!status) {
      setTotalComplete(totalComplete + 1);
      localStorage.setItem("totalComplete", JSON.stringify(totalComplete + 1));
    } else {
      setTotalComplete(totalComplete - 1);
      localStorage.setItem("totalComplete", JSON.stringify(totalComplete - 1));
    }
    localStorage.setItem("todos", JSON.stringify(todoList));
  };

  const EditTodo = () => {
    setUpdate(true);
    setUpdateId(id);
    setInput(task);
  };


  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [task]);

  return (
    <>
      <section className="border-[1px] p-4 my-2 rounded-xl border-gray-500">
        <div className="flex justify-between sm:justify-center
        lg:justify-between items-start">
          <section
            className="cursor-pointer flex justify-center items-start gap-2"
            onClick={handleCheck}
          >
            <button className="mt-1">
              {status ? (
                <CircleCheckBig className="text-green-400 " />
              ) : (
                <Circle className="text-orange-600" />
              )}
            </button>

            <textarea
              ref={textareaRef}
              value={task}
              readOnly={true}
              className={`bg-slate-900 resize-none text-gray-300 overflow-hidden outline-none cursor-pointer w-[40vw] sm:w-[50vw] md:[30vw] lg:w-[25vw] ${
                status ? "line-through" : ""
              } `}
              placeholder="Type something..."
            />
          </section>

          <section className="flex justify-center items-center gap-2 w-[20%]">
            <button onClick={EditTodo} className="text-gray-600">
              <FilePenLine size={24} />
            </button>
            <button onClick={handleRemove} className="text-gray-600">
              <Trash size={24} />
            </button>
          </section>
        </div>
      </section>
    </>
  );
};

export default TodoCard;
