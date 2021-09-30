import React from "react";

export const UserContext = React.createContext();

export default class UserContextProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: localStorage.getItem('refreshToken') ? true : false,
            email: localStorage.getItem('email'),
            setLoggedIn: this.setLoggedIn,
            setEmail: this.setEmail,
            logout: this.logout
        }
    }

    setLoggedIn = (isLoggedIn) => {
        this.setState({isLoggedIn});
    }

    setEmail = (email) => {
        this.setState({email});
        localStorage.setItem('email', email);
    }

    logout = () => {
        localStorage.removeItem('refreshToken');
        sessionStorage.removeItem('accessToken');
        localStorage.removeItem('email');
        this.setState({
            isLoggedIn: false,
            email: null
        });
    }

    render() {
        const { children } = this.props;

        return (
            <UserContext.Provider value={this.state}>
                {children}
            </UserContext.Provider>
        )
    }
}