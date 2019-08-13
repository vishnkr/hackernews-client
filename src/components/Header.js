import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
//import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';




class Header extends Component {
    render() {
        return (
            <MuiThemeProvider>
            <AppBar position="static" style={{ background: "#ff6600" }} title="HackerNews"
    iconClassNameRight="muidocs-icon-navigation-expand-more">
                
            </AppBar>
            </MuiThemeProvider>
            
        );
    }
}

export default Header;

