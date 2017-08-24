import React from 'react';
import ReactDOM from 'react-dom';

class Suppliers extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {
            suppliers: []
        }
    }

    render() {
        const {suppliers} = this.state;
        return (
            <div>
            <button>Add</button>
            <h1>Suppliers</h1>
            <table>
                {supplierSummaries}
            </table>
        </div>
        )
    }

    getSuppliers() {
        axios.get(server+"/api/Issues")
        .then(function (response) {
            const suppliersIN = response["data"];
            if (suppliersIN){

            }
            updateState(this, {
                suppliers: response["data"]
            })
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
                    <Button label="Delete" onClick={props.deleteSupplier}/>
                    <Button label="Load" onClick={props.viewSupplier}/>
                </td>
            </tr>
        )
    }
}