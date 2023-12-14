const router = require("express").Router();
const { User, Posts, Comments } = require("../../models");
const withAuth = require("../../utils/auth"); 



router.get("/", withAuth, async (req, res) => {
    try {
        const commentData = await Comments.findAll({
            include: [{ model: User }, { model: Posts }],
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});




router.get("/:id", withAuth, async (req, res) => {
    try {
        const commentData = await Comments.findByPk(req.params.id, {
            include: [{ model: User }, { model: Posts }],
        });
        if (!commentData) {
            res.status(404).json({ message: "No comment can be found with that id!" });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});






router.post("/", withAuth, async (req, res) => {
    try {
        const commentData = await Comments.create({
            text: req.body.text,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        });
        res.status(201).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});





router.put("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comments.update(
      {
        text: req.body.text,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );
    if (!commentData) {
      req
        .status(404)
        .json({ message: "No comment can be found with that id!" });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});



router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comments.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!commentData) {
      res
        .status(404)
        .json({ message: "No comment can be found with that id!" });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;