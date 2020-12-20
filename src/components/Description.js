import React, {Component} from  'react';

class Description  extends Component {
    
    render(){
        return(
            <span>This is a {this.props.description}</span>
        )
    };

}

export default Description;