import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';

class CreateProfile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            displaySocialInputer:false, 
            handle:"",
            company:"",
            website:"",
            location:'',
            status:'',
            skiils:'',
            githubusername:'',
            bio:'',
            twitter:'',
            facebook:'',
            linkedin:'',
            youtube:'',
            instagram:'',
            error:{}
        }
    }
    
    render(){
        return(
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <p className="lead text-center">
                                Let's get some information to make your profile standout
                            </p>
                            <small className="d-block pb-3">* Required Fields</small>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        profile:state.profile,
        error:state.error
    }
}

CreateProfile.propTypes = {
    profiles: PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}

export default connect(mapStateToProps,{

})(CreateProfile);