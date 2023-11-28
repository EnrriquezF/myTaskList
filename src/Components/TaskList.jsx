import React, { useState, useEffect, useRef } from 'react'
import TaskForm from './TaskForm'
import TaskItem from './TaskItem'

export default function TaskList() {
    let [register, setRegister] = useState(0)
    let registerButton = ()=>{
        setRegister(register+1)
    }
    let cancelButton = ()=>{
        setRegister(0)
    }

    let finishButton = useRef(null)

    let [finishedTasks, setFinishedTaks] = useState([""])
    let [unfinishedTasks, setUnfinishedTaks] = useState([""])

    useEffect(()=> {
        let updateFromLocalStorage = () => {
            setUnfinishedTaks(JSON.parse(localStorage.getItem("toDoList")));
            setFinishedTaks(JSON.parse(localStorage.getItem("doneList")));
          };
        let timeoutId = setTimeout(updateFromLocalStorage, 75);
      
        return () => clearTimeout(timeoutId);
    }, [])

    let [showUnf, setShowUnf] = useState(0)

    function showUnfinished () {
        setShowUnf(1)
    }
    
    let [showFin, setShowFin] = useState(0)

    function showFinished () {
        setShowFin(1)
    }
    
    
  return (
    <div>
        <h1>myTaskList!</h1>
        {register == 0 && <button className="addTask" onClick={registerButton}>Add task</button>}
        {register >= 1 && <div><TaskForm/><button onClick={cancelButton} className='cancelButton'>Cancel</button></div>}
        <h2>All tasks:</h2>
        {unfinishedTasks.map(task => 
            <div key={task.id}ref={finishButton}>
                <TaskItem id={task.id} name={task.name} complete={task.complete}  taskClass='tasks' key={task.name+task.id}/>
            </div>)}
            {finishedTasks != null  && finishedTasks.length != 0?<div>
                    {finishedTasks.map(task => <TaskItem id={task.id} name={task.name} complete={task.complete}  taskClass='finishedTasks' key={task.name+task.id}/>)}
                    </div>:<h4>There are no finished tasks</h4>}
        <h2>To do Tasks</h2>
        {showUnf == 0? <button onClick={showUnfinished}>Show tasks to do!</button>:
        <div>{unfinishedTasks != null && unfinishedTasks.length != 0 ? <div>
            {unfinishedTasks.map(task => 
            <div key={task.id}ref={finishButton}>
                <TaskItem id={task.id} name={task.name} complete={task.complete}  taskClass='tasks' key={task.name+task.id}/>
            </div>)}
        </div>: <h4>There are no tasks to do</h4>}</div>
        }
        
        <h2>Finished Tasks</h2>
        {showFin == 0?
            <button onClick={showFinished}>Show finished tasks!</button>
        :
            <div>
               {finishedTasks != null  && finishedTasks.length != 0?<div>
                    {finishedTasks.map(task => <TaskItem id={task.id} name={task.name} complete={task.complete}  taskClass='finishedTasks' key={task.name+task.id}/>)}
                    </div>:<h4>There are no finished tasks</h4>} 
            </div>
        }
        
        
    </div>
  )
}