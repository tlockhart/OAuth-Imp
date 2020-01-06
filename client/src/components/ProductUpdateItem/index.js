import React from 'react';
// import ViewProductBtn from '../ViewProductBtn';
import UpdateProductBtn from '../ProductUpdateBtn';

let ProductUpdateItem = (props) => {
  let name = props.name;
  let nameText = `Name: ${name}`;
  let value = props.value;
  let valueText = `Price: $${value}`;
  let id = props.id;
  console.log('in productLIst:', props);

  return (
    <div className="container-fluid text-center">
      <div className="row">
        <div className="col">
          <p className="mt-2"><b>{name ? nameText : 'false'}</b></p>
          <p>{valueText}<br /></p>
          {/* <ViewProductBtn to={
            {
              pathname: `/products/product/${id}`,
              state: {
                name: name,
                value: value,
                id: id,
              }
            }}
            buttonName={"View"}/> */}

          <ProductUpdateBtn to={
            {
              pathname: `/products/product/update/${id}`,
              state: {
                name: name,
                value: value,
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

export default ProductUpdateItem;