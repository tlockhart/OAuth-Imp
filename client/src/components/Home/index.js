  
import React from "react";
// import styles from './styles.css';
// import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from "mdbreact";

let Home = function() {
    let divStyle = {
        backgroundImage: 'url(https://mdbootstrap.com/img/Photos/Others/model-3.jpg)', backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      };
    return (
        // <main role="main" className="flex-shrink-0">
        //     <div className="container">
        //         <h1 className="mt-5">Home Page</h1>
        //         {/* <p className="lead">Pin a footer to the bottom of the viewport in desktop browsers with this custom HTML and CSS.</p>
        //         <p>Use <a href="{{ site.baseurl }}/docs/{{ site.docs_version }}/examples/sticky-footer-navbar/">the sticky footer with a fixed navbar</a> if need be, too.</p> */}

        //     </div>
        // </main>
        // <!-- Intro Section -->
        <header>
        <div className="view jarallax" data-jarallax='{"speed": 0.2}' style={divStyle}>
          {/* <div class="mask rgba-white-light"> */}
            <div className="container h-100 d-flex justify-content-center align-items-center">
              <div className="row pt-5 mt-3">
                <div className="col-md-12 mb-3">
                  <div className="intro-info-content text-center">
                    <h1 className="display-3 mb-5 wow fadeInDown" data-wow-delay="0.3s">NEW
                      <a className="indigo-text font-weight-bold">COLLECTION</a>
                    </h1>
                    <h5 className="text-uppercase mb-5 mt-1 font-weight-bold wow fadeInDown" data-wow-delay="0.3s">Free
                      delivery & special prices</h5>
                    <a className="btn btn-outline-indigo btn-lg wow fadeInDown" data-wow-delay="0.3s">Shop</a>
                    <a className="btn btn-indigo btn-lg wow fadeInDown" data-wow-delay="0.3s">Lookbook</a>
                  </div>
                </div>
              </div>
            </div>
        {/* </div> */}
        </div>
    
    </header>
    //   <!--Main Navigation-->
    );
};

export default Home;