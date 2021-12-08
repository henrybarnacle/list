import React from "react";
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '818420318503-c4fh93cr0tg4ts2km0ijadd37m96q7ca.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }
    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }
    onSignIn = () => {
        this.auth.signIn();
    } 
    onSignOut = () => {
        this.auth.signOut();
    }
    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
            <div>
                <button onClick={this.onSignOut} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            </div>
            )
        } else {
            return (
                <div>
                    <button onClick={this.onSignIn} className="ui red google button">
                        <i className="google icon" />
                        Sign in with Google
                    </button>
                </div>
                )
        }
    }
    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}
const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}
export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);