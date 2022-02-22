import { useState } from "react";

const Todo = ({ avatar_url, login }) => {

    const initTasks = [
        { id: 1, name: "Read a book" },
        { id: 2, name: "Do homework" },
    ];

    const [name, setName] = useState('');
    const [tasks, setTasks] = useState(initTasks);
    const [idEdit, setIdEdit] = useState(0)

    const add = () => {
        console.log("Add");
        if (name == "")
        return;
        if(tasks.length>=10)
        return;
        if(tasks.length==0)
        setTasks([{ id: 1, name}]);
        else
            setTasks([...tasks, { id: tasks[tasks.length-1].id + 1, name: name }])
          console.log('new task:', tasks);
    }

    const del = (id) => {
        console.log('Delete');
        const newTasks = tasks.filter((task) => (+task.id !== +id));
        setTasks(newTasks);
    }

    const editTask = (id) => {
        console.log("Edit" + id);
        setIdEdit(id);
        const t = tasks.find((task) => (+task.id === +id))
        setName(t.name);
        //press edit again
        if (+idEdit === +id) {
            const newTasks = tasks.map((task) => {
                if (+task.id === +id)
                    task.name = name;
                return task;
            })
            setTasks(newTasks)
            setIdEdit(0);
        }

    }

    const renderTasks = () => {
        return tasks.map((item, index) => {
            return (<li className="relative m-4 border-2 border-dashed p-8" key={index}>
                    <div className="absolute bottom-0 right-0 text-xl mr-2 text-indigo-200 drop-shadow-lg">
                        {index+1}
                    </div>
                    {
                        (idEdit !== item.index) ?
                            <div className="text-3xl text-indigo-800 drop-shadow-lg drop-shadow-lg max-w-xs">{item.name}</div> :
                            <input className="text-3xl text-indigo-800" type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                    }


                <div className="mt-8 flex justify-center">
                    <button className="mr-4 drop-shadow-lg bg-red-300 text-indigo-900 hover:bg-red-200 rounded-lg p-4" onClick={() => del(item.id)} >Delete</button>
                    <button className="mr-4 drop-shadow-lg bg-yellow-300 text-indigo-900 hover:bg-yellow-200 rounded-lg p-4" onClick={() => editTask(item.id)}>Edit</button>
                </div>

            </li>)
        })
    }

    return (<div className="bg-indigo-400 h-screen flex flex-col items-center p-8" >
        <div className="flex items-center">
            <h1 className= "m-4 text-indigo-800 text-4xl drop-shadow-lg">
                <img className="rounded-full inline mr-4" src={avatar_url} width="80" />
                Todo  for <span>{login} </span>
            </h1>
        </div>
        {/* <h1 className="m-2 text-indigo-800 text-4xl drop-shadow-lg">Todo</h1> */}
        <div className="flex items-center m-4">
            <input className="rounded-lg text-green-800 text-4xl drop-shadow-lg pl-2 ml-2 mr-4" type="text" name="name" onChange={(e) => setName(e.target.value)} />
            <button className="bg-green-600 text-indigo-200 hover:bg-green-500 p-2 rounded-lg" onClick={add} >Add</button>
        </div>
        <ul className="flex flex-wrap">
            {renderTasks()}
        </ul>
    </div>)
}

Todo.getInitialProps = async (ctx) => {
    const res = await fetch('https://api.github.com/users/Aneptx')
    const json = await res.json()
    return { login: json.login, avatar_url: json.avatar_url }
}


export default Todo