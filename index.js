const express = require('express');

const app = express();
const PORT = 5000 ;

app.use('/',(req,res)=>{
    res.status(200).json("hello world")
})

app.listen(PORT, () => console.log(`Am running on Port ${PORT}`));
