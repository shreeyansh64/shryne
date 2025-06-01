const exp = require('express');
const app = exp();
const port = process.env.PORT || 3000;
const cors = require('cors');
const mainRouter = require('./routes/index')

app.use(exp.json());
app.use(cors());

app.use('/api/v1' , mainRouter);

app.use((err,req,res,next)=>{
    console.log(err.stack) //Optional
    res.status(500).json({
        message:"Internal server error."
    })
})

app.listen(port,()=>{
    console.log(`[+] Live `)
})

