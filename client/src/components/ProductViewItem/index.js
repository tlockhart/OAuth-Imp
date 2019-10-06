import React from 'react';
// import ViewProductBtn from '../ViewProductBtn';
import LinkActionBtn from '../LinkActionBtn';

let ProductItem = (props) => {
  let name = props.name;
  let nameText = `Name: ${name}`;
  let value = props.value;
  let valueText = `$: ${value}`;
  let id = props.id;
  console.log('in productLIst:', props);

  return (
    <div className="container-fluid text-center">
      <div className="row">
        <div className="col">
          <p className="mt-2"><b>{name ? nameText : 'false'}</b></p>
          <p>{valueText}<br /></p>

          <LinkActionBtn to={
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

export default ProductItem;