const router = require("express").Router();
const db = require("./db.js");

// const _dbInstance = db.Get();
router.get("/query", async (req, res) => {
    const query = {
        name: { "$regex": req.query.name },
    };
    try {
        const result = await db.Query(query);
        res.status(200);
        res.send(JSON.stringify(result,null,2) + "\r\n");
    }
    catch (e) {
        res.status(400);
        console.error(e);
        res.send(e + "\r\n");
    }
});

router.post("/insert", async (req, res) => {
    const docs = [
        {
            name: req.headers.name,
            password: req.headers.password
        }
    ];

    try {
        const result = await db.Insert(docs);
        res.status(200);
        res.send(JSON.stringify(result,null,2) + "\r\n");
    } catch (e) {
        res.status(400);
        console.error(e);
        res.send(e + "\r\n");
    }
});

module.exports = router;
