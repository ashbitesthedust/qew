const base = "http://localhost:3000";

async function get(url) {
    const r = await fetch(base + url);
    return r.json();
}

async function post(url, data) {
    const r = await fetch(base + url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return r.json();
}

async function delApi(url) {
    const r = await fetch(base + url, { method: "DELETE" });
    return r.json();
}