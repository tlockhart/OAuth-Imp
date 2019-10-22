import React from 'react';
import { MDBBtn } from "mdbreact";


let ProductInsertForm = (props) => {
    return (
        <main role="main" className="flex-shrink-0">
            <div className="container">
                <h1 className="mt-5">Product Insert Form</h1>
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
                        name="productName"
                        value={props.productName}
                        onChange={props.changeHandler}
                    />
                </div>
                <div className="form-group">
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
                    <br></br>
                    {/* <div > */}
                    {/* <!--Select IMAGE --> */}
                    <div className="custom-file">
                        <input
                            type="file"
                            className="custom-file-input"
                            id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01"
                            name="props.productImage"
                            // ref={node => this.productImage = node}
                            onChange={
                                (event) => 
                                {
                                    props.productImageClickHandler(event)
                                }
                            }
                        />
                        <label className="custom-file-label" id="img-select-label" htmlFor="inputGroupFile01">
                            {props.productImage}
                        </label>
                    </div>

                    {/* </div> */}


                    {/* insert button */}
                    <label htmlFor="formGroupExampleInput" />
                    <MDBBtn color="blue-grey" onClick={props.insertClickHandler}>Insert</MDBBtn>
                    <h3 className="mt-5">{props.message ? props.message : ''}</h3>

                    {/* Delete button */}
                    {/* <label htmlFor="formGroupExampleInput" />
                    <MDBBtn color="blue-grey" onClick={props.deleteClickHandler}>Delete</MDBBtn>
                    <h3 className="mt-5">{props.message? props.message:''}</h3> */}
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

export default ProductInsertForm;