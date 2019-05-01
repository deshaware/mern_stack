import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';  
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';  
import InputGroup from '../common/InputGroup';  
import SelectListGroup from '../common/SelectListGroup';  
import {createProfile} from '../../actions/profileActions';

class CreateProfile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            displaySocialInputs:false, 
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
            errors:{}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        console.log("Submit");
        const profileData = {
            displaySocialInputs:false, 
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
            instagram:''
        }
        this.props.createProfile(e)
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value});

    }
    
    render(){
        const {errors,displaySocialInputs} = this.state;

        let socialInputs;
        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup 
                        placeholder="Twitter"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                        info="Your valid Twitter Handle"
                     />
                    <InputGroup 
                        placeholder="facebook"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                        info="Your valid facebook Handle"
                     />
                     <InputGroup 
                        placeholder="linkedin"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                        info="Your valid linkedin Handle"
                     />
                     <InputGroup 
                        placeholder="youtube"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                        info="Your valid youtube Handle"
                     />
                     <InputGroup 
                        placeholder="instagram"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                        info="Your valid instagram Handle"
                     />
                </div>
            );
        }
        //select options for status
        const options = [
            {label:"* Select Professional Status",value:"0"},
            {label:"Developer",value:"Developer"},
            {label:"Junior Developer",value:"Junior Developer"},
            {label:"Intern",value:"Intern"},
            {label:"Manager",value:"Manager"},
            {label:"Data Scientist",value:"Data Scientist"},
            {label:"Freelancer",value:"Freelancer"}
        ];

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
                            <form onSubmit={this.onSubmit}>
                                {/* Profile Handle */}
                                <TextFieldGroup
                                    placeholder="*Profile Handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handle for your profile URL. Your full name, company name, nickname"
                                />
                                {/* Status */}
                                <SelectListGroup 
                                    placeholder="Status"
                                    name="Status"
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    error={errors.status}
                                    options={options}
                                    info="Give us an idea of where you are at in your career"
                                />
                                {/* Company */}
                                <TextFieldGroup 
                                    name="Company"
                                    placeholder="Company"
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info="Could be your own company or one you work for"
                                />
                                {/* WebSite */}
                                <TextFieldGroup 
                                    name="WebSite"
                                    placeholder="WebSite"
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info="Website of you"
                                />
                                {/* Location */}
                                <TextFieldGroup 
                                    name="Location"
                                    placeholder="Location"
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="Could be your present or permanant locationr"
                                />
                                {/* Skills */}
                                <TextFieldGroup 
                                    name="Skills"
                                    placeholder="Skills"
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="Please use comma separated values"
                                />
                                {/* Github Username */}
                                <TextFieldGroup 
                                    name="Github Username"
                                    placeholder="Github Username"
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    error={errors.githubusername}
                                    info="Could be your own company or one you work for"
                                />
                                {/* Company */}
                                <TextAreaFieldGroup 
                                    name="bio"
                                    placeholder="Short Bio"
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Tell us little bit about yourself"
                                />

                                <div className="mb-3">
                                <button
                                 onClick={
                                     () => {
                                         this.setState(prevState => ({
                                             displaySocialInputs:!prevState.displaySocialInputs
                                         }));}
                                 }
                                >
                                Add Social Networking Links</button>
                                <span className="text-muted">Optional</span>
                                </div>
                                {socialInputs}
                                <input type="submit" value="submit" className="btn btn-info btn-block mt-4  " />
                            </form>
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
        errors:state.error
    }
}

CreateProfile.propTypes = {
    profiles: PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}

export default connect(mapStateToProps,{
    createProfile
})(CreateProfile);