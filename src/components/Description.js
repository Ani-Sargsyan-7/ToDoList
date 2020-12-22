import React, {Component} from  'react';

class Description  extends Component {
    
    render(){
        return(
            <div>This is a {this.props.description}</div>
        )
    };

}

export default Description;