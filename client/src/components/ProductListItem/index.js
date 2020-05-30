import React from 'react';
// import ProductViewBtn from '../ProductViewBtn';
// import ProductUpdateBtn from '../ProductUpdateBtn';
import LinkActionBtn from '../LinkActionBtn';
import NoLinkActionBtn from '../NoLinkActionBtn';
import Can from "../Can";
// import { Redirect } from 'react-router';
// import rules from '../../utils/rbac-rule';

let ProductListItem = (props) => {
  let name = props.name;
  let nameText = `Name: ${name}`;
  let value = props.value;
  let valueText = `Price: $${value}`;
  let id = props.id;
  let regex = /['"']+/g;
  let productImage = props.productImage.replace(regex, '');
  let userRole = props.role;
  console.log("PRODUCTLISTITEM-USERRole:", userRole);

  // const CanUser = Can(props);
  // const CanUser = Can;

  return (
    <div className="container-fluid text-center" id={id}>
      <div className="row">
        <div className="col">
          <br></br>
          <img src={productImage} alt={`product ${id}`} />
          <p className="mt-2"><b>{name ? nameText : 'false'}</b></p>
          <p>{valueText}<br /></p>

          <Can
            role={userRole}
            perform="products:update"
            yes={() => (
              <>
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
              </>)}
            no={() => (<></>)}
          />

          <Can
            role={userRole}
            perform="products:delete"
            yes={() => (
              <>
                <NoLinkActionBtn
                  buttonName={"Delete"} btnClickHandler={event => props.deleteClickHandler(event)}
                  id={id} />
              </>)}
            no={() => (<></>)}
          />

          <Can
            role={userRole}
            perform="products:details"
            yes={() => (
              <>
                <LinkActionBtn to={
                  {
                    pathname: `/products/product/${id}`,
                    state: {
                      name: name,
                      value: value,
                      id: id,
                      image: productImage
                    }
                  }}
                  buttonName={"View"} />
              </>)}
            no={() => (<></>)}
          />

          <Can
            role={userRole}
            perform="products:hide"
            yes={() => (
            <>
            <NoLinkActionBtn
                  buttonName={"Hide"} btnClickHandler={event => props.filterClickHandler(event)}
                  id={id} />
            </>)}
            no={() => (<></>)}
          />
          <hr />
        </div>
      </div>
    </div>
  )
};

export default ProductListItem;