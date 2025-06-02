// src/hooks/useTodos.js
import { useState, useEffect, useCallback } from "react";
import { fetchData } from "../FetchData";

export function useTodos() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadTasks = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchData("tasks/all", "GET");
            setTasks(data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const createTask = useCallback(
        async (payload) => {
            const newTask = await fetchData("tasks/create", "POST", payload);
            setTasks((prev) => [...prev, newTask]);
            return newTask;
        },
        []
    );

    const updateTask = useCallback(
        async (id, payload) => {
            const updated = await fetchData(`tasks/edit/${id}`, "PUT", payload);
            setTasks((prev) =>
                prev.map((t) => (t.id === updated.id ? updated : t))
            );
            return updated;
        },
        []
    );

    const deleteTask = useCallback(
        async (id) => {
            await fetchData(`tasks/delete/${id}`, "DELETE");
            setTasks((prev) => prev.filter((t) => t.id !== id));
        },
        []
    );

    const toggleComplete = useCallback(
        async (task) => {
            const updated = await fetchData(
                `tasks/${task.id}/complete`,
                "PUT",
                {}
            );
            setTasks((prev) =>
                prev.map((t) => (t.id === updated.id ? updated : t))
            );
        },
        []
    );

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    return {
        tasks,
        loading,
        error,
        loadTasks,
        createTask,
        updateTask,
        deleteTask,
        toggleComplete,
    };
}