import React, { createContext, useContext, useMemo } from "react";
import { useCategories } from "../hooks/category/useCategories";

const CategoryContext = createContext(null);

export function CategoryProvider({ children }) {
    const categoryState = useCategories();
    const value = useMemo(() => ({ ...categoryState }), [categoryState]);
    return (
        <CategoryContext.Provider value={value}>
            {children}
        </CategoryContext.Provider>
    );
}

export function useCategoryContext() {
    const ctx = useContext(CategoryContext);
    if (!ctx)
        throw new Error("useCategoryContext must be used within a CategoryProvider");
    return ctx;
}