import { useState } from "react";

const Todo = () => {

    const initTasks = [
        {id: 1, name: "Read a book"},
        {id: 2, name: "Do homework"},
    ];

    const [name, setName] = useState('');
    const [tasks, setTasks] = useState(initTasks);
    const [idEdit, setIdEdit] = useState(0)

    const add = () => {
        console.log("Add");
        setTasks([...tasks, { id: tasks[tasks.length-1].id+1 , name: name }]);
    }
    
    const del = (id) => {
        console.log('Delete');
        const newTasks = tasks.filter( (task) => ( +task.id !== +id));
        setTasks(newTasks);
    }

    const editTask = (id) => {
        console.log("Edit" + id);
        setIdEdit(id);
        const t = tasks.find((task) => (+task.id === +id))
        setName(t.name);
        //press edit again
        if ( +idEdit === +id) {
            const newTasks = tasks.map ((task) => {
                if( +task.id === +id)
                    task.name = name;
                return task;
            } )
            setTasks(newTasks)
            setIdEdit(0);
        }

    }
    
    const renderTasks = () => {
        return tasks.map ((item, index) => {
            return (<li key={index}>
                {item.id}
                {
                     (idEdit !== item.id) ? 
                     item.name :
                     <input type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}/>
                }
                <button onClick={() => del(item.id)} >Delete</button>
                <button onClick={() => editTask(item.id)}>Edit</button>
            </li>)
        })
    }

    return (<>
    <h1>Todo</h1>
    <input type="text" name="name" onChange={(e) => setName(e.target.value)}    />
    <button onClick={add} >Add</button>
    <ul>
    {
        tasks.map( (item) => <li key={item.id}>{item.id} {item.name}</li>),
        renderTasks()
    }
    </ul>
    </>)
}

export default Todo