import React from 'react';
import autoBind from 'react-autobind';
import {Main} from './index'
import {Header} from './index'

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