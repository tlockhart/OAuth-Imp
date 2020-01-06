import React from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Uploader } from '../ImageUploader';


let ProductInsertForm = (props) => {
    console.log("PRODUCTINSERTINPUTS", props.image);
    console.log("PRODUCTINSERT FileTypes", props.image.fileTypes);
    return (
        <main>
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <form onSubmit={props.insertClickHandler}>
                            <h1 className="mt-5">Product Insert Form</h1>
                            <br />
                            <div className="product-name-value-form-group">
                                {/* Product Name */}
                                <label htmlFor="formGroupProductName" />
                                <MDBRow>
                                    <MDBCol size="1">
                                        Name:
                                        </MDBCol>
                                    <MDBCol>
                                        <input
                                            type="text"
                                            className="form-control product-name"
                                            id="formGroupProductName"
                                            placeholder={props.placeholderName}
                                            name="productName"
                                            value={props.productName}
                                            onChange={props.changeHandler}
                                        />
                                    </MDBCol>
                                </MDBRow>

                                {/* Product Value */}
                                <label htmlFor="formGroupProductValue" />
                                <MDBRow>
                                    <MDBCol size="1">Price:
                                            </MDBCol>
                                    <MDBCol>
                                        <input
                                            type="text"
                                            className="form-control product-value"
                                            id="formGroupProductValue"
                                            placeholder={props.placeholderValue}
                                            name="productValue"
                                            value={props.productValue}
                                            onChange={props.changeHandler}
                                        />
                                    </MDBCol>
                                </MDBRow>
                                <br />
                                <MDBRow>
                                    {/* REQUIREMENTS */}
                                    <MDBCol size="12">Image Requirements (PNG, JPG):<br />
                                        <MDBCol size="7">
                                        <div className="col-12">
                                            <b>Filesize:</b> &#60; {props.image.maxMB}MB, <b>Dimensions: </b>
                                            Min: {props.image.imageMin}, Max: {props.image.imageMax}
                                        </div>
                                        </MDBCol>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow role="main" className="upload-image-form-group">
                                    <br></br>
                                    <Uploader image={props.image}
                                        submitImageHandler={props.submitImageHandler}
                                        productImage={props.productImage}
                                        selectImage={props.selectImage}
                                        setImageProp={props.setImageProp} />
                                    <MDBCol>
                                        {/******SUBMIT BUTTON: PRODUCT/VALUE UPLOAD*********/}
                                        <label htmlFor="formGroupSubmitButton" />
                                        <MDBBtn color="blue-grey" type="submit"
                                        >Submit</MDBBtn>
                                        <h3 className="mt-5">{props.message ? props.message : ''}</h3>
                                    </MDBCol>
                                </MDBRow>
                            </div>
                        </form>
                    </MDBCol>

                </MDBRow>

            </MDBContainer>


            {/*************Currently Used: Image Upload **************/}
            {/* SUPERHERO API IMAGE UPLOAD */}
            {/* <div role="main" className="product-image-form-group">
                    <br></br>
                    <Uploader image={props.image} submitImageHandler={props.submitImageHandler} productImageClickHandler={props.productImageClickHandler} />
                </div> */}
            {/*****************************image end ***************/}
            {/* </div> */}
        </main >
    )
    // }
};

export default ProductInsertForm;