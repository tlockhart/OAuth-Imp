import React from 'react';

let ProductList = (props) => {
    let name = props.name;
    let nameText = `Name: ${name}`;
    let price = props.price;
    let priceText = `p: ${price}`;
    console.log('in productLIst:', props);
    
    return(
        <div className = "container-fluid text-center">
            <div className = "row">
                <div className = "col">
                    <p className = "mt-2"><b>{name? nameText:'false'}</b></p>
                    <p>{priceText}<br /></p><hr />
                </div>
            </div>
        </div>
    )
};

export default ProductList;