import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "./../../actions/profileActions";
import Spinner from '../common/Spinner';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const {name} = this.props.auth;
    const {profile,loading} = this.props.profile;

    let dashboardContent;

    if(profile === null || loading){
      dashboardContent = <h4><Spinner /></h4>
    } else {
      dashboardContent = <div></div>
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    auth:state.auth,
    profile:state.profile

  }
}

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
