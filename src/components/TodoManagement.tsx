import React, {useState, useEffect, useCallback, useMemo, memo} from 'react';
import {Box, Typography, List, AppBar, Toolbar, Divider} from '@mui/material';
import AddTodo from './AddTodo';
import TodoCard from './TodoCard.tsx';
import {Todo} from './types.ts';
// @ts-ignore
import AddTodoImg from "../assets/addTodoImg.jpg";

const TodoManagement: React.FC = () => {

    // hooks
    const [todos, setTodos] = useState<Todo[]>(() => loadTodos());
    const [hasChanged, setHasChanged] = useState<boolean>(false);

    useEffect(() => {
        if (hasChanged) {
            localStorage.setItem('todos', JSON.stringify(todos));
            setHasChanged(false); // Reset the flag
        }
    }, [todos, hasChanged]);


    const activeTodos = useMemo(() => todos.filter(todo => !todo.isCompleted), [todos]);
    const completedTodos = useMemo(() => todos.filter(todo => todo.isCompleted), [todos]);

    function loadTodos(): Todo[] {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    }

    const addTodo = useCallback((newTodo: Todo) => {
        setTodos(prevTodos => [...prevTodos, newTodo]);
        setHasChanged(true);
    }, []);

    const deleteTodo = useCallback((id: string) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }, []);

    const toggleComplete = useCallback((id: string) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo
            )
        );
    }, []);


    return (
        <Box className="todo-wrapper">
            {/* AppBar */}
            <AppBar position="sticky" className="appbar">
                <Toolbar>
                    <Typography variant="h4" className="appbar-title">
                        Todo List
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box className="main-content">
                {/* Add Todo */}
                <AddTodo addTodo={addTodo}/>

                <Box className="todo-section">
                    <Typography variant="h6" className="todo-title">
                        Active Todos
                    </Typography>
                    {activeTodos.length === 0 ? (
                        <Box className="empty-state">
                            <img
                                src={AddTodoImg}
                                alt="No todos"
                                className="empty-state-img"
                            />
                            <Typography variant="body1" className="empty-state-text">
                                No active todos. Please add a new task!
                            </Typography>
                        </Box>
                    ) : (
                        <List className="todo-list">
                            {activeTodos.map((todo) => (
                                <TodoCard
                                    key={todo.id}
                                    todo={todo}
                                    deleteTodo={deleteTodo}
                                    toggleComplete={toggleComplete}
                                />
                            ))}
                        </List>
                    )}
                </Box>

                <Divider className="divider"/>

                <Box className="todo-section">
                    <Typography variant="h6" className="todo-title">
                        Completed Todos
                    </Typography>
                    {completedTodos.length === 0 ? (
                        <Box className="empty-state">
                            <img
                                src={AddTodoImg}
                                alt="Empty history"
                                className="empty-state-img"
                            />
                            <Typography variant="body1" className="empty-state-text">
                                No completed tasks yet!
                            </Typography>
                        </Box>
                    ) : (
                        <List className="todo-list">
                            {completedTodos.map((todo) => (
                                <TodoCard
                                    key={todo.id}
                                    todo={todo}
                                    deleteTodo={deleteTodo}
                                    toggleComplete={toggleComplete}
                                />
                            ))}
                        </List>
                    )}
                </Box>
            </Box>
        </Box>
    );
};
export default memo(TodoManagement);
