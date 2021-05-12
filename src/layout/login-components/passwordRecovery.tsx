import React, { useState } from 'react';
import { Modal, Segment, Header, Input, Button, Grid, Icon, Label } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useFirebaseApp, useUser } from 'reactfire';
import 'firebase/auth';

interface IPasswordRecoveryProps {}

interface IPasswordRecoveryState {
    email: string,
    validEmail: boolean,
    validRecovery: boolean,
    errorMessage: string
}

const PasswordRecovery = (props: IPasswordRecoveryProps) => {

    const firebase = useFirebaseApp();
    const user = useUser();
    const history = useHistory();

    const [state, setState] = useState<IPasswordRecoveryState>({
        email: '',
        validEmail: true,
        validRecovery: true,
        errorMessage: ''
    })

    const recovery = () => {
        let validEmail;

        validEmail = state.email !== '' ? true : false;
        if(validEmail) {
            firebase.auth().sendPasswordResetEmail(state.email)
                .then(() => {
                    history.push('/')
                })
                .catch((error) => {
                    console.log(error)
                    setState({ ...state, validRecovery: false, errorMessage: error.message })
                })
        }
        setState({ ...state, validEmail: validEmail })
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
                    <Header.Content>Password recovery</Header.Content>
                </Header>
                <Grid columns={1}>
                    <Grid.Row>
                        <Grid.Column>
                        <Input
                            icon="user"
                            placeholder="email"
                            value={state.email}
                            onChange={event => setState({
                                ...state, 
                                email: event.target.value,
                                validEmail: event.target.value !== '' ? true : false,
                            })}
                        />
                        </Grid.Column>
                    </Grid.Row>
                    {!state.validEmail ? (
                    <Grid.Row>
                        <Label basic color="red" pointing="above" attached="bottom">
                            Field required
                        </Label>
                    </Grid.Row>
                    ): null}
                    {!state.validRecovery && state.validEmail ? (
                    <Grid.Row>
                        <Label basic color="red" attached="bottom">
                            {state.errorMessage}
                        </Label>
                    </Grid.Row>
                    ): null}
                    <Grid.Row>
                        <Grid.Column>
                            <a href="/login">Have any account? Login</a>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Button color="facebook" onClick={() => history.push("/register")}>Register</Button>
                            <Button color="green" onClick={() => recovery()}>Send email</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Modal>
    );
}

export default PasswordRecovery;