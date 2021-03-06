import React from 'react';
import { MDBBtn, MDBRow, MDBCol } from "mdbreact";


let ProductUpdateForm = (props) => {
    return (
        <main role="main" className="flex-shrink-0">
            <div className="container">
                <h1 className="mt-5">Product Update Form</h1>
                <br />
                {/* email */}
                <div className="form-group">
                    {/* email */}
                    <label htmlFor="formGroupName" />
                    <MDBRow>
                        <MDBCol size="1">Name:</MDBCol>
                        <MDBCol size="11">
                            <input
                                type="text"
                                className="form-control product-name"
                                id="formGroupName"
                                placeholder={props.placeholderName}
                                name="productName"
                                value={props.productName}
                                onChange={props.changeHandler}
                            />
                        </MDBCol>

                    </MDBRow>
                    {/* <h2>{props.email}</h2> */}

                    {/* password */}
                    <label htmlFor="formGroupName" />
                    <MDBRow>
                        <MDBCol size="1">
                            Price:
                            </MDBCol>
                        <MDBCol>
                            <input
                                type="text"
                                className="form-control product-value"
                                id="formGroupValue"
                                placeholder={props.placeholderValue}
                                name="productValue"
                                value={props.productValue}
                                onChange={props.changeHandler}
                            />
                        </MDBCol></MDBRow>
                    {/* <h2>{props.password}</h2> */}

                    {/* Update button */}
                    <label htmlFor="formGroupName" />
                    <MDBBtn color="blue-grey" onClick={props.updateClickHandler}>Update</MDBBtn>
                    <h3 className="mt-5">{props.message ? props.message : ''}</h3>

                    {/* Delete button */}
                    {/* <label htmlFor="formGroupName" />
                    <MDBBtn color="blue-grey" onClick={props.deleteClickHandler}>Delete</MDBBtn>
                    <h3 className="mt-5">{props.message? props.message:''}</h3> */}
                </div>
                {/* experiment */}
                {/* <label htmlFor="formGroupName">
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