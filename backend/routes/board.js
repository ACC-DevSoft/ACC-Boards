const express = require("express");
const router = express.Router();
const Board = require("../models/board")
const Auth = require("../middleware/auth")

router.post("/create", Auth, async (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.techleader || !req.body.workspace) {
    return res.status(400).send("Incomplete Data");
  }
  const workspace = await Workspace.findById(req.body.workspace)
  const board = new Board({
    workspace:workspace._id,
    name: req.body.name,
    description: req.body.description,
    tasks:[],
    techleader: req.body.techleader,
    status:'to-do'
  })
  try{
    const saveboard = await board.save()
    res.statu(200).send('board created')
    console.log(saveboard)
  } catch(err) {
    res.status(400).send("Error: board no create")
  }
});

module.exports = router