import React from 'react';
// import ViewProductBtn from '../ViewProductBtn';
// import LinkActionBtn from '../LinkActionBtn';

let ProductItem = (props) => {
  let name = props.name;
  let nameText = `Name: ${name}`;
  let value = props.value;
  let valueText = `Price: $${value}`;
  let id = props.id;
  // let regex = /['"']+/g;
  let image = props.image;
  // .replace(regex, '');
  console.log('in productLIst:', props);

  return (
    <div className="container-fluid text-center">
      <div className="row">
        <div className="col">
        <br></br>
          <img src={image} alt={`product ${id}`} />
          <p className="mt-2"><b>{name? nameText: ''}</b></p>
          <p><b>{value ? valueText: ''}</b><br /></p>
          <hr />
        </div>
      </div>
    </div>
  )
};

export default ProductItem;