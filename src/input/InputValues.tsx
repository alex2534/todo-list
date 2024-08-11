import { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineAdd } from "react-icons/md";
import styles from "./input.module.css";
import { v4 as uuid } from "uuid";

interface Todo {
  id: string;
  input: string;
}
export default function InputValues() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [upId, setUpId] = useState<string>("");
  const [todosInput, setTodosInput] = useState<string>("");
  const focusOnInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    focusOnInput?.current?.focus();
  }, [upId]);

  const handleTodoList = () => {
    if (!todosInput) return;
    if (upId) {
      const newTodos = todos.map((todo) => {
        if (todo.id === upId) {
          return {
            ...todo,
            input: todosInput,
          };
        }
        return todo;
      });
      setTodos(newTodos);
      setTodosInput("");
      setUpId("");
      return;
    } else {
      const valueId = uuid();
      setTodos([
        ...todos,
        {
          id: valueId,
          input: todosInput,
        },
      ]);
    }

    setTodosInput("");
  };

  const handleUpdate = (id: string) => {
    // focusOnInput?.current?.focus();
    if (todos.filter((todo) => todo.id === id)) {
      setUpId(id);
      setTodosInput(todos.filter((todo) => todo.id === id)[0].input);
    }
  };

  const handleRemove = (id: string) => {
    // focusOnInput?.current?.focus();
    setTodos(todos.filter((todo) => todo.id !== id));
    setTodosInput("");
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.inputAddBtn}>
          <label htmlFor="">Todo List</label>
          <div>
            <span>
              <input
                type="text"
                ref={focusOnInput}
                autoFocus
                onBlur={(e) => {
                  e.target.focus();
                }}
                value={todosInput}
                className={styles.userInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTodosInput(e.target.value);
                }}
              />
            </span>
            <span>
              <button
                className={styles.addBtn}
                onClick={() => {
                  handleTodoList();
                }}
              >
                <MdOutlineAdd className={styles.addIncon} />
              </button>
            </span>
          </div>
        </div>

        <hr />
        {!todos !== undefined && (
          <div>
            {todos.map((todo) => (
              <div key={todo.id} className={styles.inputContainer}>
                <div className={styles.showTodos}>
                  <span>{todo.input}</span>
                  <span>
                    <button
                      className={styles.editBtn}
                      onClick={() => {
                        handleUpdate(todo.id);
                      }}
                    >
                      <CiEdit className={styles.editIcon} />
                    </button>

                    <button
                      onClick={() => {
                        handleRemove(todo.id);
                      }}
                    >
                      <RiDeleteBinLine className={styles.deleteBtn} />
                    </button>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
