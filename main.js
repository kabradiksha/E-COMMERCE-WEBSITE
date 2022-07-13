const express = require('express');
const cors = require('cors');
require('./mongoose_api');
const user = require('./user');
const product = require('./db/product');
const Jwt = require('jsonwebtoken');
const app = express();

const jwtkey = "e-comm";

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res)=>{
    let User = await new user(req.body);
    let result = await User.save();
    // from here we want to remove password
    result = result.toObject();
    delete result.password;
    Jwt.sign({result}, jwtkey, {expiresIn: "2h"}, (err, token)=>{
        if(err){
            res.send("something went wrong, please try again after some time");
        }
        res.send({result, auth:token});
    });
});

app.post('/login', async (req, res)=>{
    if(req.body.password && req.body.email){
        // it meeans password will not show on response
        let User= await user.findOne(req.body).select('-password');
        if(User){
            Jwt.sign({user}, jwtkey, {expiresIn: "2h"}, (err, token)=>{
                if(err){
                    res.send("something went wrong, please try again after some time");
                }
                res.send({User, auth:token});
            })
        }  
        else{
            res.send({result:'not found'});
        }
    }
    else{
        res.send({result:'not found'});
    }
})

app.post('/add-product', verifyToken , async (req, res)=>{
    let Product = new product(req.body);
    let result = await Product.save();
    res.send(result);
});

app.get('/products', verifyToken, async (req, res)=>{
    let Product =await product.find();
    if( Product.length>0){
        res.send(Product);
    } 
    else{
        res.send({result:'no products found'});
    }
});

app.delete('/product/:id',verifyToken ,async (req, res)=>{
    const result = await product.deleteOne({_id:req.params.id});
    res.send(result);
})

// to get single product for update
app.get('/product/:id', verifyToken, async (req, res)=>{
    let result = await product.findOne({_id:req.params.id});
    if(result){
        res.send(result);
    }
    else{
        res.send({result:'No Result'});
    }
});

app.put('/product/:id', verifyToken, async (req, res) => {
        let result = await product.updateOne(
            { _id: req.params.id },
            {
                $set: req.body
            }
        );
        res.send(result);
    });

app.get('/search/:key', verifyToken, async (req, res)=>{
    let result = await product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}}
        ]
    });
    res.send(result);
});

function verifyToken(req, res, next){
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];
        console.log('middleware called', token);
        Jwt.verify(token, jwtkey, (err, valid)=>{
            if(err){
                res.status(401).send('Please provide a valid token');
            }else{
                next();
            }
        })
    }else{
        res.status(403).send('Please add token with header');
    }
}
     


app.listen(3010);