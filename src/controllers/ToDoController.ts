import { Request, Response } from "express";
import Todo  from "../models/Todo";

export const getToDos = async(req: Request, res: Response) => {
        try {
            const todos = await Todo.find();
            res.render('todos', {todos});
        } catch (error: any) {
            console.error(`Get all todo failed: ${error.message}`)
            res.status(500).json({message: error.message})
        }
}

export const getToDoById = async(req: Request, res: Response) => {
    const idTodo = req.params.id;
    try {
        const todo = await Todo.findById(idTodo);
        if(!todo) return res.status(400).json({message: 'Todo not found'}); 
        res.json(todo);   
    } catch (error: any) {
        console.error(`Get todo by id failed: ${error.message}`);
        res.status(500).json({message: error.message});
    }
}

export const createToDo = async(req: Request, res: Response) => {
    const {title, description, completed} = req.body;
    const newTodo = new Todo({ title, description, completed});
    try {
        if(title == "" || description == "") {
            console.error('Field is required');
            return;
        }
        await newTodo.save();
        res.status(200).redirect('/api/todos');

    } catch (error: any) {
        console.error(`Create a new todo failed: ${error.message}`);
        res.status(500).json({message: error.message});
    }
}

export const updateTodo = async(req: Request, res: Response) => {
    try {
        if(!req.params.id) return res.status(400).json({message: 'Id not found'})
        const update = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        res.status(200).redirect('/api/todos');

    } catch (error: any) {
        console.error(`Update todo failed: ${error.message}`);
        res.status(500).json({message: error.message});
    }
}

export const deleteTodo = async(req: Request, res: Response) => {
    try {
        const idTodo = req.params.id;
        await Todo.findByIdAndDelete(idTodo);
        if(!idTodo) return res.status(400).json({message: 'Id not found'});
        res.redirect('/api/todos');
    } catch (error: any) {
        console.error(`Delete todo failed: ${error.message}`);
        res.status(500).json({message: error.message});
    }
}

