const express = require('express');
const { authMiddleware } = require('../authentication');
const { Task } = require('../models/todo');
const router = express.Router();
const zod = require('zod');



router.get('/getid' , authMiddleware , (req , res) =>{
    res.json(req.userId);
})

//-----------------------------gettodos---------------------------------------

router.get('/gettodo' , authMiddleware , async(req , res)=>{

    const tasks = await Task.find({
        userId : req.userId
    })

    res.json({tasks})
})

//----------------------------addtodos------------̉----------------------------

const zodCheckTodo = zod.object({
    task : zod.string(),
    description : zod.string(),
    isCompleted : zod.boolean(),
    delete : zod.boolean()
})

router.post('/addtodo' , authMiddleware ,async (req ,res ) =>{
    const {success , error } = zodCheckTodo.safeParse(req.body);
    console.log("after auth")
    if(!success){
        return res.status(401).json({mssg : "invalid input types /invalid inputs" , error})
    }
    console.log(" auth")

    const checkTodo = await Task.findOne({
        userId : req.userId,
        task : req.body.task,
        description : req.body.description
    })

    if(checkTodo){
        return res.status(404).json({mssg : "todo already exists "})
    }

    const newtodo = await Task.create({
        userId : req.userId ,
        task : req.body.task,
        description : req.body.description,
        isCompleted : req.body.isCompleted,
        delete : false
    })
})

//----------------------------updatetodo------------̉----------------------------

/*if we update the todo directly then the whole todos of a particular user is going to be updated to overcome this we need first find the _id of a particular task 
1 . find the _id of a specific task by taking the task,description from the frontend display 
2 . then using this _id we can update a specifi tak of a specific user with altering the other task of the same user 
*/

const zodupdateCheck =zod.object({
    prevTask : zod.string(),
    prevDescription : zod.string(),
    task : zod.string(),
    description : zod.string()
})

router.put('/updatetodo' , authMiddleware , async (req ,res ) =>{
    const { success , error } = zodupdateCheck.safeParse(req.body);

    if(!success){
        return res.status(401).json({mssg : "error in the input types / invalid inputs" , error})
    }

    const checkTodo = await Task.findOne({
        userId : req.userId,
        task : req.body.prevTask,
        description : req.body.prevDescription
    })

    checkTodo.task = req.body.task;
    checkTodo.description = req.body.description
    await checkTodo.save();

    res.json("updated successfully ")
    
})


//------------------------delete todo--------------------------

const zodCheckDelete = zod.object({
    
    task : zod.string(),
    description : zod.string()
})

router.put('/delete' , authMiddleware , async (req , res) =>{

    const { success } = zodCheckDelete.safeParse(req.body);
    
    if(!success){
        return res.status(401).json({mssg : "error in the input types / invalid inputs" , error})
    }

    try {
        const deleteTodo = await Task.findOne({
            userId : req.userId,
            task : req.body.task,
            description : req.body.description
        })

        deleteTodo.delete = true;
        await deleteTodo.save()

        res.json("deleted successfully")
    } catch (error) {
        console.log(error)
        res.json({mssg : error})
    }
    

})

//-------------------completed--------------------------
const zodCheckCompleted = zod.object({
    task : zod.string(),
    description : zod.string()
})
 
router.put("/completed" , authMiddleware , async (req , res ) =>{
    const {success} = zodCheckCompleted.safeParse(req.body);

    if(!success){
        return res.status(401).json({mssg : "error in the input types / invalid inputs" , error})
    }

    try {
        const completed = await Task.findOne({
            userId : req.userId,
            task : req.body.task,
            description : req.body.description
        })

        completed.isCompleted = true;
        await completed.save();
        return res.json({ mssg : "marked as completed successfully "})

    } catch (error) {
        return res.send(error)
    }
})

//---------------------unfinished-------------------------

const zodCheckUnFinished = zod.object({
    task : zod.string(),
    description : zod.string()
})
 
router.put("/unfinished" , authMiddleware , async (req , res ) =>{
    const {success} = zodCheckUnFinished.safeParse(req.body);

    if(!success){
        return res.status(401).json({mssg : "error in the input types / invalid inputs" , error})
    }

    try {
        const completed = await Task.findOne({
            userId : req.userId,
            task : req.body.task,
            description : req.body.description
        })

        completed.isCompleted = false;
        await completed.save();
        return res.json({ mssg : "marked as unfinshed successfully "})

    } catch (error) {
        return res.send(error)
    }
})

module.exports = router;