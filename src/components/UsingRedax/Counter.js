import React, {Component} from 'react';
import {connect} from 'react-redux';


const DivBox = {
    width:'200px',
    height:'100px',
    margin:"30px auto",
    border:'1px solid #000',
    display:'flex',
    justifyContent: 'center',
    alignItems:'center',

};

const Span = {
    margin:'20px',
    textAlign: 'center',
    fontSize: '30px',
    height:'30px',
    width:'50px', 
    color:'red'  
};

const Button ={
    fontSize: '30px',
    display:'flex',
    alignItems:'center',
    justifyContent: 'center',
    height:'30px',
    width:'40px',   
};

class ChangeCount extends Component{

    increment = ()=>{
        this.props.dispatch({type:"INCREMENT"});
    }

    decrement = ()=>{
        this.props.dispatch({type:"DECREMENT"});
    }
    render(){
    return(
        <div style={DivBox}>
            <button style={Button} onClick={this.decrement}>-</button>
            <span style={Span}>{this.props.count}</span>
            <button style={Button} onClick = {this.increment}>+</button>
        </div>
    );

};

}
const mapStateToProps = state => ({
    count:state.count
});

export default connect(mapStateToProps, null)(ChangeCount);