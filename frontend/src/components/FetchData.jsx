{/*Function for HTTP requests. Usage const data = await fetchData(path, method, options);
* path = endpoint path after /api/ as "String"
* method = request method as "string"
* options = blank string for GET "" or the data being sent for POST/PUT
* */}

export async function fetchData(path, method, options) {
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
            body: JSON.stringify(options)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, message: ${await response.text()}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error:", error);

    }
}