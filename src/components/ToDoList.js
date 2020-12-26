import React, { Component } from 'react';
import styles from './styles.module.css';


class ToDoList extends Component{
   state = {
            inpValue:'',
            tasks: []
        };

    handleOnChange = (e)=>{
        this.setState({
            inpValue : e.target.value    
        });
    };
    
    handleOnClickAdd = ()=>{  
        const inpValue = this.state.inpValue.trim(); 
        const tasks = [inpValue , ...this.state.tasks];
       
        if(!inpValue){return};
        this.setState({
            tasks: tasks,
            inpValue: ''
        });
    };



    handleOnClickRmove = (e)=>{  
        const listElement = e.target.value;
        const tasksArray = this.state.tasks;

        tasksArray.splice(listElement, 1);
        this.setState({
            tasks:tasksArray
        });
        
    };

    handleOnClickRmoveAll = ()=>{  
        this.setState({
            tasks:[]
        });
        
    };

   
    render(){
        
        const {inpValue,tasks} = this.state;
       
        const tasksArray = tasks.map((task, index) =>{
            return   <li key={index}>{task}</li>
        });
       
        return(
            <div className = {styles.toDo}>
                <h2>ToDo List</h2>
                <input value = {inpValue}  type="text" onChange = {this.handleOnChange} />
                <button onClick = {this.handleOnClickAdd}>Save</button>
                <button onClick = {this.handleOnClickRmove}>Remove</button>
                <button onClick = {this.handleOnClickRmoveAll}>Remove All</button>
                <ol>{tasksArray}</ol>
                
            </div>
        );
    };
}

export default ToDoList;