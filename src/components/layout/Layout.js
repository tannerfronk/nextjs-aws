import { Fragment } from "react";
import NavBar from "../nav/NavBar";

function Layout(props){
    return (
        <Fragment>
            <NavBar user={props.user} signOut={props.signOut} />
            <main>{props.children}</main>
        </Fragment>
    )
}

export default Layout