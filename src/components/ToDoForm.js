import {Form, Button} from 'react-bootstrap';
import React, {useState} from 'react';

function ToDoForm({addTask}) {
 const [newTask, setNewTask] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (!newTask) return;
        addTask(newTask);
        setNewTask('');

    };
    return (
 
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter Task Here</Form.Label>
                    <Form.Control type="text" placeholder="Add new task here" value ={newTask} onChange={e => setNewTask(e.target.value)} />                    
                </Form.Group>                
                <Button variant="primary" type="submit">+</Button>
            </Form>
        </div>
    );
};

export default ToDoForm;