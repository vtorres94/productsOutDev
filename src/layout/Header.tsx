import React, { useState } from 'react';
import '../css/Navbar.css';
import { Button, Icon, Header as HeaderS } from 'semantic-ui-react';
import { useUser, useFirebaseApp } from 'reactfire';
import 'firebase/auth';

export interface IHeaderProps {

}

const Header = (props: IHeaderProps) => {
    const user = useUser();
    const firebase = useFirebaseApp();

    const [
        state, setState 
    ] = useState({
        clicked: false
    });

    const handleClick = () => {
        setState({clicked: !state.clicked })
    }

    const logout = async() => {
        
        await firebase.auth().signOut().then(() => {
            // Sign-out successful.
            console.log("Se cerró la sesión")
            window.location.href='/'
        }).catch((error) => {
            console.log(error)
            // An error happened.
        });
          
    }
    return (
        <nav className="NavbarItems" style={{
            background: '#2ACFFF',
            height: '100px',
            width: '100%'
        }}>
            <HeaderS className="navbar-logo" onClick={() => window.location.href="/"}>Products<Icon name="product hunt"></Icon></HeaderS>
            
            <ul className={state.clicked ? "nav-menu active" : "nav-menu"}>
                {user.data ?
                <li className="nav-links"><a href="/">Productos</a></li>
                :null}
                {!user.data ?
                <li className="nav-links logs"><a href="/login">LogIn</a></li>
                :
                <li className="nav-links logs" onClick={logout}><a href="/">LogOut</a></li>
                }
            </ul>
            <div className="menu-icon" onClick={handleClick}>
                <i className={state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
            {!user.data ?
            <Button
                className="log-button"
                color="black"
                onClick={() => window.location.href='/login'}
            >
                LogIn
            </Button>
            :
            <Button
                className="log-button"
                color="black"
                onClick={logout}
            >
                LogOut
            </Button>
            }
        </nav>
    )
}

export default Header;
