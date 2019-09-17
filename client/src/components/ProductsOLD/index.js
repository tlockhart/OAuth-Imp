import React from 'react';
import { MDBContainer, MDBInputGroup, MDBBtn } from "mdbreact";

let ProductFormOLD = (props) => {
    return (
        <main role="main" className="flex-shrink-0">
            <div className="container">
            <h1 className="mt-5">Products Form</h1>
                <br />
                
                {/* <p className="lead">Pin a footer to the bottom of the viewport in desktop browsers with this custom HTML and CSS.</p>
                <p>Use <a href="{{ site.baseurl }}/docs/{{ site.docs_version }}/examples/sticky-footer-navbar/">the sticky footer with a fixed navbar</a> if need be, too.</p> */}

                <label htmlFor="formGroupExampleInput" />
                <MDBBtn color="blue-grey" onClick={props.clickHandler}>Submit</MDBBtn>
                <h3 className="mt-5">Test</h3>

            </div>
        </main>
    )
};

export default ProductFormOLD;