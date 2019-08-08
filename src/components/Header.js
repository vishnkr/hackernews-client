import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import {red400,red100,red200,redA400} from 'material-ui/styles/colors';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ToolBar from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Typography from 'material-ui/styles/typography';



class Header extends Component {
    render() {
        return (
            <MuiThemeProvider>
            <AppBar position="static" style={{ background: "#ff6600" }}>
                <Typography></Typography>
            </AppBar>
            </MuiThemeProvider>
            
        );
    }
}

export default Header;

