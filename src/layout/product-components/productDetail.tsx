import React from 'react'
import { Modal, Icon, Grid, Header, Input, Segment, Button, Image } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import IProducto from '../../model/product.model';

interface IProductDetailProps {
    product: IProducto;
    open: boolean
    handleClose: any
}

const ProductDetail = (props: IProductDetailProps) => {

    const history = useHistory();
    const { product } = props;
    return(
        <Modal 
            textAllign="center" 
            closeIcon
            onClose={props.handleClose}
            open={props.open}
            size="tiny"
            closeOnEscape
            closeOnDimmerClick
            closeOnTriggerBlur
        >
            <Modal.Header>Detail <Icon name="product hunt"/></Modal.Header>
            <Segment textAlign="center">
                <Header>
                    <Header.Content>{product.product}</Header.Content>
                </Header>
                <Image size="small" src={'data:image/jpeg;base64,'+ product.imageBase64} centered/>
                <Header>
                    <Header.Content>{product.category}</Header.Content>
                    <Header.Subheader>{product.description}</Header.Subheader>
                </Header>
                <Button circular icon="minus" color="red" onClick={() => history.push("/products/" + product.id + "/"+ product.product +"/delete")}/>
                <Button circular icon="pencil" color="facebook" onClick={() => history.push("/products/" + product.id + "/edit")}/>
            </Segment>
        </Modal>
    );
}

export default ProductDetail;