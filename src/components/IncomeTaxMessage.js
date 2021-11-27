import React, { Component } from 'react';


class IncomeTaxMessage extends Component {
    render() {
        return (
            <div>
                <div class="alert alert-success" role="alert">
                    <h4 class="alert-heading">Income Tax Calculted</h4>
                    <p class="mb-0">Your total income tax for a salary of <b>{this.props.salary}</b> in the year <b>{this.props.year}</b> is <b>{this.props.incomeTax}</b></p>
                </div>
            </div>
        );
    }
}

export default IncomeTaxMessage;
