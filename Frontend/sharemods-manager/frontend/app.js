const API = "http://localhost:5000/api/sharemods";

async function getAccountInfo() {
    const res = await fetch(`${API}/account`);
    const data = await res.json();

    document.getElementById("result").textContent =
        JSON.stringify(data, null, 2);
}

async function getFiles() {
    const res = await fetch(`${API}/files`);
    const data = await res.json();

    document.getElementById("result").textContent =
        JSON.stringify(data, null, 2);
}

async function createFolder() {
    const name =
        document.getElementById("folderName").value;

    const res = await fetch(`${API}/folder`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    });

    const data = await res.json();

    document.getElementById("result").textContent =
        JSON.stringify(data, null, 2);
}

async function uploadUrl() {
    const url =
        document.getElementById("fileUrl").value;

    const res = await fetch(`${API}/upload-url`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
    });

    const data = await res.json();

    document.getElementById("result").textContent =
        JSON.stringify(data, null, 2);
}
