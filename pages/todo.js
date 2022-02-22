import { useState } from "react";

const Todo = () => {

    const initTasks = [
        {id: 1, name: "Read a book"},
        {id: 2, name: "Do homework"},
    ];

    const [name, setName] = useState('');
    const [tasks, setTasks] = useState(tasks);

    const add = () => {
        console.log("Add");
        setTasks([...tasks, { id: tasks[tasks.length-1].id+1 ,id, name: name }]);
    }

    return (<>
    <h1>Todo</h1>
    <input type="text" name="name" onChange={(e) => setName(e.target.value)}    />
    <button onClick={add} >Add</button> {name}
    <ul>
    {
        tasks.map( (item) => <li key={item.id}>{item.id} {item.name}</li>)
    }
    </ul>
    </>)
}

export default Todo