import React from 'react';
import { MDBBtn } from "mdbreact";


let ProductUpdateForm = (props) => {
    return (
        <main role="main" className="flex-shrink-0">
            <div className="container">
                <h1 className="mt-5">Product Update Form</h1>
                <br />
                {/* email */}
                <div className="form-group">
                    {/* email */}
                    <label htmlFor="formGroupExampleInput" />
                    <input
                        type="text"
                        className="form-control product-name"
                        id="formGroupExampleInput"
                        placeholder={props.placeholderName}
                        name = "productName"
                        value = {props.productName}
                        onChange = {props.changeHandler}
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
                    {/* <h2>{props.password}</h2> */}

                    {/* button */}
                    <label htmlFor="formGroupExampleInput" />
                    <MDBBtn color="blue-grey" onClick={props.clickHandler}>Submit</MDBBtn>
                    {/* <h3 className="mt-5">{props.message? props.message:''}</h3>
                    <h3 className="mt-5">{props.token? props.token:''}</h3> */}
                    <h3 className="mt-5">{props.message? props.message:''}</h3>
                </div>
                {/* experiment */}
                {/* <label htmlFor="formGroupExampleInput">
                    Input Credentials
                    </label>
                <MDBContainer>
                    <MDBInputGroup
                        containerClassName="mb-3"
                        prepend={
                            <>
                                <span className="input-group-text" id="basic-addon">
                                    <i className="fa fa-user prefix"></i>
                                </span>
                            </>
                        }
                    />
                    <MDBInputGroup
                        containerClassName="mb-3"
                        prepend={
                            <>
                                <span className="input-group-text" id="basic-addon" >
                                    <i className="fa fa-unlock prefix"></i>
                                </span>
                            </>
                        }
                    />
                </MDBContainer> */}
            </div>
        </main >
    )
};

export default ProductUpdateForm;