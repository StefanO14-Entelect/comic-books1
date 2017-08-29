import {server} from "./index";
import React from 'react';
import axios from 'axios';
import Button from 'react-toolbox/lib/button/Button';
import Card from 'react-toolbox/lib/card/Card';
import CardTitle from 'react-toolbox/lib/card/CardTitle';

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