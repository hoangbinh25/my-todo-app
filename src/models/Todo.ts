import { Schema, model, Document } from 'mongoose';

// Init interface cho Todo Document
export interface IToDo extends Document {
    title: string;
    description?: string;
    completed: boolean;
    createAt: Date;
    updateAt: Date;
}

// Create Schema 
const TodoSchema = new Schema<IToDo> ({
    title: {type: String, required: true},
    description: {type: String},
    completed: {type: Boolean, default: false},
}, {
    timestamps: true,
})

const Todo = model<IToDo>('Todo', TodoSchema);

export default Todo;
