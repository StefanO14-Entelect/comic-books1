import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-toolbox/lib/button/Button';
import Card from 'react-toolbox/lib/card/Card';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import axios from 'axios';
import autoBind from 'react-autobind';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Input from 'react-toolbox/lib/input';
import Flexbox from 'flexbox-react';
import {OuterView} from './OuterView';
import {Suppliers} from './Suppliers';
import {Issues} from './Issues';

export const server="http://frontendshowcase.azurewebsites.net:80";

export const Header = () => (
    <header>
        <nav>
            <ul>
                <li><Link to='/Suppliers'>Suppliers</Link></li>
                <li><Link to='/Issues'>Issues</Link></li>
            </ul>
        </nav>
    </header>
)

export const Main = () => (
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

ReactDOM.render((
    <BrowserRouter>
        <OuterView/>
    </BrowserRouter>
),
    document.getElementById('root')
);