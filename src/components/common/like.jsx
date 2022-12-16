import React, { Component } from 'react';


//input Liked : boolean
//output onClick notify and toggle the state of like component 

class Like extends Component {
    
    render() { 

        let classes = "fa fa-heart";
        if(! this.props.liked)classes += "-o";
        return (
            <div>
                <i onClick={this.props.onClick} style= {{cursor : "pointer"}} className={classes} area-hidden='true' />
            </div>
        );
    }
}
 
export default Like;