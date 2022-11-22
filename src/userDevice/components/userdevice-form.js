import React from 'react';

import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/userdevice-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';

import Select from '../../Select';

class UserDeviceForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                idUser: {
                    value: '',
                    placeholder: 'User  Id',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                idDevice: {
                    value: '',
                    placeholder: ' Username...',
                    valid: false,
                    touched:false,
                    validationRules: {
                        emailValidator: true
                    }
                },
                address: {
                    value: '',
                    placeholder: 'Cluj, Zorilor, Str. Lalelelor 21...',
                    valid: false,
                    touched: false,
                },
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }
    




    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;
       

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
       
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    registerUserDevice(userDevice) {
        return API_USERS.postUserDevice(userDevice, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted person with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

   

    handleSubmit() {
        let person = {
            idUser: this.state.formControls.idUser.value,
            idDevice: this.state.formControls.idDevice.value,
            address: this.state.formControls.address.value
            
        };
        

        console.log(JSON.stringify( person));

        this.registerUserDevice(person); 
      
    }
   

    render() {
        return (
            <div>

                <FormGroup id='idUser'>
                    <Label for='idUserField'> IdUser: </Label>
                    <Input name='idUser' id='idUserField' placeholder={this.state.formControls.idUser.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.idUser.value}
                           touched={this.state.formControls.idUser.touched? 1 : 0}
                           valid={this.state.formControls.idUser.valid}
                           required
                    />
                   
                </FormGroup>
         
              
                <FormGroup id='idDevice'>
                    <Label for='idDeviceField'> IdDevice: </Label>
                    <Input name='idDevice' id='idDeviceField' 
                           
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.idDevice.value}
                           touched={this.state.formControls.idDevice.touched? 1 : 0}
                           valid={this.state.formControls.idDevice.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='address'>
                    <Label for='addressField'> Address: </Label>
                    <Input name='address' id='addressField' placeholder={this.state.formControls.address.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.address.value}
                           touched={this.state.formControls.address.touched? 1 : 0}
                           valid={this.state.formControls.address.valid}
                           required
                    />
                </FormGroup>

                    <Row>
                        <Col sm={{size: '4', offset: 8}}>
                            <Button type={"submit"}  onClick={this.handleSubmit}>  Submit </Button>
                            
                        </Col>
                    </Row>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        ) ;
    }
}

export default UserDeviceForm;
