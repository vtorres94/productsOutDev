import React from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { Button, Modal } from 'semantic-ui-react'
import { useFirebaseApp } from 'reactfire';

interface IProductDeleteProps extends RouteComponentProps<{ id: string, product: string }> {}
const ProductDelete = (props:IProductDeleteProps) => {
    const history = useHistory();
    const firebase = useFirebaseApp();

    const deleteProduct = () => {
        const cityRef = firebase.database().ref('products').child(props.match.params.id).remove()
        .then(response => {
            props.history.push("/")
        })
        .catch((error) => {
            console.log(error)
        })
    }
    return (
        <Modal
            open
            header='Delete'
            content={"Sure you want to delete the product : "+ props.match.params.product+ " ?"}
            actions={[
                { key: 'cancel', content: 'Cancel', color: "green", onClick: ()=> history.push("/") }, 
                { key: 'delete', content: 'Delete', color: "red", onClick: deleteProduct }]}
            closeIcon
            closeOnEscape
            closeOnDimmerClick
            closeOnTriggerBlur
        />
    )
}

export default ProductDelete