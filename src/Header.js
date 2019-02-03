import React , {Component} from "react";
import {NavLink} from "react-router-dom";

class Header extends Component {
    active={
        backgroundColor:"#212F3D",
        color:"white",
        fontWeight:"bold"
    };

    header = {
        lifeStyle: "none",
        display:"flex",
        justifyContent: "space-evenly"
    };

    render(){
        return(
            <div style ={this.header}>
                <NavLink exact to="/" activeStyle={this.active}>
                getAll
                </NavLink>
                {/* <NavLink  to="/cruise/2" activeStyle={this.active}>
                update score and times of competitor details 
                </NavLink> */}
                <NavLink  to="/getCruiseByYearCompetitor" activeStyle={this.active}>
                copyceruiseByYearName
                </NavLink>

            </div>
        );
    }
}


export default Header;