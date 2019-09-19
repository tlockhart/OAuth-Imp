import React from 'react';
import ViewProductsBtn from '../ViewProductsBtn';

let ProductList = (props) => {
  let name = props.name;
  let nameText = `Name: ${name}`;
  let price = props.price;
  let priceText = `$: ${price}`;
  let id = props.id;
  console.log('in productLIst:', props);

  return (
    <div className="container-fluid text-center">
      <div className="row">
        <div className="col">
          <p className="mt-2"><b>{name ? nameText : 'false'}</b></p>
          <p>{priceText}<br /></p>
          <ViewProductsBtn to={
            {
              pathname: `/products/product/${id}`,
              state: {
                name: name,
                price: price,
                id: id,
              }
            }}
            buttonName={"View"}/>

          <ViewProductsBtn to={
            {
              pathname: `/products/product/update/${id}`,
              state: {
                name: name,
                price: price,
                id: id,
              }
            }
          }
          buttonName={"Update"}/>
          <hr />
        </div>
      </div>
    </div>
  )
};

export default ProductList;