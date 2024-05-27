const express=require("express");
const app=express();
const port=3000;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));



// for json data acess in post request 

app.use(express.urlencoded({extended:true}));



// server is online and listening for response 
app.listen(port,()=>{
    console.log(`app is listening at the port ${port}`);
})

// embedded js template usage view engine set for render html page 

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));


// making data like database and access it 

let posts=[
    {
        id:uuidv4(),
        username:"Taimour",
        content:"i just love coding"
    },
    {
        id:uuidv4(),
        username:"Sham",
        content:"I just love Business"
    },
    {
        id:uuidv4(),
        username:"Dawood",
        content:"I just Done"
    }
]

app.get("/posts",(req,res)=>{
    res.render("posts.ejs",{posts});
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let{username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    // console.log(req.body);
    res.redirect("/posts");

    // res.render("posts.ejs");
})


app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let post=posts.find((p)=> id===p.id);
    res.render("detail.ejs",{post});
})

// now patch request for updation 

app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=> id===p.id);

    // console.log(id);
    // console.log(post);
    // console.log(newContent);
    post.content=newContent;
    res.redirect("/posts")

})

app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("edit.ejs",{post});

})

// now delete response 

app.delete("/posts/:id",(req,res)=>{

    let{id}=req.params;
    posts=posts.filter((p)=> id!==p.id);
    res.redirect("/posts")

})
