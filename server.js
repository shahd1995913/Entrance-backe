'use strict'


const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const server = express();

server.use(cors());

server.use(express.json());

const mongoose = require('mongoose');
const e = require('express');

const PORT = process.env.PORT || 4041;

mongoose.connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const MySchema = new mongoose.Schema({

    email: String,
    name: String,
    image: String,
    price: String

});
const MyModel = mongoose.model('frout', MySchema);

server.get('/', testHandler)
function testHandler(req, res) {
    console.log('Shahd say Hi , From Terminal');

    res.send('Shahd say Hi , From Browser');
}



server.get('/Fruit', FruitHandler)

function FruitHandler(req, res) {
    let url = "https://fruit-api-301.herokuapp.com/getFruit";
    axios.get(url).then(r =>
         {

        let froutarray = r.data.fruits.map((x => {

            return new Fruit(x)

        }))
    

res.send(froutarray)
         })


    class Fruit {
        constructor(data) {
            this.name = data.name,
                this.image = data.image,
                this.price = data.price }}}

    



server.post('/addToFav',addToFavHandler);

function addToFavHandler(req,res){

const{email,name,price,image}=req.body;

console.log(req.body);
// const email=req.query.email;
const newmodel = new MyModel({
name:name,
image:image,
email:email,
price:price

})

newmodel.save();

}



server.delete('delete/:id/:email',deleteHandler)

function deleteHandler(req,res)
{

const id=req.params.id;
const email = req.params.email;
MyModel.remove({_id:id, email:email},(error,data)=>{


MyModel.find({email:email},(error,data2)=>{

res.send(data2);


})


})


}


server.put('/update/:id',updateHandler)

function updateHandler(req,res){

const{email,price,name,image}=req.body;

const id= req.params.id;

MyModel.findOne({_id:id},(error , updateData)=>{

    updateData.email=email,
    updateData.name=name,
    updateData.image=image,
    updateData.price=price

    updateData.save().then(()=>{

MyModel.find({email:email},(erroe,data3)=>{
res.send(data3);

})


    })



})




}


server.get('/getFavData',getFavDataFun)

function getFavDataFun(req,res)
{
const email = req.params.email;
console.log(req.params);
MyModel.find({email:email},(error , data)=>{


res.send(data);


})






}



server.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))





