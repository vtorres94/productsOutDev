import React, { useState } from 'react';
import { Modal, Segment, Header, Input, Button, Grid, Icon, Label, StrictTransitionGroupProps } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useFirebaseApp, useUser } from 'reactfire';
import 'firebase/auth';
import { useEffect } from 'react';

interface ILoginProps{}

interface ILoginState {
    email: string,
    password: string,
    emailValid: boolean,
    passwordValid: boolean,
    loginValid: boolean,
    errorMessage: string
}

const Login = (props: ILoginProps) => {

    const firebase = useFirebaseApp();
    const user = useUser();
    const history = useHistory();

    const [state, setState] = useState<ILoginState>({
        email: '',
        password: '',
        emailValid: true,
        passwordValid: true,
        loginValid: true,
        errorMessage: ''
    })

    useEffect(() => {
        if(user.data) {
            history.push('/')
        }
    }, [user])

    const login = async() => {
        let emailValid;
        let passwordValid;
        emailValid = state.email !== '' ? true : false
        passwordValid = state.password !== '' ? true : false
        if(emailValid && passwordValid) {
            firebase.auth().signInWithEmailAndPassword(state.email, state.password)
                .then(() => {
                    console.log("Se inicio sesion: " + user.data.email);
                })
                .catch((error) => {
                    setState({...state, loginValid: false, errorMessage: error.message})
                })
        }
        setState({ ...state, emailValid: emailValid, passwordValid: passwordValid })
    }

    return(
        <Modal 
            textAllign="center" 
            closeIcon
            onClose={() => history.push("/")}
            open={!user.data}
            size="tiny"
            closeOnEscape
            closeOnDimmerClick
            closeOnTriggerBlur
        >
            <Modal.Header>Products <Icon name="product hunt"/></Modal.Header>
            <Segment textAlign="center">
                <Header>
                    <Header.Content>Login</Header.Content>
                </Header>
                <Grid columns={1}>
                    <Grid.Row>
                        <Grid.Column>
                            <Input
                                name="user"
                                icon="user"
                                placeholder="email"
                                value={state.email}
                                onChange={event => setState({
                                    ...state, 
                                    email: event.target.value,
                                    emailValid: event.target.value !== '' ? true : false,
                                    loginValid: true
                                })}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    {!state.emailValid ? (
                    <Grid.Row>
                          <Label basic color="red" pointing="above" attached="bottom">
                            Field required
                          </Label>
                    </Grid.Row>
                    ) : null}
                    <Grid.Row>
                        <Grid.Column>
                            <Input 
                                name="password"
                                icon="key" 
                                placeholder="password" 
                                type="password" 
                                value={state.password} 
                                onChange={event => setState({
                                    ...state, 
                                    password: event.target.value,
                                    passwordValid: event.target.value !== '' ? true : false,
                                    loginValid: true
                                })}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    {!state.passwordValid ? (
                    <Grid.Row>
                          <Label basic color="red" pointing="above" attached="bottom">
                            Field required
                          </Label>
                    </Grid.Row>
                    ) : null}
                    {!state.loginValid && state.emailValid && state.passwordValid ? (
                    <Grid.Row>
                        <Label basic color="red" attached="bottom">
                            {state.errorMessage}
                          </Label>
                    </Grid.Row>
                    ) : null}
                    <Grid.Row>
                        <Grid.Column>
                            <a href="/password-recovery">Forgot the password?</a>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Button color="facebook" onClick={() => history.push("/register")}>Register</Button>
                            <Button color="green" onClick={login}>Log in</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Modal>
    );
}

export default Login;