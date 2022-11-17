const express = require("express");
const jwt = require("jsonwebtoken");

const Todo = require("../models/Todo");
const User = require("../models/User"); 

const privateKey = ``;


const router = express.Router();

// route reguest through middleware function
router.use(function (req, res, next) {
	// check for auth header
	if (req.header("Authorization")) {
		// looking for the same private key
		try {
			req.payload = jwt.verify(req.header("Authorization"), privateKey, {
				algorithms: ["RS256"],
			});
		} catch (error) {
			return res.status(401).json({ error: error.message });
		}
	} else {
		return res.status(401).json({ error: "Unauthorized" });
	}
	next();
});


// post
router.post("/", async function (req, res) {
	// create a new instance of todo model
	const todo = new Todo({
        title: req.body.title,
        content: req.body.content,
	    author: req.payload.id,
		dateCreated: req.body.dateCreated,
		isComplete: req.body.isComplete
});
	return todo
		.save()
		.then((savedTodo) => {
			return res.status(201).json({
				_id: savedTodo._id,
                title: savedTodo.title,
                content: savedTodo.content,
                author: savedTodo.author,
				dateCreated: savedTodo.dateCreated,
				isComplete: savedTodo.isComplete
			});
		})
.catch((error) => {
	return res.status(500).json({ error: "something's wrong..." });
});
});

// get
router.get("/", async function (req, res, next) {
    const todos = await Todo.find().where("author").equals(req.payload.id).exec();
	// console.log(todos)
    return res.status(200).json({ todos: todos });
    });

router.get("/:id", async function (req, res, next) {
	const todo = await Todo.findOne().where("_id").equals(req.params.id).exec();
	// console.log(todo)
		return res.status(200).json(todo);
	  });

// add delete route handler
// looking for the todo with the same id
router.delete("/delete/:id", async function(req, res, next){
	// deletes todo
	const todo = await Todo.findOneAndDelete().where("_id").equals(req.params.id).exec();
	if(todo){
		return res.status(200).json(todo);
	}
	else{
		return res.status(404).json({error: "Couldn't delete To-Do. "});}
});


// add put for toggle todo
router.put("/update/:id", async function(req, res){
	// look for todo by id
	const todo = await Todo.findByIdAndUpdate().where("_id").equals(req.params.id).exec();
	// update isComplete and dateCompleted
	if(todo){
		todo.isComplete = req.body.isComplete,
		todo.dateCompleted = req.body.dateCompleted
		todo.save(); // need to save the changes
		return res.status(200).json(todo);
	}
	else{
		return res.status(409).json({error: "Couldn't update To-Do."});
	}	
});

// export
module.exports = router;