const router = require('express').Router();

router.post('/register', (req, res) => {
  try {
  const { username, password } = req.body
  if(!username || !passowrd) {
    return res.status(400).json({message: "Username and Password are required!"})
  }

  

  }catch(e){
    console.log(e)
  }
  // implement registration
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
