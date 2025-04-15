import {data} from "react-router-dom";


export async function fetchData(path, method) {
    const token = localStorage.getItem("jwt");
    if (!token) {
        console.error("No JWT found in localStorage. User might not be logged in.")
        return;
    }

    if (method === "GET") {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}${path}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(
                    `HTTP error! status: ${response.status}, message: ${await response.text()}`);
            }

            const data = await response.json();
            console.log(data);

            return data;

        } catch (error) {
            console.error("Error:", error);
            return;
        }
    }

    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}${path}`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, message: ${await response.text()}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error:", error);

    }
}