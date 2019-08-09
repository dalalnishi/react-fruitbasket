import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class CRoute extends Component {
    getExtractedJson({component, cprivate, actions, auth, ...rest}) {
        return rest;
    }
    render() {
        const rest = this.getExtractedJson(this.props);
        const isUserLoggedIn = this.props.auth.authReducer.token ? true : false;
        const { component, cprivate } = this.props;
        const Component = component;

        let redirectTo = undefined;
        if((isUserLoggedIn && rest.path === '/') || (isUserLoggedIn && rest.path === '/register')) {
            redirectTo = '/list';
        }
        else if(!isUserLoggedIn && cprivate) {
            redirectTo = '/';
        }
        else if((!isUserLoggedIn && cprivate && rest.path === '/list') || 
                (!isUserLoggedIn && cprivate && rest.path === '/add') || 
                (!isUserLoggedIn && cprivate && rest.path === '/cart') ||
                (!isUserLoggedIn && cprivate && rest.path === '/search')) {
            redirectTo = '/';
        }        
        return (
            <Route
                {...rest}
                render={props => (
                    (redirectTo) 
                    ? <Redirect to={{pathname:redirectTo, state:{from:props.location}}} />
                    : <Component {...props} /> 
                )}
            ></Route>
        )
    }
}

const mapStateToProps = state => {
    return {        
        auth: state
    }
}

export default connect(mapStateToProps, null)(CRoute);