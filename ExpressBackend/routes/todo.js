const express = require("express");
const jwt = require("jsonwebtoken");

const Todo = require("../models/Todo");

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
// add delete route handler
// add put or patch handler for toggle todo
router.post("/", async function (req, res) {
	// create a new instance of todo model
	const todo = new Todo({
        title: req.body.title,
        content: req.body.content,
	    author: req.payload.id,
});
	return todo
		.save()
		.then((savedTodo) => {
			return res.status(201).json({
				_id: savedTodo._id,
                title: savedTodo.title,
                content: savedTodo.content,
                author: savedTodo.author,
			});
		})
.catch((error) => {
	return res.status(500).json({ error: error.message });
});
});

// get
router.get("/", async function (req, res, next) {
    const todos = await Todo.find().where("author").equals(req.payload.id).exec();
    return res.status(200).json({ todos: todos });
    });
    

// export
module.exports = router;