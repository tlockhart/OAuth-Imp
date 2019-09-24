import React from 'react';
import { MDBBtn } from "mdbreact";


let RegistrationForm = (props) => {
    return (
        <main role="main" className="flex-shrink-0">
            <div className="container">
                <h1 className="mt-5">Registration Form</h1>
                <br />
                {/* email */}
                <div className="form-group">
                    {/* email */}
                    <label htmlFor="formGroupExampleInput" />
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder="email"
                        name = "email"
                        value = {props.email}
                        onChange = {props.changeHandler}
                    />
                    {/* <h2>{props.email}</h2> */}

                    {/* password */}
                    <label htmlFor="formGroupExampleInput" />
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder="password"
                        name="password"
                        value={props.password}
                        onChange={props.changeHandler}
                    />
                    {/* <h2>{props.password}</h2> */}

                    {/* button */}
                    <label htmlFor="formGroupExampleInput" />
                    <MDBBtn color="blue-grey" onClick={props.clickHandler}>Submit</MDBBtn>
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

export default RegistrationForm;