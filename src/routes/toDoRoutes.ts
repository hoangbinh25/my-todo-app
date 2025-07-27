import { Router } from "express";
import { getToDos, createToDo, getToDoById, deleteTodo, updateTodo } from "../controllers/ToDoController";

const router = Router();

router.get('/', getToDos);
router.get('/:id', getToDoById);
router.post('/create', createToDo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;
