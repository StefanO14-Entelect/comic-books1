import {server} from "./index";
import React from 'react';
import Input from 'react-toolbox/lib/input';
import Card from 'react-toolbox/lib/card/Card';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import Button from 'react-toolbox/lib/button/Button';
import Flexbox from 'flexbox-react';
import autoBind from 'react-autobind';
import axios from 'axios';

export class Suppliers extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {
            suppliers: [],
            selectedSupplier: null,
            type: null
        }
    }

    componentDidMount(){
        this.loadSuppliers();
    }
 
    render(props) {
        const {suppliers} = this.state;
        let supplierSummaries = [];

        if (suppliers) {
            for (const supplier of suppliers) {
                supplierSummaries.push(this.supplierSummary(supplier));
            }
        }

        return (
            <Flexbox flexDirection="column">
                <Flexbox element="header" flexDirection="row">
                    <button onClick={this.addIndividualSupplier}>Add</button>
                    <h1>Suppliers</h1>
                </Flexbox>
            
                <Flexbox flexDirection="row" minHeight="300vh"> 
                    <Flexbox flex={2}>
                            <table>
                                <tbody>
                                {supplierSummaries}
                                </tbody>
                            </table>
                    </Flexbox>
                    <Flexbox flex={2}>
                        <Supplier supplier={this.state.selectedSupplier} action={this.state.type} onChange={this.updateSupplier} onSubmit={this.submitSupplier}/>
                    </Flexbox>
                </Flexbox>
            </Flexbox>
        );
    }

    loadSuppliers() {
        axios.get(server+"/api/Suppliers")
        .then(function (response) {
            const suppliersIN = response["data"];
            
            this.setState({
                suppliers: suppliersIN
            });
            return;
        }.bind(this))
        .catch(function (error) {
            console.log("Error: ", error);
        })
    }

    supplierSummary(props) {
        return (
            <tr>
                <td>
                    {props.name}
                </td>
                <td>
                    {props.reference}
                </td>
                <td>
                    <Button label="Delete" onClick={() => this.deleteIndividualSupplier(props.id)}/>
                    <Button label="Load" onClick={() => this.viewIndividualSupplier(props.id)}/>
                </td>
            </tr>
        )
    }

    addIndividualSupplier() {
        this.setState({
            type: "CREATE",
            selectedSupplier: {id: null, name: null, city: null, reference: null}
        })
        console.log("Selected Supplier in state: ", this.state.selectedSupplier)
    }

    editIndividualSupplier() {
        console.log("Edits the supplier and sends updated version to the server.");
    }

    deleteIndividualSupplier(id) {
        axios.delete(server+"/api/Suppliers/"+id)
        .then(function(response){
            console.log("Delete Response: ", response);
            this.loadSuppliers();
            return;
        }.bind(this))
        .catch(function(error){
            console.log("Error: ", error);
        })
    }

    submitNewSupplier() {
        axios.post(server+"/api/Suppliers", {
            id: this.state.selectedSupplier.id,
            name: this.state.selectedSupplier.name,
            city: this.state.selectedSupplier.city,
            reference: this.state.selectedSupplier.reference
        })
        .then(function(response){
            console.log("POST Response: ", response);
        })
    }

    submitUpdateSupplier() {
        axios.put(server+"/api/Suppliers", {
            id: this.state.selectedSupplier.id,
            name: this.state.selectedSupplier.name,
            city: this.state.selectedSupplier.city,
            reference: this.state.selectedSupplier.reference
        })
        .then(function(response) {
            console.log("Update response: ", response);
        })
    }

    viewIndividualSupplier(id) {

        axios.get(server+"/api/Suppliers/"+id)
        .then(function (response) {
            const id = response["data"]["id"];
            const name = response["data"]["name"];
            const city = response["data"]["city"];
            const reference = response["data"]["reference"]
            
            this.setState({
                selectedSupplier: {
                    id: id,
                    name: name,
                    city: city,
                    reference: reference
                },
                type: "EDIT"
            });


            return;
        }.bind(this))
        .catch(function (error) {
            console.log("Error: ", error);
        })
    }

    updateSupplier(supplier) {
        this.setState({
            selectedSupplier: {
                id: supplier.id,
                name: supplier.name,
                city: supplier.city,
                reference: supplier.reference
            }
        })
    }

    submitSupplier() {
        if (this.state.type === "EDIT") {
            console.log("Supplier to patch:", this.state.selectedSupplier);
            this.submitUpdateSupplier();
            
        } else {
            console.log("Supplier to post:", this.state.selectedSupplier);
            this.submitNewSupplier();
        }
    }

    closeIndividualSupplier() {
        console.log("Selected supplier in state: ", this.state.selectedSupplier);
    }
}

function Supplier(props) {
    if (props.supplier == null) {
        return null;
    } else {
        let supplierHeader 
        if (props.action === "CREATE"){
            supplierHeader = "Creating new supplier:"
        } else {
            supplierHeader = "Editing supplier:"
        }

        return ( 
            <Card>
            <CardTitle
            title={supplierHeader}
            />               
                <table>
                    <tbody>
                        <tr>
                            <td><b>Name</b></td>
                            <td><Input type='text' name='name' value={props.supplier.name} onChange={(value) => props.onChange({
                                id: props.supplier.id,
                                name: value,
                                city: props.supplier.city,
                                reference: props.reference
                            })}/></td>
                        </tr>
                        <tr>
                            <td><b>City</b></td>
                            <td><Input type='text' name='city' value={props.supplier.city} onChange={(value) => props.onChange({
                                id: props.supplier.id,
                                name: props.supplier.name,
                                city: value,
                                reference: props.reference
                            })} /></td>
                        </tr>
                        <tr>
                            <td><b>Reference</b></td>
                            <td><Input type='text' name='reference' value={props.supplier.reference} onChange={(value) => props.onChange({
                                id: props.supplier.id,
                                name: props.supplier.name,
                                city: props.supplier.city,
                                reference: value
                            })}/></td>
                        </tr>
                    </tbody>
                </table>
                <button className="supplier" onClick={() => props.onSubmit()}>
                Submit
                </button>
            </Card>  
    );
    }
}