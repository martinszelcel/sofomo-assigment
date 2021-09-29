import React from "react";

export const StorageContext = React.createContext();

export default class StorageContextProvider extends React.Component {
    setTokens = (accessToken, refreshToken) => {
        this.setState({
            accessToken,
            refreshToken
        });
        
        sessionStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    }

    componentDidMount() {
        this.setState({
            accessToken: sessionStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken'),
            setTokens: this.setTokens
        });
    }

    render() {
        const { children } = this.props;

        return (
            <StorageContext.Provider value={this.state}>
                {children}
            </StorageContext.Provider>
        )
    }
}