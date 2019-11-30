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
                    {/* email */}
                    <div className="product-name-value-form-group">
                        {/* email */}
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
                        {/* <h2>{props.email}</h2> */}

                        {/* password */}
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
                        {/************Currently Used: SUBMIT PRODUCT/VALUE UPLOAD ************** /}
                    {/* insert button */}
                        <label htmlFor="formGroupExampleInput" />
                        <MDBBtn color="blue-grey" onClick={props.insertClickHandler}>Submit</MDBBtn>
                        <h3 className="mt-5">{props.message ? props.message : ''}</h3>
                        {/* {/*****************************image end ************** /} */}
                    </div>
                    {/*************TEST ELEMENT******************/}
                    {/* MDB REACT COMPONENT: BROWSE IMAGE BUTTON*/}
                    <div className="custom-file">
                        <input
                            type="file"
                            className="custom-file-input"
                            id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01"
                            name="props.productImage"
                            // ref={node => this.productImage = node}
                            onChange={
                                (event) => {
                                    props.productImageClickHandler(event, document.getElementById("inputGroupFile01"))
                                }
                            }
                        />
                        <label 
                            className="custom-file-label" 
                            id="img-select-label" 
                            htmlFor="inputGroupFile01">
                            {props.productImageName}
                        </label>
                        {/* <br></br> */}
                    </div>
                    
                    {/********************************/}

                    {/*************Currently Used: Image Upload **************/}
                    {/* SUPERHERO API IMAGE UPLOAD */}
                    <div role="main" className="product-image-form-group">
                    <br></br>
                        <Uploader imageName={props.productImageName} image={props.image} submitImageHandler={props.submitImageHandler} />
                    </div>
                    {/*****************************image end ***************/}  
                </div>
            </main >
        )
    }
};

export default ProductInsertForm;