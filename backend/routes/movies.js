const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../data/movies.json");

function read() {
    if (!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file, "utf8"));
}

function write(d) {
    fs.writeFileSync(file, JSON.stringify(d, null, 2));
}

router.get("/", (req, res) => res.json(read()));
router.post("/", (req, res) => {
    let d = read();
    d.push({ id: Date.now(), ...req.body });
    write(d);
    res.json({ success: true });
});
router.delete("/:id", (req, res) => {
    let d = read();
    write(d.filter(x => x.id != req.params.id));
    res.json({ success: true });
});
router.put("/:id", (req, res) => {
    let d = read();
    const i = d.findIndex(x => x.id == req.params.id);
    d[i] = { ...d[i], ...req.body };
    write(d);
    res.json({ success: true });
});

module.exports = router;