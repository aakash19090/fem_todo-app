import React, { Component } from "react";
import TodoItem from "../components/TodoItem";
import { ReactSortable } from "react-sortablejs";
import { Sortable, MultiDrag, Swap} from "sortablejs"

import Mute from '../components/Mute'
import Unmute from '../components/Unmute'
import Darkmode from '../components/Darkmode'
import LightMode from '../components/LightMode'
class Todo extends Component {
    constructor(props) {
        super(props);
        
        const storageItems = JSON.parse(localStorage.getItem("todos")).todos // ? First Check Items in LocalStorage
        const storageSound = JSON.parse(localStorage.getItem("todos")).sound

        this.state = {
            todos: storageItems ? storageItems : [],
            show: 'all',
            darkMode: true,
            sound: storageSound
        };
    }


    // ? SAVE STATE TO LOCAL STORAGE
    updateLocalStorage = () => {
        let appState = JSON.stringify(this.state) 
        localStorage.setItem('todos', appState) // ? Save State to LocalStorage
    }

    // ? ON CREATE TODO
    handleCreateTodo = (todoId, todoVal) => {
        let todoObj = {}; // ? Create Todo Object

        if (todoId && todoVal) {
            todoObj = { todoId, todoVal, active: true };

            this.setState({
                todos: [ todoObj, ...this.state.todos ]
            },
            () => this.updateLocalStorage()
            );
        }
    };

    // ? HANDLE EDIT TODO
    handleEditTodo = (editedTodoId, editedVal) => {
        let todoObj = {}; // ? Create Todo Object

        let currTodos = this.state.todos;
        let updateTodoIndex = currTodos.findIndex(
            (todo) => todo.todoId === editedTodoId
        ); // ? Find index of todo from state to update
        todoObj = { todoId: editedTodoId, todoVal: editedVal, active: true };

        updateTodoIndex !== -1 &&
            (currTodos[updateTodoIndex] = todoObj); // ? Update todo at that index

        // ? Set State with Updated Todos
        this.setState({
            todos: currTodos,
        },
        () => this.updateLocalStorage()
        );
    };


    // ? HANDLE DELETE TODO
    handleDeleteTodo = (deletedTodoId) => {
        let currTodos = this.state.todos;
        let deleteTodoIndex = currTodos.findIndex(
            (todo) => todo.todoId === deletedTodoId
        ); // ? Find index of todo from state to delete

        currTodos.splice(deleteTodoIndex,1)
        
        this.setState({
            todos: currTodos
        },
        () => this.updateLocalStorage()
        )
    }


    // ? CLEAR ALL TODOS    
    clearCompletedTodos = () => {
        let confirmClear = window.confirm("Are you sure to clear all Completed Todos ?");

        if(confirmClear){

            const currTodos = this.state.todos;
            const activeTodos =  currTodos.filter( todo => todo.active )

            this.setState({
                todos: activeTodos
            },
            () => this.updateLocalStorage()
            )
        }
    }
    

    // ? ON Change Status from Footer
    changeStatus = (status,e) => {
        this.setState({
            show: status
        })
    }


    // ? MARK ALL TODOS DONE ON CHECK
    markTodoDone = (markTodoId) => {
        let currTodos = this.state.todos;
        let markTodoIndex = currTodos.findIndex(
            (todo) => todo.todoId === markTodoId
        ); // ? Find index of todo from state to delete

        currTodos[markTodoIndex].active = !currTodos[markTodoIndex].active
        this.setState({
            todos: currTodos
        },
        () => this.updateLocalStorage()
        )
    }


    // ? ON TOGGLE MODE
    toggleMode = (modeStatus,e) => {
        e.target.closest('.toggle_icon').classList.toggle('light_mode');
        let dark = true;
        
        if(modeStatus === 'setDark'){
            dark = true;
        }else{
            dark = false;
        }

        this.setState({
            darkMode : dark
        },
        () => {
            this.updateLocalStorage();
            document.body.classList.toggle('light_mode');
        } 
        )
    }


    // ? TOGGLE SOUND MODE
    toggleSound = (e) => {
        e.target.closest('.toggle_icon').classList.toggle('mute');
        this.setState({
            sound : !this.state.sound
        },
        () => {
            this.updateLocalStorage();
            document.body.classList.toggle('mute');
        } 
        )
    }

    render() {
        const todoList = this.state.todos;
        const currShowStatus = this.state.show;
        const isSoundActive = this.state.sound;

        let activeCount;
        let completedCount;

        if(todoList.length > 0){
            activeCount = todoList.filter(todo => todo.active ).length
            completedCount = todoList.filter(todo => !todo.active ).length
        }

        return (
            <>
                <div className="header">
                    <h3 className="title">TODO</h3>

                    <span className="toggle_icon">
                        
                        <Mute soundState={isSoundActive} setMute={(e) => this.toggleSound(e)} />
                        
                        <Unmute soundState={isSoundActive} setMute={(e) => this.toggleSound(e)}/>
                        
                        <Darkmode soundState={isSoundActive} setMode={(modeStatus,e) => this.toggleMode(modeStatus,e)}/>

                        <LightMode soundState={isSoundActive} setMode={(modeStatus,e) => this.toggleMode(modeStatus,e)}/>

                    </span>
                </div>

                <div className="todo_body">
                    <form>
                        <div className="create_todo">
                            <TodoItem
                                soundState={isSoundActive}
                                isCreating={true}
                                handleTodo={(todoId, todoVal) =>
                                    this.handleCreateTodo(todoId, todoVal)
                                }
                            />
                        </div>
                        {
                            todoList.length > 0 ? (
                                <div className={`todo_list show_${currShowStatus}`}>
                                    <ReactSortable
                                        className='list'
                                        list={todoList}
                                        tag="div"
                                        setList={(todoList) => undefined}
                                    >
                                        
                                        {todoList.map((todo) => (
                                            <TodoItem
                                                soundState={isSoundActive}
                                                isCreating={false}
                                                todoItemId={todo.todoId}
                                                todoValue={todo.todoVal}
                                                todoTotal={todoList.length}
                                                todoEdit={(
                                                    editedTodoId,
                                                    editedVal
                                                ) =>
                                                    this.handleEditTodo(
                                                        editedTodoId,
                                                        editedVal
                                                    )
                                                }
                                                todoDelete={(deletedTodoId) =>
                                                    this.handleDeleteTodo(
                                                        deletedTodoId
                                                    )
                                                }
                                                todoStatus={todo.active}
                                                todoMarkDone={(markTodoId) =>
                                                    this.markTodoDone(markTodoId)
                                                }
                                                key={todo.todoId}
                                            />
                                        ))}
                                    
                                    </ReactSortable>

                                    <div className={`no_active_todo text-center ${activeCount === 0 ? "show" : ""}`}>
                                        <p>No active todo...</p>
                                    </div>

                                    <div className={`no_completed_todo text-center ${completedCount === 0 ? "show" : ""}`}>
                                        <p>No todo finished...</p>
                                    </div>
                                    

                                    <div className="list_stats">
                                        <div className="count_txt">
                                            <span className="count">
                                                {todoList.length}
                                            </span>
                                            <span className="txt">Items Left</span>
                                        </div>

                                        <div className="status xs-hide">
                                            <span
                                                id="all"
                                                className={`${
                                                    currShowStatus === "all"
                                                        ? "active"
                                                        : ""
                                                }`}
                                                onClick={(e) =>
                                                    this.changeStatus("all", e)
                                                }
                                            >
                                                All{" "}
                                            </span>
                                            <span
                                                id="active"
                                                className={`${
                                                    currShowStatus === "active"
                                                        ? "active"
                                                        : ""
                                                }`}
                                                onClick={(e) =>
                                                    this.changeStatus("active", e)
                                                }
                                            >
                                                Active{" "}
                                                <span className="count">
                                                    ({activeCount})
                                                </span>
                                            </span>
                                            <span
                                                id="completed"
                                                className={`${
                                                    currShowStatus === "completed"
                                                        ? "active"
                                                        : ""
                                                }`}
                                                onClick={(e) =>
                                                    this.changeStatus(
                                                        "completed",
                                                        e
                                                    )
                                                }
                                            >
                                                Completed{" "}
                                                <span className="count">
                                                    ({completedCount})
                                                </span>
                                            </span>
                                        </div>

                                        <div className="status status_xs xs-show text-center">
                                            <span
                                                id="all"
                                                className={`${
                                                    currShowStatus === "all"
                                                        ? "active"
                                                        : ""
                                                }`}
                                                onClick={(e) =>
                                                    this.changeStatus("all", e)
                                                }
                                            >
                                                All{" "}
                                            </span>
                                            <span
                                                id="active"
                                                className={`${
                                                    currShowStatus === "active"
                                                        ? "active"
                                                        : ""
                                                }`}
                                                onClick={(e) =>
                                                    this.changeStatus("active", e)
                                                }
                                            >
                                                Active{" "}
                                                <span className="count">
                                                    ({activeCount})
                                                </span>
                                            </span>
                                            <span
                                                id="completed"
                                                className={`${
                                                    currShowStatus === "completed"
                                                        ? "active"
                                                        : ""
                                                }`}
                                                onClick={(e) =>
                                                    this.changeStatus(
                                                        "completed",
                                                        e
                                                    )
                                                }
                                            >
                                                Completed{" "}
                                                <span className="count">
                                                    ({completedCount})
                                                </span>
                                            </span>
                                        </div>

                                        <div
                                            className="clear_completed"
                                            onClick={this.clearCompletedTodos}
                                        >
                                            Clear Completed
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }
                    </form>
                </div>

                <div className='todo_footer text-center'>
                    <p className='drag_txt'>Drag &amp; Drop to reorder list</p>
                </div>
            </>
        );
    }
}

export default Todo;
