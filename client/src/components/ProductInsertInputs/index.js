import React from 'react';
import { MDBBtn } from "mdbreact";
import { Uploader } from '../Image'


let ProductInsertForm = (props) => {
    console.log("PRODUCTINSERTINPUTS", props.image);
    console.log("PRODUCTINSERT FileTypes", props.image.fileTypes);
    if (props.image) {
        return (
            // <main role="main" className="flex-shrink-0">
            // {/* <main role="main" className="d-flex"> */}
            <main>
                <div className="container-fluid">
                    <h1 className="mt-5">Product Insert Form</h1>
                    <br />
                    <div className="product-name-value-form-group">
                        {/* Product Name */}
                        <label htmlFor="formGroupExampleInput" />
                        <input
                            type="text"
                            className="form-control product-name"
                            id="formGroupExampleInput"
                            placeholder={props.placeholderName}
                            name="productName"
                            value={props.productName}
                            onChange={props.changeHandler}
                        />
                        {/* Product Value */}
                        <label htmlFor="formGroupExampleInput" />
                        <input
                            type="text"
                            className="form-control product-value"
                            id="formGroupExampleInput"
                            placeholder={props.placeholderValue}
                            name="productValue"
                            value={props.productValue}
                            onChange={props.changeHandler}
                        />
                        {/******SUBMIT BUTTON: PRODUCT/VALUE UPLOAD*********/}
                        <label htmlFor="formGroupExampleInput" />
                        <MDBBtn color="blue-grey" onClick={props.insertClickHandler}>Submit</MDBBtn>
                        <h3 className="mt-5">{props.message ? props.message : ''}</h3>
                    </div>
                    {/*************Currently Used: Image Upload **************/}
                    {/* SUPERHERO API IMAGE UPLOAD */}
                    <div role="main" className="product-image-form-group">
                    <br></br>
                        <Uploader image={props.image} submitImageHandler={props.submitImageHandler} productImageClickHandler = {props.productImageClickHandler}/>
                    </div>
                    {/*****************************image end ***************/}  
                </div>
            </main >
        )
    }
};

export default ProductInsertForm;