import {server} from './Services/ApiService';
import React from 'react';
import axios from 'axios';
import Button from 'react-toolbox/lib/button/Button';
import Card from 'react-toolbox/lib/card/Card';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import Flexbox from 'flexbox-react';
import {getAll, getOne, Create, Update, Delete} from './Services/ApiService';

const resourceType= "Issues";

export class Issues extends React.Component{
    
    constructor(props) {
        super(props);

        this.state = {
            issues: [],
            selectedIssue: null,
            resource: null
        }
    }

    componentDidMount(){
        this.loadIssues();
    }

    loadIssues() {
        getAll(resourceType)
        .then(function(response){
            const issuesIN= response.data;
            
            this.setState({
                issues: issuesIN
            })
            return;
        }.bind(this))
        .catch(function(error){
            console.log("Error:", error);
            return;
        })
    }  

    render(){
        let {issues} = this.state;
        
        let issueSummaries = [];
        for (const issue of issues) {
            issueSummaries.push(this.issueSummary(issue));
        }
    
        return (
            <Flexbox flexDirection="column">
            <Flexbox element="header" flexDirection="row">
                <button onClick={this.addIndividualSupplier}>Add</button>
                <h1>Issues</h1>
            </Flexbox>
        
            <Flexbox flexDirection="row" minHeight="300vh"> 
                <Flexbox flex={2}>
                        <table>
                            <tbody>
                            {issueSummaries}
                            </tbody>
                        </table>
                </Flexbox>
                <Flexbox flex={2}>
                    <Issue issue={this.state.selectedIssue}/>
                </Flexbox>
            </Flexbox>
        </Flexbox>
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
                    <Button label="Delete" onClick={() => this.deleteIssue(props.id)}/>
                    <Button label="Load" onClick={() => this.loadIssue(props.id)}/>
                </td>
            </tr>
        );
    }

    loadIssue(id) {
        getOne(resourceType, id)
        .then(function(response) {
            this.setState({
                selectedIssue: response.data
            })

            console.log("Selected Issue:", this.state.selectedIssue)
            return;
        }.bind(this))
        .catch(function(error) {
            console.log("Error: ", error);
            return null;
        })
    }

    deleteIssue(id) {

    }
}

function Issue(props) {
    if (props.issue == null) {
        return null;
    } else {
        return (
            <div>
                <div>
                    <img src={props.issue.images.path} alt={props.issue.title} height="100px" width="50px"/>
                </div>
                <div>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <b>Title</b>                
                            </td>
                            <td>
                                {props.issue.title}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Publication Date</b>
                            </td>
                            <td>
                                {props.issue.publicationDate}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Publisher</b>
                            </td>
                            <td>
                                {props.issue.publisher}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Description</b>
                            </td>
                            <td>
                                {props.issue.description}
                            </td>            
                        </tr>
                        </tbody>
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
}