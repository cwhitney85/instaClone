const router = require("express").Router()

//GET request
router.get('/test',(req, res) => {
    res.send("Hello, it's working")
})
//POST request
router.post("/register", async (req, res) => {
    try {
    const{email, password, passwordCheck, displayName} = req.body

    //validation
    if (!email || !password || !passwordCheck)
        return res
            .status(400)
            .json({msg: "Not all feild have been entered "})

    if(password.length < 5)
        return res
            .status(400)
            .json({msg: "the password needs to be atleast 5 charachters long "})
    if (password !== passwordCheck)
        return res
            .status(400)
            .json({msg: "Enter the same password twice"})



                    
    }
    catch(err) {
        res.status(500).json(err)
    }
})


module.exports = router