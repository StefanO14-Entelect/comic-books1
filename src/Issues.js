import {server} from './Services/ApiService';
import React from 'react';
import axios from 'axios';
import Button from 'react-toolbox/lib/button/Button';
import Card from 'react-toolbox/lib/card/Card';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import {getAll, getOne, Create, Update, Delete} from './Services/ApiService';

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
                    <Button label="Delete" onClick={() => this.deleteIssue(props.id)}/>
                    <Button label="Load" onClick={() => this.loadIssue(props.id)}/>
                </td>
            </tr>
        );
    }

    loadIssue(id) {
        var issue= getOne("Issues", id);
        console.log("Issue OUT:", issue);
        /*.then(function(issue){
            console.log("Issue OUT:", issue);
            return;
        }.bind(this))
        .catch(function(error){
            console.log("Error:", error);
        })*/
    }

    deleteIssue(id) {

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
                <tbody>
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