import React, { useState } from 'react'
import { Modal, Segment, Header, Input, Button, Grid, Icon, Label } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useFirebaseApp, useUser } from 'reactfire';
import 'firebase/auth';

interface IRegisterProps {}

interface IRegisterState {
    email: string,
    password: string
    confirmPassword: string,
    validEmail: boolean,
    validPassword: boolean,
    validConfirmPassword: boolean,
    validSignin: boolean,
    errorMessage: string
}
const Register = (props: IRegisterProps) => {
    const [state, setState] = useState<IRegisterState>({
        email: '',
        password: '',
        confirmPassword: '',
        validEmail: true,
        validPassword: true,
        validConfirmPassword: true,
        validSignin: true,
        errorMessage: ''
    });
    const firebase = useFirebaseApp();
    const user = useUser();
    const history = useHistory();

    const signIn = () => {
        let validEmail;
        let validPassword;
        let validConfirmPassword;
        validEmail= state.email !== '' ? true : false
        validPassword= state.password !== '' && state.password.length >= 8 ? true : false
        validConfirmPassword= state.password === state.confirmPassword ? true : false 

        if(validEmail && validPassword && validConfirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(state.email, state.password)
                .then(response => {
                    history.push("/");
                })
                .catch((error) => {
                    setState({ ...state, validSignin: false, errorMessage: error.message })
                })
        }
        setState({
            ...state,
            validEmail: validEmail,
            validPassword: validPassword,
            validConfirmPassword: validConfirmPassword 
        })
    }


    return(
        <Modal 
            open={!user.data}
            textAllign="center" 
            closeIcon
            onClose={() => history.push("/")}
            closeOnEscape
            size="tiny"
            closeOnDimmerClick
            closeOnTriggerBlur
        >
            <Modal.Header>Products <Icon name="product hunt"/></Modal.Header>
            <Segment textAlign="center">
                <Header>
                    <Header.Content>Register</Header.Content>
                </Header>
                <Grid columns={1}>
                    <Grid.Row>
                        <Grid.Column>
                        <Input 
                            icon="user"
                            placeholder="email" 
                            onChange={event => 
                                setState({ 
                                    ...state, 
                                    email:event.target.value,
                                    validEmail: event.target.value !== '' ? true : false,
                                    validSignin: true
                                })
                            }
                        />
                        </Grid.Column>
                    </Grid.Row>
                    {!state.validEmail ? (
                    <Grid.Row>
                          <Label basic color="red" pointing="above" attached="bottom">
                            Field required
                          </Label>
                    </Grid.Row>
                    ) : null}
                    <Grid.Row>
                        <Grid.Column>
                            <Input 
                                icon="key" 
                                placeholder="password" 
                                type="password" 
                                onChange={event => setState({ 
                                    ...state, 
                                    password: event.target.value,
                                    validPassword: event.target.value !== '' ? true : false,
                                    validSignin: true
                                })}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    {!state.validPassword ? (
                    <Grid.Row>
                          <Label basic color="red" pointing="above" attached="bottom">
                            Field need 8 characters
                          </Label>
                    </Grid.Row>
                    ) : null}
                    <Grid.Row>
                        <Grid.Column>
                            <Input 
                                icon="key" 
                                placeholder="confirm" 
                                type="password" 
                                onChange={event => setState({ 
                                    ...state, 
                                    confirmPassword: event.target.value,
                                    validConfirmPassword: event.target.value === state.password ? true : false,
                                    validSignin: true
                                })}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    {!state.validConfirmPassword ? (
                    <Grid.Row>
                          <Label basic color="red" pointing="above" attached="bottom">
                            Passwords are diferents
                          </Label>
                    </Grid.Row>
                    ) : null}
                    {!state.validSignin && state.validEmail && state.validPassword && state.validConfirmPassword ? (
                    <Grid.Row>
                        <Label basic color="red" pointing="above" attached="bottom">
                            {state.errorMessage}
                        </Label>
                    </Grid.Row>
                    ) : null}
                    <Grid.Row>
                        <Grid.Column>
                            <a href="/login">Have any account? Login</a>
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