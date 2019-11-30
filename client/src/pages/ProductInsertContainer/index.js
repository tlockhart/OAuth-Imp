import React, { Component } from "react";

// Import Server-Side Utilities:
// import API from '../utils/API';

// Import module to get/set variables from/in the LocalStorage
import dataStore from '../../utils/dataStore';

// Import Components
import ProductInsertInputs from "../../components/ProductInsertInputs";
import credentialStore from '../../utils/credentialStore';
import { insertProduct, performDBAction } from '../../utils/productStore';
import { submitImageHandler } from "./utils/actionHelpers";
import { setFileMessage, removeCanvas, isFileSelected,  convertImageFromUrlToBase64String } from './utils/imageHelpers';

const moment = require('moment');

class ProductInsertContainer extends Component {
    constructor(props) {
        super(props);
        this.refreshURL = '/user/login/refresh';
        this.baseURL = '/products/product/insert/';
        this.state = {
            productId: '',
            productName: '',
            productValue: '',
            placeholderName: '',
            placeholderValue: '',
            authToken: '',
            refresh_token: '',
            email: '',
            hasTimeExpired: false,
            isUserAuthorized: true,
            message: '',
            // imgLabelContent: '',
            // productImageName: '',
            // imglabelInnerHTML: 'CF'

            // Image imputs for Image Uploader component
            image: {
                input: null,
                file: null,
                previewCanvas: null,
                fileMsg: null,
                submitImage: null,
                fileTypes: [
                    'image/jpeg',
                    'image/jpg',
                    'image/png'
                ],
                imageName: '',
                imageWidth: 0,
                imageHeight: 0,
                imageSize: 0,
                imageSrc: '',
                imageMin: 200,
                imageMax: 450,
                maxMB: 2,
                errorTag: 'file-msg',
                invalidMsg: 'Not a valid file.',
                unacceptedMsg: 'File not accepted.',
                acceptedMsg: 'File accepted.',
                fileMsgElement: '',
                previewCanvasElement: '',
                submitImageElement: ''
            }
        };



        this.changeHandler = this.changeHandler.bind(this);
        // this.insertClickHandler = this.insertClickHandler.bind(this);
        this.productImageClickHandler = this.productImageClickHandler.bind(this);
        this.submitImageHandler = this.submitImageHandler.bind(this);

        this.message = this.message.bind(this);
    } // constructor
    /*************************************** */
    //set
    // setBrowseLabel(event);
    /****************************************** */
    async submitImageHandler(event, img) {
        // Don't refresh the page!
        event.preventDefault();
        
        let {
            input,
            imageWidth,
            imageHeight,
            imageMin,
            imageMax,
            imageName,
            imageSize,
            maxMB,
            errorTag,
            acceptedMsg,
            unacceptedMsg,
            fileMsgElement,
            previewCanvasElement,
            submitImageElement,
            imageSrc } = img;

        // set img props
        this.setState({ image: img });
        // if file selected
        if (isFileSelected(input)) {
            console.log("ActionHelper file selected");

            // checks image dimension and file size
            let isInputValid = false

            // Check Image Dimensions
            if (imageWidth >= imageMin && imageWidth <= imageMax && imageHeight >= imageMin && imageHeight <= imageMax) {
                isInputValid = true
            } else {
                isInputValid = false
            }

            // Check Image Size
            console.log("FileName:", imageName);
            console.log("FileSize:", imageSize);

            // Get Unit of Measure
            var unit = imageSize.slice(-2).toLowerCase();

            // Get FileSize
            var fileSizeNumber = imageSize.replace(/[^\d.-]/g, '');

            console.log("FILESIZE = " + fileSizeNumber + ", Unit = " + unit);
            console.log("Max File Size:", maxMB);

            if (unit === 'mb') {
                console.log("max file size:", maxMB, ", actual file size:", fileSizeNumber);
                if (fileSizeNumber <= maxMB) {
                    isInputValid = true
                } else {
                    isInputValid = false
                }
            }
            else if (unit === 'kb') {
                if (fileSizeNumber <= maxMB * 1000) {
                    isInputValid = true
                } else {
                    isInputValid = false
                }
            }

            // If input is not valid do not accept image and do nothing
            console.log("Is Input File Valid:", isInputValid);
            if (!isInputValid) {
                if (fileMsgElement) {
                    setFileMessage(errorTag, unacceptedMsg);
                } else {
                    setFileMessage(errorTag, acceptedMsg);
                }

                // show select image:
                // $('#select-btn').show()
            } else {
                // console.log ("Image is acceptable");
                var imageUrl = imageSrc;

                /******************************************************    Converts image to base64String
                ****************************************************/
                let base64StringImage = await convertImageFromUrlToBase64String(imageUrl);
                console.log("In the out");
                console.log("Converted Image: ", base64StringImage);
            }// else
            // remove canvas after submit
            removeCanvas(previewCanvasElement);
            var image = this.state.image;

            /*****************************/
            // 11/27/2019: Reset image Name
            /*******************************/
            // image.imageName = "No File Chosen";
            // this.setState({image: image});
            // setBrowseLabel(event);
            this.productImageClickHandler(event);
        } // if file selected

        console.log("SubmitImageHandler: file NOT selected");
        // disable submit-btn
        submitImageElement.disabled = true;
    }// submit-Image on click

    /***************************************************/

    // submitImageHandler = () => {submitImageHandler};
    async setStateVariables(access_token, refresh_token, expiration, email, message) {
        /************************************************
         * SET State VARIABLES FROM LocalStorage
         ************************************************/
        let authToken = "Bearer " + access_token;

        console.log("Auth token", authToken);
        this.setState({ authToken });

        console.log("Refresh token", refresh_token);
        this.setState({ refresh_token });

        this.setState({ email });

        let hasTimeExpired = await dataStore.hasTimeExpired();

        console.log("Expired?", hasTimeExpired);
        this.setState({ hasTimeExpired });

        this.setState({ isUserAuthorized: true });

        this.setState({ message });
        /************************************************/
    }

    resetStateVariables() {
        this.setState({ authToken: '' });
        this.setState({ access_token: '' });
        this.setState({ refresh_token: '' });
        this.setState({ email: '' });
        this.setState({ hasTimeExpired: false });
    }

    componentDidMount() {
        // if (this.props.match.params.product_id && this.props.location.state) {
        if (this.props.location.state) {
            /******************************************
             *  Get id off the URL Dynamic Segment
             * ****************************************/
            // const { product_id } = this.props.match.params;
            // console.log("Product_ID:", product_id);

            /********************************************
             * Pass item info from click button
             * *****************************************/
            const { name, value } = this.props.location.state;
            var image = this.state.image;
            image.imageName = "Choose File";
            this.setState({
                // productId: product_id,
                placeholderName: name,
                placeholderValue: `$ ${value}`,
                //11/27/2019
                // productImageName: "Choose File",
                image: image
            });
        }
    }

    changeHandler(event) {
        // First disable default behavior
        event.preventDefault();

        const {
            name,
            value
        } = event.target;

        if (name && typeof value === 'string') {
            this.setState(
                {
                    // set name computed property to the name of the element clicked, 
                    // and set the corresponding state property to the element's value
                    [name]: value,
                }
            );  // setState
        }
    } // changeHandler

    /************************************
    * stageDBActionis an integrator that passes an id and a callback function corresponding to the desired db action to be performed, and retrieves the new data and updates the state variables, to be displayed to screen. 
    ************************************/
    async stageDBAction(id, name, value, url, cb) {
        console.log("Start performDBAction");

        //EXECUTE CALLBACK FUNCTION AND RETURN RESULSTS
        let results = await performDBAction(id, this.state.refresh_token, this.state.authToken, this.state.hasTimeExpired, name, value, url, cb);

        /************************************
         * Set placeholder text if data was insertd
         ****************************************/
        if (results.message = "Action Completed") {
            if (name) {
                this.setState({ placeholderName: name });
            }
            if (value) {
                this.setState({ placeholderValue: value });
            }
        }
        console.log("Passed performDBAction");

        // let parsedResults = JSON.parse(results);
        let { message, refresh_token, isUserAuthorized, hasTimeExpired, productsList } = results;

        /***************************************************
         * Set State with the results of calling the DB Action
         *****************************************************/
        this.setState({
            message,
            refresh_token,
            isUserAuthorized,
            hasTimeExpired,
        });

        console.log("productListData =", productsList);
        // 10/15/2019: Set the rendering components
        this.productListData = productsList;
    }

    async insertClickHandler(event) {
        event.preventDefault();
        try {
            
            let name = this.state.productName;
            let value = this.state.productValue;

            /************************************************************************
             * Reset state variables representing view input after submit
             * **********************************************************************/
            this.setState({ productName: '' });
            this.setState({ productValue: '' });
            this.setState({ placeholderName: '' });
            this.setState({ placeholderValue: '' });

            /************************************
             * STEP1: Get Data out of local Storage
             ************************************/
            let { access_token, refresh_token, expiration, email, message } = await dataStore.getLocalStorage();
            /*************************************/

            /******************************************
             * STEP2: SET STATE VARIABLES With data returned from localStorage
             *******************************/
            await this.setStateVariables(access_token, refresh_token, expiration, email, message);

            console.log("HasTIMEExpired", this.state.hasTimeExpired);
            /******************************************
             * STEP3: Determine if Token Refresh is needed
             *******************************/
            if (this.state.hasTimeExpired) {
                console.log("ProductInsertContainer refresh-token: ", this.state.refresh_token);

                /***************************************
                 * STEP3: RefreshTokens: If tokens have expired
                 * **************************************/
                try {
                    /*********************************
                     * STEP4: Call credendentialStore to get refreshTokens and all other 
                     * credentials from the API, AND SET LOCAL STORAGE WITH RESULTS
                     *********************************/
                    let results = await credentialStore.get(this.state.refresh_token, this.refreshURL, this.state.authToken, this.state.email, this.state.hasTimeExpired);
                    /**************************/
                    console.log("RESULTS STATUS", results);
                    if (results) {
                        console.log("NEW ACCESS TOKENS HAVE BEEN RECEIVED RESULTS:", results);

                        /*********************************************
                         * STEP5: SET STATE VARIABLES RECEIVED FROM CREDENTIAL STORE
                         ********************************************/
                        let { access_token,
                            refresh_token,
                            expiration,
                            email,
                            message } = results;

                        // do something with response
                        console.log("ProductionInsert:response returned", results);

                        this.setStateVariables(access_token, refresh_token, expiration, email, message);

                        console.log("New AUTHTOKEN after Refresh:", this.state.authToken);
                        /********************************************/
                    }
                    else {
                        console.log("I NEVER MADE IT TO IF");
                    }
                }
                catch (err) {
                    // Clear all localStorage, due to invalid Refresh token
                    console.log("ERRORED OUT IN Insert CATCH");
                    if (err.response.status === 401) {
                        console.log('401 status received in ProductInsert');
                        /***********************************************
                         * Reset Local Storage Variables
                         ************************************************/
                        await dataStore.resetLocalStorage();

                        /*********************************************
                         * SET STATE VARIABLES FROM Local Storage
                         *********************************************/
                        await this.resetStateVariables();
                        console.log('err', err.response);
                        console.log('error status code', err.response.status);
                        this.setState({ isUserAuthorized: false });
                        console.log("isUserAuthorised = ", this.state.isUserAuthorized);
                        this.setState({ message: err.response.data.message });
                    } // if
                } // catch
            }
            console.log("AUTHORIZED?:", this.state.isUserAuthorized);
            if (this.state.isUserAuthorized) {
                // Refresh_Token should be temporarily set to 'norefresh' in productionAction, as tokens should NOT be refreshed
                // this.setState({ refresh_token: 'norefresh' });

                console.log('ProductInsertContainer:refresh_token = ', this.state.refresh_token);

                /***********************************************
                 * Step6: PERFORM A DB ACTION IF TOKENS R VALID 
                 **********************************************/
                await this.stageDBAction(this.state.productId, name, value, this.baseURL, insertProduct);
            } // if
        } // try
        catch (err) {
            console.log("User is logged out");
            this.setState({ message: "User is logged out" });
        }
    }

    // Handles changing input text when an image is clicked
    // productImageClickHandler(event){
    productImageClickHandler(event, element = document.getElementById("image-input")) {
        event.preventDefault();
        // const element = event.target;
        const labelElement = element.labels[0];
        let labelValue = labelElement.textContent;
        const imgInputInfo = element.files[0];
        // Upload Image has not target, so set the labelValue to choose file
        if (!event.target) {
            var image = this.state.image;
                image.imageName = "No File Chosen";
                console.log("ELSE: IMAGENAME:", image.imageName);
                this.setState({
                    image: image
                });
                labelValue = this.state.image.imageName;
                console.log("LabelElement:", labelElement);
                console.log("LabelValue:", labelValue);
                // console.log("FILENAME:", fileName);
                return;
        }
        // Alternative upload button
        if (imgInputInfo) {
            // try {
                /*********************************/              
                console.log("IMG Select EVENT INFO", event.target);
                const fileName = element.files[0].name.toString();
                
                // let labelValue = labelElement.textContent;
                
                console.log("LabelValue:", labelValue);
                console.log("FILENAME:", fileName);
                
                // 11/27/2019
                var image = this.state.image;
                image.imageName = fileName;
                console.log("IF: IMAGENAME:", image.imageName);
                this.setState({
                    // productImageName: fileName
                    image: image
                });
                // console.log("ProductImageName:", this.state.productImageName);
                console.log("ProductImageName:", this.state.image.imageName);
                labelValue = this.state.image.imageName;
                console.log("labelElement:", labelElement);
                console.log("labelValue:", labelValue);
                /*********************************/ 
            // } catch (err) {
            //     console.log("SELECT IMG ERR", err);
            // }
        }
        else {          
            var image = this.state.image;
                image.imageName = "No File Chosen";
                console.log("ELSE: IMAGENAME:", image.imageName);
                this.setState({
                    // productImageName: fileName
                    image: image
                });
                labelValue = this.state.imageName;
        }        
    }
    message = () => {
        console.log("Message method called");
    }
    render() {
        let { imgLabelContent } = this.state;
        if (this.state.image) {
            return (

                <React.Fragment>
                    <ProductInsertInputs
                        changeHandler={this.changeHandler}
                        insertClickHandler={this.insertClickHandler}
                        productImageClickHandler={this.productImageClickHandler}
                        // imgLabelContent = {imgLabelContent}
                        // productImageName={this.state.productImageName}
                        productImageName={this.state.image.imageName}
                        productName={this.state.productName}
                        productValue={this.state.productValue}
                        placeholderName={this.state.placeholderName}
                        placeholderValue={this.state.placeholderValue}
                        message={this.state.message}
                        //Image props for image/Upload component
                        image={this.state.image}
                        submitImageHandler={this.submitImageHandler}
                    />
                </React.Fragment>
            )
        }
    }
} // class

export default ProductInsertContainer;