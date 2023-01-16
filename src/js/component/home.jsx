import React, { useState, useEffect } from "react";

//include images into your bundle

//create your first component
const Home = () => {
  const [tasks, setTasks] = useState(["Lavar el auto", "Cortar el pasto"]);

  const [newTask, setNewTask] = useState("");

  const removeTask = (index) => {
	// Aqui usamos splice, el mismo recibe el indice de un elemento que se va a eliminar y la cantidad de elementos que eliminará a partir de esa posición. En este caso solamente eliminamos uno entonces sería splice(index,1). Pero ello debemos combinar este método con el setTask que es el que actualiza el estado. Y ademas a partir del array tasks con el operador spread referenciar un nuevo array, y luego a ese nuevo array aplicarle el metodo splice, ya que de no ser asi estariamos modificando el estado, lo que no seria correcto. 
  console.log(index);
   let newTasks = [...tasks]
   newTasks.splice(index, 1)
   setTasks(newTasks)
}
  function addTask(e){
	// Aqui creamos la logica para agregar las tasks al to do
	if(e.code=="Enter" && newTask!=""){
		// A continuacion agregamos las tasks a nuestro array. Con el operador spread(...), cuando necesito unir dos arrays u objetos en un mismo array u objeto, es una manera sencilla de hacerlo.
		setTasks([...tasks, newTask])
		setNewTask("")
	}
  }
  function createUser() {
	fetch('https://assets.breatheco.de/apis/fake/todos/user/lumarperez', {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    })
//     fetch('http://assets.breatheco.de/apis/fake/todos/user/lumarperez,{
// method: 'POST',
// headers: {
//   'Content-type': 'application/json'
// },
// body: JSON.stringify([])
//     })
    .then((response)=>response.json())
    .then((data)=>console.log(data))
    
  }
  function getToDoList() {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/lumarperez',{
method: 'GET',
headers: {
  'Content-type': 'application/json'
},
//body: JSON.stringify([]) Solo se usa cuando tenemos que enviar informacion. 
    })
    .then((response)=>response.json())
    .then((data)=>console.log(data))
    
  }

  
  useEffect(() => {
    
    createUser();
	getToDoList();

  }, [])
  
  return (
    <div className="container-fluid d-flex mt-5 justify-content-center">
      <ul className="list-group w-50">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          {/* el input tendra una particularidad, cuando cambie su valor, el evento que se encuentra dentro del onChange lo establecera ese valor en el estado, o sea se sincronizará con el estado. El onChange actualiza el estado a medida que el usuario va escribiendo*/}
          <input
            className="form-control"
            type="text" onKeyDown={e=>addTask(e)}
            onChange={(e) => setNewTask(e.target.value)}
            value={newTask}
            name="task"
            id="task"
          />
        </li>
        {tasks.map((task, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center ">
            {task}
            <button onClick={()=>removeTask(index)}className="badge bg-danger hover-hidden">X</button>
          </li>
        ))}
        
        <li className="list-group-item text-center disabled text-muted d-flex justify-content-center align-items-center">
			<small className="w-100">{tasks.length} items.</small>
		</li>
        
      </ul>
    </div>
  );
};

export default Home;
