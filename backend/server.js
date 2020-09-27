import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

}).catch(error => console.log(error.reason));

const app = express();
app.use( function (req, res,next){
    var whitelist = ['localhost: 4000', 'localhost: 3000', 'anydomain.com']
    var host = req.get('host');

    whitelist.forEach(function(val,key){
        if (host.indexOf(val)> -1){
            res.setHeader('Access-Control-Allow-Origin', host);
        }
    })
    next();
});

app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);


//app.get("/api/products/:id", (req, res) => {
 //   const productId = req.params.id;
 //   const product = data.products.find(x => x._id === productId);
 //   if (product)
 //   res.send(product);
 //   else
 //   res.status(404).send({ msg: " Product Not Found."})

//});


//app.get("/api/products", (req, res) => {
//    res.send(data.products);

//});

app.listen(5000, () =>{ console.log("Server Started at http://localhost:5000")

});