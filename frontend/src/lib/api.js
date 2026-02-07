const API_BASE = "http://localhost:5000/api";

export async function apiFetch(path, options) {
    const res = await fetch(`${API_BASE}${path}`, {
        credentials: "include", 
        headers: {
            "Content-Type": "application/json", 
            ...options.headers, 
        }, 
        ...options, 
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Api error");
    };

    return res.json();
};
