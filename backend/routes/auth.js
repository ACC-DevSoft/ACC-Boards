const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Role = require("../models/role");

router.post("/login", async (req, res) => {
  if(!req.body.email || !req.body.password) return res.status(400).send("Incomplete data.");

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Incorrect email or password");

  const hash = await bcrypt.compare(req.body.password, user.password);
  if (!user.status || !hash)
    return res.status(400).send("Incorrect email or password");
  try {
    const jwtToken = user.generateJWT();
    const { name } = await Role.findById('60d0bc7657fa52478c80d682');
    const role = (name === "ADMIN") ? true : false;
    userSend = {
      workSpacesId: user.workSpacesId, 
      id: user._id,  
      assignedTaskId:user.assignedTaskId,
      name:user.name,
      userName:user.userName,
      email:user.email,
      status:user.status,
    }
    return res.status(200).send({ token:jwtToken, user:userSend, role:role});
  } catch (e) {
    return res.status(400).send("Login error");
  }
});

router.get('/userdata/:id?', async (req, res) => {
  if(!req.params.id) return res.status(400).send("Incomplete Data")
  const user = await User.find({_id:req.params.id})
  if(!user) return res.status(400).send("User not found")
  userSend = {
    workSpacesId: user[0].workSpacesId, 
    id: user[0]._id,  
    assignedTaskId:user[0].assignedTaskId,
    name:user[0].name,
    userName:user[0].userName,
    email:user[0].email,
    status:user[0].status,
  }
  res.status(200).send(userSend) 
})

module.exports = router;