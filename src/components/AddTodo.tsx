import React, {memo, useCallback, useState} from 'react';
import {TextField, Button, Box} from '@mui/material';
import {Todo} from './types.ts';
import {v4 as uuidv4} from 'uuid';

interface AddTaskProps {
    addTodo: (task: Todo) => void;
}

const AddTodo: React.FC<AddTaskProps> = ({addTodo}) => {
    const [taskName, setTaskName] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = useCallback((): void => {
        if (taskName.trim()) {
            const id = uuidv4();
            addTodo({id: id, todo: taskName, isCompleted: false});
            setTaskName('');
            setError('');
        } else {
            setError('Todo name cannot be empty.');
        }
    }, [addTodo, taskName]);

    const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }, [handleSubmit]);

    const handleTodo = useCallback((val: string) => {
        setTaskName(val);
    }, [])

    return (
        <Box sx={{display: 'flex', gap: 2, marginBottom: 2}}>
            <TextField
                label="New Todo"
                variant="outlined"
                fullWidth
                value={taskName}
                onChange={(e) => handleTodo(e.target.value)}
                onKeyPress={handleKeyPress}
                error={!!error}
                helperText={error}
                className={`textField ${error ? 'textField-error' : ''}`}
                InputLabelProps={{
                    className: '.textField-label'
                }}
            />
            <Button
                className="button"
                variant="contained"
                onClick={handleSubmit}
            >
                Add
            </Button>
        </Box>
    );
};

export default memo(AddTodo);
