import { useState, useEffect, useCallback } from "react";
import { fetchData } from "../FetchData";

export function useCategories() {
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const loadCategories = useCallback(async () => {
        try {
            const data = await fetchData("categories/all", "GET");
            setCategories(data || []);
        } catch (err) {
            console.error("Error fetching categories:", err.message);
            setCategories([]);
        }
    }, []);

    // load once
    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    // select all by default whenever categories change
    useEffect(() => {
        setSelectedCategories(categories.map((c) => c.id));
    }, [categories]);

    const toggleCategory = useCallback((id) => {
        setSelectedCategories((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    }, []);

    const resetFilter = useCallback(() => {
        setSelectedCategories(categories.map((c) => c.id));
    }, [categories]);

    const createCategory = useCallback(async (name, color) => {
        const payload = { name, color };
        const newCat = await fetchData("categories/create", "POST", payload);
        setCategories((prev) => [...prev, newCat]);
        setSelectedCategories((prev) => [...prev, newCat.id]);
        return newCat;
    }, []);

    return {
        categories,
        selectedCategories,
        toggleCategory,
        resetFilter,
        createCategory,
    };
}