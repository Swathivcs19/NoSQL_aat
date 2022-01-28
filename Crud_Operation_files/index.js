var express=require('express');
var app=express();
var mongoose=require('mongoose');
var Employee=require('./models/index.js');
var bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/crud",{useUnifiedTopology: true, useNewUrlParser: true});

var connection=mongoose.connection;

connection.once('open',function(){
    console.log("connected successfully..");
});

app.set('view engine','ejs');

app.get('/',function(req,res)
{
    res.render('insert');
});

app.post('/insert',function(req,res){

    var employee=new Employee({
        name:req.body.name,
        address:req.body.address,
        email:req.body.email,
        designation:req.body.designation
    })

    employee.save(()=>{
        res.send("<h1 text align='center'>Employee details entered Successfully!</h1>");
    })
});

app.get('/show',function(req,res){

    Employee.find({},function(err,result){
        res.render('show',{employers:result});
    })
})

app.get('/delete/:id', async function(req,res){
    await Employee.findByIdAndDelete(req.params.id);
    res.redirect('/show');
});

app.get('/edit/:id',function(req,res){
    Employee.findById(req.params.id,function(err,result){
        res.render('edit',{employers:result});
    })
});

app.post('/update/:id',async function(req,res){
    await Employee.findByIdAndUpdate(req.params.id,req.body);
    res.redirect('/show');
});

var server=app.listen(4000,function(){
    console.log("Go to port number 4000")
});


