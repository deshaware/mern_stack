import spinner from '../../img/spin.gif';
import React from 'react';;


const Spinner = props => {
    return(
        <div>
            <img 
                src={spinner}
                style={{height:'100px',width:'100px'}}
                alt="Loading..."
            />            
        </div>
    );
}

export default Spinner;