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
import PersonForm from "./components/person-form";
import DeletePersonForm from "./components/deletePerson-form";
import UpdatePersonForm from "./components/updatePerson-form";

import * as API_USERS from "./api/person-api"
import PersonTable from "./components/person-table";





class PersonContainer extends React.Component {

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
        this.fetchPersons();
    }


  


    fetchPersons() {
        return API_USERS.getPersons((result, status, err) => {

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
        
        this.fetchPersons();
    }
 
   


    render() {
        return (
            <div>
                <CardHeader>
                    <strong> Person Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm}>Add Person </Button>
                        </Col>
                    </Row>

                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm1}>Delete Person </Button>
                        </Col>
                    </Row>

                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm2}>Update Person </Button>
                        </Col>
                    </Row>
                
                 
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <PersonTable tableData = {this.state.tableData}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatus}
                                                            error={this.state.error}
                                                        />   }
                                                        
                        </Col>
                        
                    </Row>
                </Card>
                

                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add Person: </ModalHeader>
                    <ModalBody>
                        <PersonForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selected1} toggle={this.toggleForm1}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm1}> Delete Person: </ModalHeader>
                    <ModalBody>
                        <DeletePersonForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selected2} toggle={this.toggleForm2}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm2}> Update Person: </ModalHeader>
                    <ModalBody>
                        <UpdatePersonForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

            </div>
        )

    }
}


export default PersonContainer;
