const { log } = require("console");
const express=require("express");
const path=require("path");
const app=express();
const {v4:uuidv4}=require("uuid");
const methodOverride=require("method-override")
const Port=5000;
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

let posts=[
    {
        id:uuidv4(),
        name:"vamshi",
        content:"Hello Happy coding Cool"
    },
    {
        id:uuidv4(),
        name:"krishna",
        content:"Hare krishna be happy"
    },
    {
        id:uuidv4(),
        name:"dhoni",
        content:"Hello Captain Cool here"
    },
    {
        id:uuidv4(),
        name:"mahesh",
        content:"Hello Happy acting Cool"
    }
    
]

app.get("/posts",(req,res)=>{
res.render("index",{posts})
})
app.get("/",(req,res)=>{
res.render("home.ejs");
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})
app.post("/posts",(req,res)=>{
    let {name,content}=req.body;
    let id=uuidv4();
    posts.push({id,name,content});
    res.redirect("/posts")
    console.log(posts);

});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>{
        return p.id===id;
    });
   res.render("show",{post});
})

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>{
        return p.id===id;
    });
    post.content=newContent;
    
    res.redirect("/posts")
    
});
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;  
    let post = posts.find((p) => p.id === id);
    res.render("edit", { post });
   
});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    console.log(id);
    posts = posts.filter((p) => p.id !== id);
    console.log(posts);
    res.redirect("/posts")
})

app.listen(Port,()=>{
    console.log("server is listening at 5000 Port");
})