const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../data/ratings.json");

function read() {
    if (!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file, "utf8"));
}

function write(d) {
    fs.writeFileSync(file, JSON.stringify(d, null, 2));
}

// 获取某电影所有评分
router.get("/:movieId", (req, res) => {
    const r = read().filter(x => x.movieId == req.params.movieId);
    res.json(r);
});

// 提交评分（同一个人只能评一次）
router.post("/", (req, res) => {
    const { username, movieId, score } = req.body;
    let r = read();
    const idx = r.findIndex(x => x.username === username && x.movieId == movieId);
    if (idx >= 0) r[idx].score = score;
    else r.push({ username, movieId, score });
    write(r);
    res.json({ success: true });
});

module.exports = router;