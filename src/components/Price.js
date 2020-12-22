import React, {Component} from  'react';

class Price  extends Component {
    constructor(props){
        super(props);
        this.state = {
            price : `${props.defVal}`,
            currency: "$"
        }
    }
  ConvertCurrency = ()=>{
      this.setState((state)=>{
            return{
                price : `${state.price * 500}`,
                currency:"AMD" 
            }
      });
     if(this.state.currency === "AMD"){
        this.setState(()=>{
            return{
                price : `${this.state.price / 500}`,
                currency:"$" 
            }
        }
     
     )};
  };
  
    render(){
        return(
            <div>
                <h1>{this.state.price }{this.state.currency }</h1>
                <button 
                onClick = {this.ConvertCurrency}
                >Change the currency
                </button>
            </div>
        );

    };

}

export default Price;