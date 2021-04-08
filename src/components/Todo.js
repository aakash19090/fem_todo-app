import React, { Component } from "react";
import TodoItem from "../components/TodoItem";

class Todo extends Component {
    constructor(props) {
        super(props);
        
        const storageItems = JSON.parse(localStorage.getItem("todos")) // ? Check Items in LocalStorage

        this.state = {
            todos: storageItems ? storageItems : [],
            show: 'all'
        };
    }

    handleCreateTodo = (todoId, todoVal) => {
        let todoObj = {}; // ? Create Todo Object

        if (todoId && todoVal) {
            todoObj = { todoId, todoVal, active: true };

            this.setState({
                todos: [ todoObj, ...this.state.todos ]
            },
            () => {
                let todoString = JSON.stringify(this.state.todos) // ? Save Items to LocalStorage
                localStorage.setItem('todos', todoString)
            } 
            );
        }
    };

    // ? Handle Todo Edit
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
        () => {
            let todoString = JSON.stringify(this.state.todos) // ? Save Items to LocalStorage
            localStorage.setItem('todos', todoString)
        }
        );
    };


    // ? Handle Todo Delete
    handleDeleteTodo = (deletedTodoId) => {
        let currTodos = this.state.todos;
        let deleteTodoIndex = currTodos.findIndex(
            (todo) => todo.todoId === deletedTodoId
        ); // ? Find index of todo from state to delete

        currTodos.splice(deleteTodoIndex,1)
        
        this.setState({
            todos: currTodos
        },
        () => {
            let todoString = JSON.stringify(this.state.todos) // ? Save Items to LocalStorage
            localStorage.setItem('todos', todoString)
        }
        )
    }


    // ? Clear All Todos
    clearTodos = () => {
        let confirmClear = window.confirm("Are you sure to clear all Todos ?");

        if(confirmClear){
            this.setState({
                todos: []
            },
            () => localStorage.removeItem('todos')
            )
        }
    }
    

    // ? ON Change Status from Footer
    changeStatus = (status,e) => {
        this.setState({
            show: status
        })
    }


    // ? Mark Todo Done on Check
    markTodoDone = (markTodoId) => {
        let currTodos = this.state.todos;
        let markTodoIndex = currTodos.findIndex(
            (todo) => todo.todoId === markTodoId
        ); // ? Find index of todo from state to delete

        currTodos[markTodoIndex].active = !currTodos[markTodoIndex].active
        this.setState({
            todos: currTodos
        },
        () => {
            let todoString = JSON.stringify(this.state.todos) // ? Save Items to LocalStorage
            localStorage.setItem('todos', todoString)
        }
        )
    }


    render() {
        const todoList = this.state.todos;
        const currShowStatus = this.state.show;

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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={26}
                            height={26}
                        >
                            <path
                                fill="#FFF"
                                fillRule="evenodd"
                                d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
                            />
                        </svg>
                    </span>
                </div>

                <div className="todo_body">
                    <form>
                        <div className="create_todo">
                            <TodoItem
                                isCreating={true}
                                handleTodo={(todoId, todoVal) =>
                                    this.handleCreateTodo(todoId, todoVal)
                                }
                            />
                        </div>
                        {
                            todoList.length > 0 ? (
                                <div className="todo_list">
                                    <div className={`list show_${currShowStatus}`}>
                                        {
                                            todoList.map((todo) => (
                                                <TodoItem
                                                    isCreating={false}
                                                    todoItemId={todo.todoId}
                                                    todoValue={todo.todoVal}
                                                    todoTotal={todoList.length}
                                                    todoEdit={(editedTodoId, editedVal) => this.handleEditTodo(editedTodoId,editedVal)}
                                                    todoDelete={(deletedTodoId) => this.handleDeleteTodo(deletedTodoId)}
                                                    todoStatus={todo.active}
                                                    todoMarkDone={ (markTodoId) => this.markTodoDone(markTodoId) }
                                                    key={todo.todoId}
                                                />
                                            ))
                                        }

                                        <div className={`no_active_todo text-center ${activeCount == 0 ? 'show': ''}`}>
                                            <p>No active todo...</p>
                                        </div>

                                        <div className={`no_completed_todo text-center ${completedCount == 0 ? 'show': ''}`}>
                                            <p>No todo finished...</p>
                                        </div>
                                        
                                    </div>

                                    <div className="list_stats">
                                        <div className="count_txt">
                                            <span className="count">
                                                {todoList.length}
                                            </span>
                                            <span className="txt">Items Left</span>
                                        </div>

                                        <div className="status xs-hide">
                                            <span id="all" className={`${currShowStatus === 'all' ? 'active' : ''}`} onClick={ (e) => this.changeStatus('all',e)}>All </span>
                                            <span id="active" className={`${currShowStatus === 'active' ? 'active' : ''}`} onClick={ (e) => this.changeStatus('active',e)}>Active <span className='count' >({activeCount})</span></span>
                                            <span id="completed" className={`${currShowStatus === 'completed' ? 'active' : ''}`} onClick={ (e) => this.changeStatus('completed',e)}>Completed <span className='count' >({completedCount})</span></span>
                                        </div>

                                        <div className="status status_xs xs-show text-center">
                                            <span id="all" className={`${currShowStatus === 'all' ? 'active' : ''}`} onClick={ (e) => this.changeStatus('all',e)}>All </span>
                                            <span id="active" className={`${currShowStatus === 'active' ? 'active' : ''}`} onClick={ (e) => this.changeStatus('active',e)}>Active <span className='count' >({activeCount})</span></span>
                                            <span id="completed" className={`${currShowStatus === 'completed' ? 'active' : ''}`} onClick={ (e) => this.changeStatus('completed',e)}>Completed <span className='count' >({completedCount})</span></span>
                                        </div>

                                        <div className="clear_completed" onClick={this.clearTodos}>
                                            Clear Completed
                                        </div>
                                    </div>

                                    
                                </div>

                            ) : null
                        }
                    </form>
                </div>
            </>
        );
    }
}

export default Todo;
