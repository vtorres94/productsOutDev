import React, { useEffect, useState } from 'react'
import { Input, Segment, Item, Button, Header } from 'semantic-ui-react'
import { useUser, useFirebaseApp } from 'reactfire';
import { useHistory } from 'react-router-dom';
import IProducto from '../../model/product.model';
import ProductDetail from './productDetail';

interface IProductsProps {}

interface IProductsState {
  productFilter: string,
  product: IProducto,
  openModal: boolean
}
const Products = (props?: IProductsProps) => {

  const history = useHistory();
    const user = useUser();
    const [state, setState] = useState<IProductsState>({
      productFilter: '',
      product: {},
      openModal: false
    })

    const [productsList, setProductsList] = useState<IProducto[]>();
    const firebase = useFirebaseApp();

    useEffect(() => {
      getProducts()
    }, []);

    const getProducts = async() => {
      const dbRef = firebase.database().ref("products");
      await dbRef.on('value', (snapshot) => {
        const prod = snapshot.val();
        const prodList = []
        for(let id in prod) {
          prodList.push({
            "id" : id,
            "product" : prod[id].product,
            "category": prod[id].category,
            "description": prod[id].description,
            "imageBase64": prod[id].imageBase64
          });
          console.log(prod[id].product)
        }
        setProductsList(prodList)
      })
    }

    const handleClose = () => {
      setState({ ...state, product: {}, openModal: false })
    }

    return (
      <Segment textAlign="center">
        <Input placeholder="Search" value={state.productFilter} onChange={event => setState({ ...state, productFilter: event.target.value })}/>
        <Header>
          <Header.Content>Products</Header.Content>
          <Header.Subheader>{user.data ? user.data.email : 'No ha iniciado sesión'}</Header.Subheader>
        </Header>
        <Button circular icon="plus" color="facebook" hint="create" onClick={() => history.push("/products/new")}></Button>
        <Segment className={"products-container"}>
          <Item.Group divided>
            {productsList ? productsList
            .filter(f => state.productFilter !== '' ? f.product?.toLowerCase().includes(state.productFilter.toLowerCase()) ? f : null : f)
            .map(p => {
              return (
            <Item size="tiny" onClick={() => setState({ ...state, product: p, openModal: true })}>
              <Item.Image size="tiny" src={'data:image/jpeg;base64,'+p?.imageBase64} />
              <Item.Content >
                <Item.Header as="a">{p?.product}</Item.Header>
                <Item.Meta>{p?.category}</Item.Meta>
                <Item.Description>
                  {p?.description}
                </Item.Description>
              </Item.Content>
            </Item>
              )
            }): null}
          </Item.Group>
        </Segment>
        <ProductDetail product={state.product} open={state.openModal} handleClose={handleClose}/>
      </Segment>
    );
}

export default Products;