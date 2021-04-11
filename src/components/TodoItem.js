import React, { useState } from "react";
import uniqid from "uniqid";
import useSound from 'use-sound';
import AddTodoSound from '../sounds/plunger.mp3';
import RemoveTodoSound from '../sounds/rising-pops.mp3';
import MarkTodoSound from '../sounds/pop-down.mp3';


const TodoItem = ({
    soundState,
    isCreating,
    handleTodo,
    todoItemId,
    todoValue,
    todoTotal,
    todoEdit,
    todoDelete,
    todoStatus,
    todoMarkDone
}) => {

    const [addTodoSound] = useSound(AddTodoSound,{
        // `interrupt` ensures that if the sound starts again before it's
        // ended, it will truncate it. Otherwise, the sound can overlap.
        interrupt: true,
    });

    const [removeTodoSound] = useSound(RemoveTodoSound,{
        // `interrupt` ensures that if the sound starts again before it's
        // ended, it will truncate it. Otherwise, the sound can overlap.
        interrupt: true,
    });

    const [markTodoSound] = useSound(MarkTodoSound,{
        // `interrupt` ensures that if the sound starts again before it's
        // ended, it will truncate it. Otherwise, the sound can overlap.
        interrupt: true,
    });
    

    const [inputVal, setInputVal] = useState("");
    const [isEditingTodo, setIsEditingTodo] = useState(false);
    const [editedValue, setEditedValue] = useState('');

    // ? ON CREATE TODO
    const handleCreateTodo = (event) => {
        event.preventDefault();
        const todoId = uniqid(); // ? Create Todo ID
        if(inputVal.trim() !== ''){
            handleTodo(todoId, inputVal);
            soundState && addTodoSound();
        }
        setInputVal("");
    };

    // ? ON EDIT TODO
    const editingTodo= (val) => {
        setIsEditingTodo(true);
        setEditedValue(val)
    }

    // ? ON BLUR AFTER EDITING TODO
    const handleBlur = (e) => {
        const editedVal = e.target.value;
        const editedTodoId = e.target.getAttribute('data-id');
        editedVal.trim() && todoEdit(editedTodoId, editedVal);
    }

    // ? ON REMOVE TODO
    const deleteTodo = (e) => {
        const deletedTodo = e.target.closest('.todo_row');
        const deleteTodoId = e.target.closest('.todo_row').getAttribute('id');
        if(deleteTodoId !== ''){
            todoDelete(deleteTodoId, deletedTodo)
            soundState && removeTodoSound();
        }
    }

    // ? ON MARK TODO DONE
    const markTodo = (e) => {
        const markTodoId = e.target.closest('.todo_row').getAttribute('id');
        if(markTodoId !== ''){
            todoMarkDone(markTodoId);
            soundState && markTodoSound();
        }
    }

    return (
        <div className={`todo_row ${!isCreating ? todoStatus ? 'active' : 'completed' : ''}`} id={todoItemId ? todoItemId : null}>
            <span className="check" onClick={ !isCreating ? (e) => markTodo(e) : undefined } >
                <svg xmlns="http://www.w3.org/2000/svg" width={10} height={10}>
                    <path
                        fill="none"
                        stroke="#FFF"
                        strokeWidth={2}
                        d="M1 4.304L3.696 7l6-6"
                    />
                </svg>
            </span>
            {
                isCreating ? (
                    <input
                        type="text"
                        name='add'
                        placeholder='Create a new todo...'
                        onChange={(e) => setInputVal(e.target.value)}
                        value={inputVal}
                        autoComplete="off"
                    />
                ) : (
                    <input
                        type="text"
                        name='edit'
                        placeholder='Please enter todo'
                        onChange={(e) => editingTodo(e.target.value)}
                        value={ isEditingTodo ? editedValue : todoValue}
                        onBlur={(e) => handleBlur(e)}
                        data-id={todoItemId ? todoItemId : null}
                        autoComplete="off"
                    />
                )
            }

            {!isCreating ? (
                <div className="remove_icon" onClick={ (e) => deleteTodo(e) }>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={18}
                        height={18}
                    >
                        <path
                            fill="#494C6B"
                            fillRule="evenodd"
                            d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                        />
                    </svg>
                </div>
            ) : (
                <div className="todo_btn_wrapper">
                    <button
                        title="Create Todo"
                        type="submit"
                        className="todo_btn"
                        onClick={handleCreateTodo}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 411 410"
                        >
                            <path
                                xmlns="http://www.w3.org/2000/svg"
                                d="M211.898 199.5l17.602-52.7 35.102 35.098zm65.704-24.398L236.3 133.8 369.699.5 411 41.8zm0 0"
                                data-original="#000000"
                            />
                            <path
                                xmlns="http://www.w3.org/2000/svg"
                                d="M353.2 170.5a6.952 6.952 0 00-4.962 2.04 6.946 6.946 0 00-2.039 4.96v186.898c-.015 18.22-14.781 32.985-33 33H47c-18.219-.015-32.98-14.78-33-33V98.2c.02-18.219 14.781-32.98 33-33h186.898a7.001 7.001 0 000-14H47c-25.941.043-46.96 21.059-47 47v266.2c.04 25.94 21.059 46.96 47 47h266.2c25.94-.04 46.96-21.06 47-47V177.5a7.019 7.019 0 00-7-7zm0 0"
                                data-original="#000000"
                            />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default TodoItem;
