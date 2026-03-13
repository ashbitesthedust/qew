const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const userFile = path.join(__dirname, "../data/users.json");

function read() {
    if (!fs.existsSync(userFile)) return [];
    return JSON.parse(fs.readFileSync(userFile, "utf8"));
}

function write(data) {
    fs.writeFileSync(userFile, JSON.stringify(data, null, 2));
}

// 注册
router.post("/register", (req, res) => {
    const { username, password } = req.body;
    let users = read();
    if (users.find(u => u.username === username)) {
        return res.json({ success: false, msg: "用户名已存在" });
    }
    users.push({ username, password });
    write(users);
    res.json({ success: true });
});

// 登录
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const users = read();
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ success: true, username });
    } else {
        res.json({ success: false, msg: "账号或密码错误" });
    }
});

module.exports = router;