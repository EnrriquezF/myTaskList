import React, {useRef} from 'react'

export default function TaskForm() {
  /* let toDoList = () => {
    if(localStorage.getItem("toDoList") == null || undefined){
      return "";
    } else {
      return localStorage.getItem("toDoList")
    }
  }

  let doneList = () => {
    if(localStorage.getItem("doneList") == null || undefined) {
      return ""
    } else {
      return localStorage.getItem("doneList")
    }
  } */
  let toDoList = localStorage.getItem("toDoList") //hay que parsear
  let doneList = localStorage.getItem("doneList") //hay que parsear
  
  const nameInput = useRef(null)
  const check = useRef(null)
  let alertRequirements = useRef(null)

  function maxNumber () {
    if(toDoList == null && doneList == null){
        return 0
    }else if(toDoList == ""  && doneList == "") {
        return 0

    }else if(toDoList == "[]"  && doneList == "[]") {
      return 0

    } else if (toDoList != "" &&  doneList == null){
        let maxNum = (JSON.parse(toDoList)).map(task => task.id)
        return maxNum.reduce((a, b) => Math.max(a, b), -Infinity)+1

    } else if (toDoList != "" &&  doneList == ""){
        let maxNum = (JSON.parse(toDoList)).map(task => task.id)
        return maxNum.reduce((a, b) => Math.max(a, b), -Infinity)+1

    } else if ((doneList != "") && toDoList == null){
        let maxNum = (JSON.parse(doneList)).map(task => task.id)
        return maxNum.reduce((a, b) => Math.max(a, b), -Infinity)+1

    }else if ((doneList != "") && toDoList == ""){
        let maxNum = (JSON.parse(doneList)).map(task => task.id)
        return maxNum.reduce((a, b) => Math.max(a, b), -Infinity)+1

    } else {
        let allObjects = JSON.parse(toDoList).concat(JSON.parse(doneList));
        let maxNum = allObjects.map(task => task.id) 
        return maxNum.reduce((a, b) => Math.max(a, b), -Infinity)+1
    }
  }

  let addTask =(e)=>{
    e.preventDefault();
    if(nameInput.current.value.length > 2 && nameInput.current.value.length < 37){
      if(check.current.checked == false){
        if(toDoList == null) {
          let toDoTask ={
            "id": maxNumber(),
            "name": nameInput.current.value,
            "complete": "No"
          }
          toDoList = [toDoTask]
          let stringified = JSON.stringify(toDoList)
          localStorage.setItem("toDoList", stringified)
          alertRequirements.current.innerHTML= "<div id='success'><h3>New task added!</h3></div>"
        } else if (localStorage.getItem('toDoList')!= ""){
          let notEmpty = JSON.parse(localStorage.getItem("toDoList"))
          let toDoTask ={
            "id": maxNumber(),
            "name": nameInput.current.value,
            "complete": "No"
          }
          notEmpty.unshift(toDoTask)
          let stringified = JSON.stringify(notEmpty)
          localStorage.setItem("toDoList", stringified)
          alertRequirements.current.innerHTML= "<div id='success'><h3>New task added!</h3></div>"
        }
      } else{
        if(doneList == null) {
          let doneTask ={
            "id": maxNumber(),
            "name": nameInput.current.value,
            "complete": "Yes"
          }
          doneList = [doneTask]
          let stringified = JSON.stringify(doneList)
          localStorage.setItem("doneList", stringified)
          alertRequirements.current.innerHTML= "<div id='success'><h3>New finished task added!</h3></div>"
        } else if (localStorage.getItem('doneList')!= ""){
          let notEmpty = JSON.parse(localStorage.getItem("doneList"))
          let doneTask ={
            "id": maxNumber(),
            "name": nameInput.current.value,
            "complete": "Yes"
          }
          notEmpty.unshift(doneTask)
          let stringified = JSON.stringify(notEmpty)
          localStorage.setItem("doneList", stringified)
          alertRequirements.current.innerHTML= "<div id='success'><h3>New finished task added!</h3></div>"
        }
      }
    } else {
      alertRequirements.current.innerHTML= "<div id='danger'><h3>Please, provide a larger task name! It can have a range of 3 to 36 characters.</h3></div>"
    }
  }

  //ESTE ES COPIA DE SEGURIDAD POR SI EL CÓDIGO SALE MAL NO BORRAR
  /* let addTask =(e)=>{
    e.preventDefault();
    if(nameInput.current.value.length > 2 && nameInput.current.value.length < 37){
      if(check.current.checked == false){
        if(toDoList == null) {
          let toDoTask ={
            "id": 1,
            "name": nameInput.current.value,
            "complete": "No"
          }
          toDoList = [toDoTask]
          let stringified = JSON.stringify(toDoList)
          localStorage.setItem("toDoList", stringified)
          alertRequirements.current.innerHTML= "<div id='success'><h3>New task added!</h3></div>"
        } else if (localStorage.getItem('toDoList')!= ""){
          let notEmpty = JSON.parse(localStorage.getItem("toDoList"))
          let toDoTask ={
            "id": notEmpty.length + 1,
            "name": nameInput.current.value,
            "complete": "No"
          }
          notEmpty.unshift(toDoTask)
          let stringified = JSON.stringify(notEmpty)
          localStorage.setItem("toDoList", stringified)
          alertRequirements.current.innerHTML= "<div id='success'><h3>New task added!</h3></div>"
        }
      } else{
        if(doneList == null) {
          let doneTask ={
            "id": 1,
            "name": nameInput.current.value,
            "complete": "Yes"
          }
          doneList = [doneTask]
          let stringified = JSON.stringify(doneList)
          localStorage.setItem("doneList", stringified)
          alertRequirements.current.innerHTML= "<div id='success'><h3>New finished task added!</h3></div>"
        } else if (localStorage.getItem('doneList')!= ""){
          let notEmpty = JSON.parse(localStorage.getItem("doneList"))
          let doneTask ={
            "id": notEmpty.length + 1,
            "name": nameInput.current.value,
            "complete": "Yes"
          }
          notEmpty.unshift(doneTask)
          let stringified = JSON.stringify(notEmpty)
          localStorage.setItem("doneList", stringified)
          alertRequirements.current.innerHTML= "<div id='success'><h3>New finished task added!</h3></div>"
        }
      }
    } else {
      alertRequirements.current.innerHTML= "<div id='danger'><h3>Please, provide a larger task name! It can have a range of 3 to 36 characters.</h3></div>"
    }
  } */


  return (
    <div className="taskDescr">
      <h4 className='enterTask'>Please, introduce here your task.</h4>
      <p className='enterTaskInfo'>Its name must have a range of 3 to 36 characters</p>
      <form>
        <label htmlFor="name">Task Name:  <input type="text" name="name" id="name" ref={nameInput}/></label>
        <label htmlFor="completed">Completed:  <input type="checkbox" name="completed" id="completed" ref={check}/></label>
    </form>
    <div ref={alertRequirements}></div>
    <button onClick={addTask} className='addTaskButton'>Add Task</button>
    </div>
    
  )
}
