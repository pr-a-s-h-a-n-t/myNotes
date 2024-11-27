import React, {memo} from 'react';
import {ListItem, Checkbox, IconButton, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {Todo} from "./types.ts";


interface TodoCardProps {
    todo: Todo;
    deleteTodo: (id: string) => void;
    toggleComplete: (id: string) => void;
}

const TodoCard: React.FC<TodoCardProps> = (
    {
        todo,
        deleteTodo,
        toggleComplete,
    }
) => {
    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" onClick={() => deleteTodo(todo.id)}>
                    <DeleteIcon/>
                </IconButton>
            }
        >
            <Checkbox
                checked={todo.isCompleted}
                onChange={() => toggleComplete(todo.id)}
            />
            <Typography
                variant="body1"
                sx={{textDecoration: todo.isCompleted ? 'line-through' : 'none'}}
            >
                {todo.todo}
            </Typography>
        </ListItem>
    );
}

export default memo(TodoCard);
