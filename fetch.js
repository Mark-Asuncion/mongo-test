async function query(name) {
    try {
        const s = await fetch(`http://localhost:8080/syllabus/query?name=${name}`);
        const t = await s.text();
        console.log(t);
    }
    catch (e) {
        console.error(e);
    }
}
async function insert(name, pass) {
    try {
        const headers = {
            name: name,
            password: pass
        }
        const s = await fetch("http://localhost:8080/syllabus/insert", {
            method: "POST",
            headers: headers
        });
        const t = await s.text();
        console.log(t);
    }
    catch (e) {
        console.error(e);
    }
}

module.exports = { query: query, insert: insert };
