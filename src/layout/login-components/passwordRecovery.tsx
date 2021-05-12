import React, { useState } from 'react';
import { Modal, Segment, Header, Input, Button, Grid, Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useFirebaseApp, useUser } from 'reactfire';
import 'firebase/auth';

interface IPasswordRecoveryProps {}

interface IPasswordRecoveryState {
    email: string
}

const PasswordRecovery = (props: IPasswordRecoveryProps) => {

    const firebase = useFirebaseApp();
    const user = useUser();
    const history = useHistory();

    const [state, setState] = useState<IPasswordRecoveryState>({
        email: ''
    })

    const recovery = async() => {
        await firebase.auth().sendPasswordResetEmail(state.email)
            .then(() => {
                history.push('/')
            })
            .catch((error) => {
                console.log(error)
            })
    }


    return(
        <Modal 
            textAllign="center" 
            closeIcon
            onClose={() => history.push("/")}
            open={!user.data}
        >
            <Modal.Header>Products <Icon name="product hunt"/></Modal.Header>
            <Segment textAlign="center">
                <Header>
                    <Header.Content>Password recovery</Header.Content>
                </Header>
                <Grid columns={1}>
                    <Grid.Row>
                        <Grid.Column>
                        <Input icon="user" placeholder="email" value={state.email} onChange={event => setState({...state, email: event.target.value})}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <a href="/login">Have any account? Login</a>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Button color="facebook" onClick={() => history.push("/register")}>Register</Button>
                            <Button color="green" onClick={recovery}>Send email</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Modal>
    );
}

export default PasswordRecovery;