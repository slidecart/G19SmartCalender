// src/context/TodoContext.js
import React, {
    createContext,
    useContext,
    useMemo,
    useState,
    useCallback
} from "react";
import { useTodos } from "../hooks/toDo/useToDos";

const TodoContext = createContext(null);

export function TodoProvider({ children }) {
    const todos = useTodos();

    const [formData, setFormData] = useState({ name: "", description: "", /*…*/ });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState("add");

    const openTodoDialog = useCallback((mode = "add", data = {}) => {
        setDialogMode(mode);
        setFormData({
            name:        data.name        || "",
            description: data.description || "",
            location:    data.location    || "",
            date:        data.date        || "",
            categoryId:  data.categoryId  || "",
            id:          data.id          || "",
            completed:   data.completed   || false,
        });
        setIsDialogOpen(true);
    }, []);

    const closeTodoDialog = useCallback(() => {
        setIsDialogOpen(false);
    }, []);

    const value = useMemo(() => ({
        ...todos,
        // Dialog controls
        formData,
        setFormData,
        isDialogOpen,
        dialogMode,
        openTodoDialog,
        closeTodoDialog
    }), [
        todos,
        formData,
        isDialogOpen,
        dialogMode,
        openTodoDialog,
        closeTodoDialog
    ]);

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
}

export function useTodoContext() {
    const ctx = useContext(TodoContext);
    if (!ctx) throw new Error("useTodoContext must be inside TodoProvider");
    return ctx;
}