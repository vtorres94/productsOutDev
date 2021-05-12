import React from 'react'
import Products from './product-components/products';
import '../css/Body.css';
import { useHistory } from 'react-router-dom';
import { useUser } from 'reactfire'; 
import { Segment, Icon, Header, Button } from 'semantic-ui-react';

interface IBodyProps {}

const Body = (props: IBodyProps) => {

    const user = useUser();
    const history = useHistory();

    return (
        <div>
        {user.data? 
            <Products/>
        : 
            <Segment textAlign="center">
                <Header dividing>
                    <Header.Content >
                        <Icon name="product hunt" circular size="massive"></Icon>
                    </Header.Content>
                </Header>
                <h2>Login for see the products!</h2>
                <Button color="green" onClick={() => history.push("/register")}>Register</Button>
                <Button color="facebook" onClick={() => history.push("/login")}>Login</Button>
            </Segment>
        }
        </div>
    )
}

export default Body;