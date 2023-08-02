const express = require('express');
let users = require('./config/Users');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
  res.send("HomePage");
})

// For getting all the users
app.get('/users',(req,res)=>{
    // console.log(Users);
    res.status(200).json({sucsess:true , data : users});
})

// For posting a new user
app.post('/user',(req,res)=>{
    const { name,email,password }= req.body;
    const newUser = {name,email,password };
    if(!name && !email , !password){
        res.status(400).json({sucsess:false,msg:'please provide credantial properly'});
    }
    else{
        users.push(newUser);
        res.status(201).json({sucsess:true,data:[...users,newUser]})
    }
})

//  for updating a current user by id
app.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const { name, password } = req.body;

  const user = users.find((user) => user.id === parseInt(id));

  if (!user) {
    res
      .status(404)
      .json({ sucsess: false, msg: `no user found with this id ${id}` });
  } else {
    let updatedUser = {}
    updatedUser.name = name;
    updatedUser.password = password;
    users[id] = {...users[id],...updatedUser}; 
    res.status(200).json({ success: true, data: users });
  }
});


//  for deleting a user by id
 app.delete('/user/:id', (req, res) => {
  const {id} = req.params;
  const user = users.find((user) => user.id === Number(id));

  if (!user) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` })
  }
  users = users.filter(
    (user) => user.id !== Number(id)
  )
  return res.status(200).json({ success: true, data: users })
})




app.all('*',(req,res)=>{
    res.send("sorry!! page does not found!!");
})

app.listen(3000,()=>{
    console.log("app is listening to port 3000..");
})