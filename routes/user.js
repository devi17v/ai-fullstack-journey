const express = require('express')
const router = express.Router()

let users = [
    {id:1, name:"John", createdAt:new Date()},
    {id:2, name:"Kenady", createdAt:new Date()},
    {id:3, name:"Thomas", createdAt:new Date()}
]
// get all posts
router.get('/', (req,res)=>{
    const limit = parseInt(req.query.limit)
    if(!isNaN(limit) && limit>0){
       return res.status(200).json(users.slice(0,limit))
    } 
    res.status(200).json(users)
})
//get single post
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});
//create new post
router.post('/', (req, res) => {
    const { name }= req.body
    if (!name || name.length < 3) {
        return res.status(400).json({ 
         message: "Name must be at least 3 characters" 
        });
    }
    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name,
        createdAt:new Date()
    }
    users.push(newUser)
    res.status(201).json(newUser)
})
//update post
router.put('/:id', (req,res)=>{
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    const user = users.find((user)=>user.id===id)
    if(!user){
        return res.status(404).json({msg:`user with ID not ${id} found`})
    }
     const { name } = req.body;
    if (!name || name.length < 3) {
        return res.status(400).json({ 
            message: "Name must be at least 3 characters" 
        });
    } 
    user.name = name
    res.status(200).json(user); 
})
// PATCH update only name
router.patch('/:id', (req,res)=>{
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ msg:`User with ID ${id} not found` });
  }
  const { name } = req.body;
  if (!name || name.length < 3) {
    return res.status(400).json({ 
      message: "Name must be at least 3 characters" 
    });
  }
user.name = name;
res.json(user);
});
//Delete post
router.delete('/:id', (req,res)=>{
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    const user = users.find((user)=>user.id===id)
    if(!user){
        return res.status(404).json({msg:`User with ID ${id} not found`})
    }
    users = users.filter((user)=>user.id !== id)
     res.status(200).json({msg:'User profile deleted successfully'})

})

module.exports = router