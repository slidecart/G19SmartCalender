{/*Function for HTTP requests. Usage const data = await fetchData(path, method, options);
* path = endpoint path after /api/ as "String"
* method = request method as "string"
* options = blank string for GET "" or the data being sent for POST/PUT
* */}

const API_BASE = process.env.REACT_APP_BACKEND_URL;

async function makeRequest(path, method, body, token) {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const url = `${API_BASE}${cleanPath}`;
    console.log("Access token:", localStorage.getItem("accessToken"));


    const headers = {
        "Content-Type": method === "POST" && typeof body === "string"
            ? "text/plain"
            : "application/json"
    };

    if (token) headers.Authorization = `Bearer ${token}`;

    const opts = { method, headers };
    if (body && method !== "GET") {
        opts.body = JSON.stringify(body);
    }

    return fetch(url, opts);
}

export async function fetchData(path, method = "GET", body = null, isPublic = false) {
    let accessToken = isPublic ? null : localStorage.getItem("accessToken");
    const refreshToken = isPublic ? null : localStorage.getItem("refreshToken");

    if (!isPublic && !accessToken && !refreshToken) {
        console.error("No tokens in storage—user must log in.");
        window.location.href = "/login";
        return;
    }

    // 1) Try the original request
    let res = await makeRequest(path, method, body, accessToken);

    // 2) If unauthorized and not public, try refreshing the access token
    if (!isPublic && res.status === 401 && refreshToken) {
        const refreshRes = await makeRequest(
            "auth/refresh-token",
            "POST",
            { refreshToken },
            null                      // no bearer header on refresh
        );

        if (refreshRes.ok) {
            const { accessToken: newAccess, refreshToken: newRefresh } = await refreshRes.json();
            // Update storage
            localStorage.setItem("accessToken", newAccess);
            if (newRefresh) localStorage.setItem("refreshToken", newRefresh);
            accessToken = newAccess;

            // Retry the original request with the fresh token
            res = await makeRequest(path, method, body, accessToken);
        } else {
            // Refresh failed → force login
            console.error("Refresh failed, redirecting to login");
            window.location.href = "/login";
            return;
        }
    }

    // 3) Final error check
    if (!res.ok) {
        const msg = await res.text().catch(() => res.statusText);
        throw new Error(`HTTP ${res.status}: ${msg}`);
    }

    // 4) Parse JSON and return
    const text = await res.text();
    return text ? JSON.parse(text) : null;
}
