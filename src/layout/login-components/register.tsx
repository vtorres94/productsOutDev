import React, { useState } from 'react'
import { Modal, Segment, Header, Input, Button, Grid, Icon } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import { useFirebaseApp, useUser } from 'reactfire';
import 'firebase/auth';

interface IRegisterProps extends RouteComponentProps<{ url: string }> {}

interface IRegisterState {
    email: string,
    password: string
    confirmPassword: string,
    validEmail: boolean,
    validPassword: boolean,
    validConfirmPassword: boolean
}
const Register = (props: IRegisterProps) => {
    const [state, setState] = useState<IRegisterState>({
        email: '',
        password: '',
        confirmPassword: '',
        validEmail: true,
        validPassword: true,
        validConfirmPassword: true
    });
    const firebase = useFirebaseApp();
    const user = useUser();

    const validateFields = () => {
        setState({
            ...state,
            validEmail: state.email !== '' ? true : false,
            validPassword: state.password !== '' && state.password.length >6 ? true : false,
            validConfirmPassword: state.password === state.confirmPassword ? true : false 
        })
    }
    
    const signIn = () => {
        validateFields();
        const { validEmail, validPassword, validConfirmPassword } = state;
        console.log("Signin"+ validEmail + validPassword + validConfirmPassword)
        if(validEmail && validPassword && validConfirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(state.email, state.password);
        }
    }


    return(
        <Modal 
            open={!user.data}
            textAllign="center" 
            closeIcon
            onClose={() => props.history.push("/")}
            closeOnEscape
        >
            <Modal.Header>Products <Icon name="product hunt"/></Modal.Header>
            <Segment textAlign="center">
                <Header>
                    <Header.Content>Register</Header.Content>
                </Header>
                <Grid columns={1}>
                    <Grid.Row>
                        <Grid.Column>
                        <Input icon="user" placeholder="email" onChange={event => setState({ ...state, email:event.target.value })}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Input icon="key" placeholder="password" type="password" onChange={event => setState({ ...state, password:event.target.value })}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Input icon="key" placeholder="confirm" type="password" onChange={event => setState({ ...state, confirmPassword:event.target.value })}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Button color="facebook" onClick={() => signIn()}>Register</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Modal>
    );
}

export default Register;