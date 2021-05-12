import { ELIMINAR_PRODUCTO, MODIFICAR_PRODUCTO, OBTENER_PRODUCTO, OBTENER_PRODUCTOS, REGISTRAR_PRODUCTO } from '../../const/actionTypes';

export default (state, action) => {

  switch (action.type) {
    case OBTENER_PRODUCTOS:
      return {
        ...state,
        productosList: action.payload
      };
    case REGISTRAR_PRODUCTO:
      return {
        ...state,
        productosList: [action.payload, ...state.productosList]
      };
    case OBTENER_PRODUCTO:
      return {
        ...state,
        productoActual: action.payload
      };
    case MODIFICAR_PRODUCTO:
      return {
        ...state,
        productosList: state.productosList.map(
          producto => producto.id === action.payload.id ? action.payload : producto
        )
      };
    case ELIMINAR_PRODUCTO:
      return {
        ...state,
        productosList: state.productosList.filter( producto => producto.idCliente !== action.payload )
      }
    default:
      return state;
  }
}