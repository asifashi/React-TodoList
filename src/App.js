import React, { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {

  const [Todo, seTodo] = useState('')
  const [ToDos, seTodos] = useState([])
  const [editId, seteditId] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus();
  })
  return (


    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Monday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input type="text" value={Todo} onChange={(e) => seTodo(e.target.value)} ref={inputRef} placeholder="🖊️ Add item..." />
        <i onClick={() => seTodo(Todo.slice(0, -1))} className="fa-solid fa-delete-left"></i>


        <i onClick={() => {
          if (Todo !== '') {
            seTodos([...ToDos, { id: Date.now(), text: Todo, status: false }], seTodo(''))
          } else if(Todo==='') {
            alert('make the input');
          }
            if(editId){
              const editodo=ToDos.find((Todo)=>Todo.id===editId)
              const updatEdit=ToDos.map((obj)=>obj.id === editodo.id
              ? (obj={id :obj.id,text:Todo,status:obj.status}) : (obj={id:obj.id,text:obj.text})
              )
              seTodos(updatEdit)
              
              seteditId(0);
              seTodo('')
          }
        }} className={editId ? "fa-regular fa-pen-to-square" : "fas fa-plus"}></i>

      </div>

      {


        ToDos.map((obj) => {



          return (



            <div className="todos" key={obj.id}>
              <div className={`todo ${obj.status ? 'completed' : ''}`}>
                <div className="left">

                  <input onChange={(e) => {
                    console.log(obj)
                    console.log(e.target.checked)
                    seTodos(ToDos.filter((obj2) => {
                      if (obj2.id === obj.id) {
                        obj.status = e.target.checked
                      }
                      return obj2
                    }
                    )
                    )

                  }}
                    type="checkbox" value={obj.status} name="" id="" />
                  <p>{obj.text}</p>
                </div>
                <div className="right">

                  <i onClick={() => {
                    const edit = ToDos.find((obj2) => obj2.id === obj.id);
                    seTodo(edit.text)
                    seteditId(edit.id)
                    console.log(edit)
                  }} className="fa-regular fa-pen-to-square"></i>
                  <i onClick={() => {
                    seTodos(ToDos.filter((obj2) =>
                      obj2.id !== obj.id ? obj : null
                    )
                    )
                  }} className={obj.status ? "fa-solid fa-trash-can" : ""}></i>
                </div>
              </div>
            </div>
          )

        })}
    </div>
  );
}

export default App;