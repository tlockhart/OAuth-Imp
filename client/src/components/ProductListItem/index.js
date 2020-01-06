import React from 'react';
// import ProductViewBtn from '../ProductViewBtn';
// import ProductUpdateBtn from '../ProductUpdateBtn';
import LinkActionBtn from '../LinkActionBtn';
import NoLinkActionBtn from '../NoLinkActionBtn';
import Can from "../Can";
import { Redirect } from 'react-router';
// import rules from '../../utils/rbac-rule';

let ProductListItem = (props) => {
  let name = props.name;
  let nameText = `Name: ${name}`;
  let value = props.value;
  let valueText = `Price: $${value}`;
  let id = props.id;
  let regex = /['"']+/g;
  let productImage = props.productImage.replace(regex, '');
  let user = props.user;
  console.log("PRODUCTLISTITEM-USER:", user);

  // const CanUser = Can(props);
  const CanUser = Can;

  return (
    <div className="container-fluid text-center" id={id}>
      <div className="row">
        <div className="col">
          <br></br>
          <img src={productImage} alt={`product ${id}`} />
          <p className="mt-2"><b>{name ? nameText : 'false'}</b></p>
          <p>{valueText}<br /></p>

          {/* LINK BUTTON */}
          {/* {(props) => ( */}
          <Can
            role={user.role}
            perform="dashboard-page:visit"
            // data= {props.user.data}
            yes={() => (
              <React.Fragment>
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
                {/* <LinkActionBtn to={
                    {
                      pathname: `/product/insert`,
                      state: {
                        name: name,
                        value: value,
                      }
                    }
                  }
                    buttonName={"Insert"} /> */}
                <NoLinkActionBtn buttonName={"Delete"} btnClickHandler={event => props.deleteClickHandler(event)} id={id} />
              </React.Fragment>
            )}
            no={() => (
              <React.Fragment>
                <LinkActionBtn to={
                  {
                    pathname: `/products/product/${id}`,
                    state: {
                      name: name,
                      value: value,
                      id: id,
                      image: productImage                    }
                  }}
                  buttonName={"View"} />
                <NoLinkActionBtn buttonName={"Hide"} btnClickHandler={event => props.filterClickHandler(event)} id={id} />
              </React.Fragment>
            )}
          // {() => <Redirect to="/" />}
          />
          {/* )} */}




          <hr />
        </div>
      </div>
    </div>
  )
};

export default ProductListItem;