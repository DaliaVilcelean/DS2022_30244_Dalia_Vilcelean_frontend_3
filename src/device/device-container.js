import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';
import DeviceForm from "./components/device-form";
import DeleteDeviceForm from "./components/deleteDevice-form";
import UpdateDeviceForm from "./components/updateDevice-form.js";
import * as API_DEVICES from "./api/device-api"
import DeviceTable from "./components/device-table";



class DeviceContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleForm1 = this.toggleForm1.bind(this);
        this.toggleForm2 = this.toggleForm2.bind(this);
    
        this.reload = this.reload.bind(this);
        
        this.state = {
            selected: false,
            selected1: false,
            selected2: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null
        };
       
    }

    componentDidMount() {
        this.fetchDevices();
    }

    fetchDevices() {
        return API_DEVICES.getDevices((result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({
                    tableData: result,
                    isLoaded: true
                });
                console.log(result)
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
            console.log(result)
        });
    }

    toggleForm() {
        this.setState({selected: !this.state.selected});
    }
    toggleForm1() {
        this.setState({selected1: !this.state.selected1});
    }
    toggleForm2() {
        this.setState({selected2: !this.state.selected2});
    }


    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
        this.toggleForm1();
        this.toggleForm2();
        this.fetchDevices();
    }

    render() {
        return (
            <div>
                <CardHeader>
                    <strong> Device Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm}>Add Device </Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm1}>Delete Device </Button>
                        </Col>
                    </Row>

                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm2}>Update Device </Button>
                        </Col>
                    </Row>

                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <DeviceTable tableData = {this.state.tableData}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatus}
                                                            error={this.state.error}
                                                        />   }
                                                        
                        </Col>
                        
                    </Row>
                </Card>
                

                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add Device: </ModalHeader>
                    <ModalBody>
                        <DeviceForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>


                <Modal isOpen={this.state.selected1} toggle={this.toggleForm1}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm1}> Delete Device: </ModalHeader>
                    <ModalBody>
                        <DeleteDeviceForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

             

                <Modal isOpen={this.state.selected2} toggle={this.toggleForm2}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm2}> Update Device: </ModalHeader>
                    <ModalBody>
                        <UpdateDeviceForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>
                            

            </div>
        )

    }
}


export default DeviceContainer;
