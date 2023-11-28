import React, { useRef } from 'react'

export default function TaskItem({id, name, complete, taskClass}) {
  let finishButton = useRef(null)
  let unfinishButton = useRef(null)
  let deleteButton = useRef(null)

    /* let unfinished = () => {
      if (localStorage.getItem("toDoList") == null || localStorage.getItem("toDoList") == undefined) {
        return []
      } else {
        let lista = JSON.parse(localStorage.getItem("toDoList"))
        return lista
      }
    }

    let finished = () => {
      if(localStorage.getItem("doneList") == null || localStorage.getItem("doneList") == undefined) {
        return []
      } else {
        let lista = JSON.parse(localStorage.getItem("doneList"))
        return lista
      }
    } */

    let unfinished = JSON.parse(localStorage.getItem("toDoList"))
    let finished = JSON.parse(localStorage.getItem("doneList"))

    function maxNumber () {
      let allObjects = unfinished.concat(finished);
      let maxNum = allObjects.map(task => task.id)
      return maxNum.reduce((a, b) => Math.max(a, b), -Infinity)+1
    }

  /* function finish (){
    let unfinishedTask = unfinished.filter(task => task.id == (parseInt(finishButton.current.parentElement.id)))
    if(finished == null) {
      let doneTask ={
        "id": 1,
        "name": unfinishedTask[0].name,
        "complete": "Yes"
      }
      finished = [doneTask]
      let stringified = JSON.stringify(finished)
      localStorage.setItem("doneList", stringified)
    } else if (localStorage.getItem('doneList')!= ""){
      let notEmpty = JSON.parse(localStorage.getItem("doneList"))
      let doneTask ={
        "id": notEmpty.length + 1,
        "name": unfinishedTask[0].name,
        "complete": "Yes"
      }
      notEmpty.unshift(doneTask)
      let stringified = JSON.stringify(notEmpty)
      localStorage.setItem("doneList", stringified)
    }
    let haveToFinish = unfinished.indexOf(unfinishedTask[0])
    unfinished.splice(haveToFinish, 1)
    localStorage.setItem('toDoList', JSON.stringify(unfinished))
  }

  function unfinish (){
  let finishedTask = finished.filter(task => task.id == (parseInt(unfinishButton.current.parentElement.id)))
  if(unfinished == null) {
    let doneTask ={
      "id": 1,
      "name": finishedTask[0].name,
      "complete": "No"
    }
    unfinished = [doneTask]
    let stringified = JSON.stringify(unfinished)
    localStorage.setItem("doneList", stringified)
  } else if (localStorage.getItem('toDoList')!= ""){
    let notEmpty = JSON.parse(localStorage.getItem("toDoList"))
    let doneTask ={
      "id": notEmpty.length+1, //+finishedTask[0].id,
      "name": finishedTask[0].name,
      "complete": "No"
    }
    notEmpty.unshift(doneTask)
    let stringified = JSON.stringify(notEmpty)
    localStorage.setItem("toDoList", stringified)
  }
  let haveToFinish = finished.indexOf(finishedTask[0])
  finished.splice(haveToFinish, 1)
  localStorage.setItem('doneList', JSON.stringify(finished))
  } */

  function finish (){
    let unfinishedTask = unfinished.filter(task => task.id == (parseInt(finishButton.current.parentElement.id)))
    if(finished == null) {
      let doneTask ={
        "id": 1,
        "name": unfinishedTask[0].name,
        "complete": "Yes"
      }
      finished = [doneTask]
      let stringified = JSON.stringify(finished)
      localStorage.setItem("doneList", stringified)
    } else if (localStorage.getItem('doneList')!= ""){
      let notEmpty = JSON.parse(localStorage.getItem("doneList"))
      let doneTask ={
        "id": maxNumber (),
        "name": unfinishedTask[0].name,
        "complete": "Yes"
      }
      notEmpty.unshift(doneTask)
      let stringified = JSON.stringify(notEmpty)
      localStorage.setItem("doneList", stringified)
    }
    let haveToFinish = unfinished.indexOf(unfinishedTask[0])
    unfinished.splice(haveToFinish, 1)
    localStorage.setItem('toDoList', JSON.stringify(unfinished))
  }

  function unfinish (){
  let finishedTask = finished.filter(task => task.id == (parseInt(unfinishButton.current.parentElement.id)))
  if(unfinished == null) {
    let doneTask ={
      "id": 1,
      "name": finishedTask[0].name,
      "complete": "No"
    }
    unfinished = [doneTask]
    let stringified = JSON.stringify(unfinished)
    localStorage.setItem("doneList", stringified)
  } else if (localStorage.getItem('toDoList')!= ""){
    let notEmpty = JSON.parse(localStorage.getItem("toDoList"))
    let doneTask ={
      "id": maxNumber (), //+finishedTask[0].id,
      "name": finishedTask[0].name,
      "complete": "No"
    }
    notEmpty.unshift(doneTask)
    let stringified = JSON.stringify(notEmpty)
    localStorage.setItem("toDoList", stringified)
  }
  let haveToFinish = finished.indexOf(finishedTask[0])
  finished.splice(haveToFinish, 1)
  localStorage.setItem('doneList', JSON.stringify(finished))
  }
  function deleted (){
    if(finished == null || finished.length == 0){
      let unfinishedTask = unfinished.filter(task => task.id == (parseInt(deleteButton.current.parentElement.id)))
      let deleteTask = unfinished.indexOf(unfinishedTask[0]);
      unfinished.splice(deleteTask, 1)
      localStorage.setItem('toDoList', JSON.stringify(unfinished))
    } else if (unfinished == null || unfinished.length ==0){
      let finishedTask = finished.filter(task => task.id == (parseInt(deleteButton.current.parentElement.id)))
      let deleteTask = finished.indexOf(finishedTask[0]);
      finished.splice(deleteTask, 1)
      localStorage.setItem('doneList', JSON.stringify(finished))
    } else {
      let finishedTask = finished.filter(task => task.id == (parseInt(deleteButton.current.parentElement.id)))
      let unfinishedTask = unfinished.filter(task => task.id == (parseInt(deleteButton.current.parentElement.id)))
      if(deleteButton.current.parentElement.className === "finishedTasks"){
        let deleteTask = finished.indexOf(finishedTask[0]);
        finished.splice(deleteTask, 1)
        localStorage.setItem('doneList', JSON.stringify(finished))
      } else if (deleteButton.current.parentElement.className === "tasks"){
        let deleteTask = unfinished.indexOf(unfinishedTask[0]);
        unfinished.splice(deleteTask, 1)
        localStorage.setItem('toDoList', JSON.stringify(unfinished))
      }
    }
  }


  return (
    <div id={id} className={taskClass}>
      
      {complete == "No"?
        <div className='taskInfo'>
          <h4>{name}</h4>
          <h6>Completed:  {complete}</h6>
          <p>ID: {id}</p>
        </div>:
        <div className='taskInfoComplete'>
          <h4>{name}</h4>
          <h6>Completed:  {complete}</h6>
          <p>ID: {id}</p>
        </div>
      }
      {complete == "No"?
        <button className='changeCatFinish' onClick={finish} ref={finishButton}>Finished</button>:
        <button className='changeCatToDo' onClick={unfinish} ref={unfinishButton}>Not yet finished</button>
      }
      {
        complete == "No"?
        <button className='deleteUncomplete' onClick={deleted} ref={deleteButton}>X</button>:
        <button className='deleteComplete' onClick={deleted} ref={deleteButton}>X</button>
      }
      
      
    </div>
  )
}
