const router = require("express").Router();
const { User, Posts, Comments } = require("../../models");
const withAuth = require("../../utils/auth");

// GET all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Posts.findAll();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

