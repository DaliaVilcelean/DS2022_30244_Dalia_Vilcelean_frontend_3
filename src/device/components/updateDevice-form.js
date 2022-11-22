import React from 'react';
import validate from "./validators/device-validators";
import Button from "react-bootstrap/Button";
import * as API_DEVICES from "../api/device-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';



class UpdateDeviceForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                id: {
                    value: '',
                    placeholder: 'What device to Update?...',
                    valid: false,
                    touched: false,
                  
                },
                name: {
                    value: '',
                    placeholder: 'What is device s name?...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                description: {
                    value: '',
                    placeholder: ' Description...',
                    valid: false,
                    touched:false,
                
                },
                address: {
                    value: '',
                    placeholder: 'Cluj, Zorilor, Str. Lalelelor 21...',
                    valid: false,
                    touched: false,
                },
                maxHConsumption: {
                    value: 0,
                    placeholder: 'Age...',
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
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
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

    updateDevice(device) {
        return API_DEVICES.updateDevice(device, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully updated device with id: " + result);
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
            id: this.state.formControls.id.value,
            name: this.state.formControls.name.value,
            description: this.state.formControls.description.value,
            address: this.state.formControls.address.value,
          
            maxHConsumption: parseInt(this.state.formControls.maxHConsumption.value),
            
           
        };

        console.log(person);
        this.updateDevice(person); 
      
    }
   

    render() {
        return (
            <div>

                <FormGroup id='id'>
                    <Label for='idField'> Id: </Label>
                    <Input name='id' id='id' placeholder={this.state.formControls.id.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.id.value}
                           touched={this.state.formControls.id.touched? 1 : 0}
                           valid={this.state.formControls.id.valid}
                           required
                    />
                   
                </FormGroup>

                <FormGroup id='name'>
                    <Label for='nameField'> Name: </Label>
                    <Input name='name' id='nameField' placeholder={this.state.formControls.name.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.name.value}
                           touched={this.state.formControls.name.touched? 1 : 0}
                           valid={this.state.formControls.name.valid}
                           required
                    />
                    {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='description'>
                    <Label for='descriptionField'> Username: </Label>
                    <Input name='description' id='description' placeholder={this.state.formControls.description.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.description.value}
                           touched={this.state.formControls.description.touched? 1 : 0}
                           valid={this.state.formControls.description.valid}
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

               

                <FormGroup id='maxHConsumption'>
                    <Label for='maxHConsumptionField'> Max Hourly Consumption: </Label>
                    <Input name='maxHConsumption' id='maxHConsumptionField' placeholder={this.state.formControls.maxHConsumption.placeholder}
                          min={0} max={1000} type='number'
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.maxHConsumption.value}
                           touched={this.state.formControls.maxHConsumption.touched? 1 : 0}
                           valid={this.state.formControls.maxHConsumption.valid}
                           required
                    />
                </FormGroup>

                    <Row>
                        <Col sm={{size: '4', offset: 8}}>
                            <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}>  Update </Button>
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

export default UpdateDeviceForm;
