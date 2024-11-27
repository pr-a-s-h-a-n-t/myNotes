import React from 'react'
import './App.css'
import {CssBaseline} from "@mui/material";
import TodoManagement from "./components/TodoManagement.tsx";

function App() {
    return (
        <React.Fragment>
            <CssBaseline/>
            <TodoManagement/>
        </React.Fragment>
    )
}

export default App
