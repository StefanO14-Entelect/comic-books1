import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-toolbox/lib/button/Button';
import Card from 'react-toolbox/lib/card/Card';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import axios from 'axios';
import autoBind from 'react-autobind';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Input from 'react-toolbox/lib/input';
import Flexbox from 'flexbox-react';
// import Suppliers from 'Suppliers.js'

const server="http://frontendshowcase.azurewebsites.net:80";

const Header = () => (
    <header>
        <nav>
            <ul>
                <li><Link to='/Suppliers'>Suppliers</Link></li>
                <li><Link to='/Issues'>Issues</Link></li>
            </ul>
        </nav>
    </header>
)

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/Suppliers' component={Suppliers}/>
            <Route path='/Suppliers:number' component={Suppliers}/>
            <Route path='/Issues' component={Issues}/>
        </Switch>
    </main>
)

export class Home extends React.Component {
    constructor(props){
        super(props);
        autoBind(this);
    }

    render() {
        return (
            <h>Welcome!</h>
        );
    }
}

export class OuterView extends React.Component {
    constructor(props){
        super(props);
        autoBind(this);
    }

    render() { 
    let view=
    <div> 
        <Header />
        <Main />
    </div>
        return view;
    }
}

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
            <card>
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
            </card>  
    );
    }
}

function loadMockSuppliers() {
    return [
        {
            "key": 25,
            "name": "_WubaLubaDubDub",
            "city": "_WubaLubaDubDub",
            "reference": "_WubaLubaDubDub"
          },
          {
            "key": 60,
            "name": "3",
            "city": "4",
            "reference": "5"
          },
          {
            "key": 2,
            "name": "Cipquestollor WorldWide ",
            "city": "Fresno",
            "reference": "IOYV264X9WTM2P9"
          },
          {
            "key": 23,
            "name": "Emcadefentor Holdings ",
            "city": "New York",
            "reference": "PJMKC95WY0ZOG4K"
          }
    ];
}

export class Issues extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            issues: []
        }
    }

    componentDidMount(){
        this.loadIssues();
    }

    loadIssues() {
        axios.get(server+"/api/Issues")
        .then(function(response){
            const issuesIN= response["data"];
            
            this.setState({
                issues: issuesIN
            })
            return;
        }.bind(this))
        .catch(function(error){
            console.log("Error:", error);
        })
    }  

    render(){
        let {issues} = this.state;
        
        let issueSummaries = [];
        for (const issue of issues) {
            issueSummaries.push(this.issueSummary(issue));
        }
    
        return (
            <Card style={{width: '750px'}} fxFlex="auto">
                <CardTitle title="Issues"/>
                <Button label="Add"/>
                <table>
                    <tbody>
                    {issueSummaries}
                    </tbody>
                </table>
            </Card>
        );
    }

    issueSummary(props) {
        return (
            <tr>
                <td>
                    {props.title}
                </td>
                <td>
                    {props.publicationDate}
                </td>
                <td>
                    <Button label="Delete" onClick={props.deleteIssue}/>
                    <Button label="Load" onClick={props.loadIssue}/>
                </td>
            </tr>
        );
    }
}


function Issue(props) {
    return (
    <div>
        <div>
            <img src={props.value.images.path} alt={props.value.title} height="100px" width="50px"/>
        </div>
        <div>
            <table>
                <tr>
                    <td>
                        <b>Title</b>                
                    </td>
                    <td>
                        {props.value.title}
                    </td>
                </tr>
                <tr>
                    <td>
                        <b>Publication Date</b>
                    </td>
                    <td>
                        {props.value.publicationDate}
                    </td>
                </tr>
                <tr>
                    <td>
                        <b>Publisher</b>
                    </td>
                    <td>
                        {props.value.publisher}
                    </td>
                </tr>
                <tr>
                    <td>
                        <b>Description</b>
                    </td>
                    <td>
                        {props.value.description}
                    </td>            
                </tr>
            </table>
        </div>
        <div>
            <button className="supplier">
            Back
            </button>
            <button className="supplier">
            Order
            </button>
        </div>
    </div>
    );
}

function loadMockIssues() {
    return [
        {
            "key": 55529,
            "title": "INVINCIBLE IRON MAN (2015) #8",
            "description": "“THE WAR MACHINES” PART 3! Spider-Man, War Machine and Iron Man team up to stop a brand new threat to the Marvel Universe… like only they can. All this plus more hints to next summer’s insane Marvel blockbuster event.",
            "seriesNumber": -1,
            "publicationDate": "2016-01-14T15:58:19Z",
            "publisherId": 0,
            "publisher": "Marvel",
            "creators": [],
            "stock": [],
            "thumbnail": {
              "path": "http://i.annihil.us/u/prod/marvel/i/mg/4/a0/5697c5cd88870",
              "extension": "jpg",
              "pathIncludingExtension": "http://i.annihil.us/u/prod/marvel/i/mg/4/a0/5697c5cd88870.jpg"
            },
            "images": [
              {
                "path": "http://i.annihil.us/u/prod/marvel/i/mg/4/a0/5697c5cd88870",
                "extension": "jpg",
                "pathIncludingExtension": "http://i.annihil.us/u/prod/marvel/i/mg/4/a0/5697c5cd88870.jpg"
              }
            ]
          },
          {
            "key": 56912,
            "title": "Hercules (2015) #6",
            "description": "The newborn gods of the Uprising Storm have power over the world, and are about to destroy you all. Unless you’re Hercules, of course, in which case you’re going to fight back. You are going to gather a few old friends, gather your trusted weapons, channel the courage that once made you famous, and give the newborn gods a fight they will NEVER forget.",
            "seriesNumber": -1,
            "publicationDate": "2016-01-14T15:51:37Z",
            "publisherId": 0,
            "publisher": "Marvel",
            "creators": [],
            "stock": [],
            "thumbnail": {
              "path": "http://i.annihil.us/u/prod/marvel/i/mg/6/f0/5697c442c3e6e",
              "extension": "jpg",
              "pathIncludingExtension": "http://i.annihil.us/u/prod/marvel/i/mg/6/f0/5697c442c3e6e.jpg"
            },
            "images": [
              {
                "path": "http://i.annihil.us/u/prod/marvel/i/mg/6/f0/5697c442c3e6e",
                "extension": "jpg",
                "pathIncludingExtension": "http://i.annihil.us/u/prod/marvel/i/mg/6/f0/5697c442c3e6e.jpg"
              }
            ]
          },
          {
            "key": 58746,
            "title": "Marvel Universe Avengers Assemble: Civil War (2016) #2",
            "description": "SECRETS THREATEN TO DESTROY THE AVENGERS! Find out the secret Iron Man has kept from the team…and how it will change the Avengers’ future! Captain America takes a stand against Iron Man! It’s time: whose side are you on?",
            "seriesNumber": -1,
            "publicationDate": "2016-01-14T16:01:29Z",
            "publisherId": 0,
            "publisher": "Marvel",
            "creators": [],
            "stock": [],
            "thumbnail": {
              "path": "http://i.annihil.us/u/prod/marvel/i/mg/a/50/5697c68ce91bd",
              "extension": "jpg",
              "pathIncludingExtension": "http://i.annihil.us/u/prod/marvel/i/mg/a/50/5697c68ce91bd.jpg"
            },
            "images": [
              {
                "path": "http://i.annihil.us/u/prod/marvel/i/mg/a/50/5697c68ce91bd",
                "extension": "jpg",
                "pathIncludingExtension": "http://i.annihil.us/u/prod/marvel/i/mg/a/50/5697c68ce91bd.jpg"
              }
            ]
          }
    ];
}

ReactDOM.render((
    <BrowserRouter>
        <OuterView/>
    </BrowserRouter>
),
    document.getElementById('root')
);