import React from 'react';
// import ProductViewBtn from '../ProductViewBtn';
// import ProductUpdateBtn from '../ProductUpdateBtn';
import LinkActionBtn from '../LinkActionBtn';
import NoLinkActionBtn from '../NoLinkActionBtn';

let ProductListItem = (props) => {
  let name = props.name;
  let nameText = `Name: ${name}`;
  let value = props.value;
  let valueText = `$: ${value}`;
  let id = props.id;
  // let key = props.key;
  // console.log('in productLIst:', props);

  return (
    <div className="container-fluid text-center" id={id}>
      <div className="row">
        <div className="col">
          <p className="mt-2"><b>{name ? nameText : 'false'}</b></p>
          <p>{valueText}<br /></p>
          <LinkActionBtn to={
            {
              pathname: `/products/product/${id}`,
              state: {
                name: name,
                value: value,
                id: id,
              }
            }}
            buttonName={"View"} />

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
            buttonName={"Update"} />
            
            <LinkActionBtn to={
            {
              pathname: `/product/insert`,
              state: {
                name: name,
                value: value,
              }
            }
          }
            buttonName={"Insert"} />

          <NoLinkActionBtn buttonName={"Hide"} btnClickHandler={event =>props.filterClickHandler(event)} id={id}/>

          <NoLinkActionBtn buttonName={"Delete"} btnClickHandler={event=>props.deleteClickHandler(event)} id={id} />
          <hr />
        </div>
      </div>
    </div>
  )
};

export default ProductListItem;