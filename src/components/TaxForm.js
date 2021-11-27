import React, { Component } from 'react';
import ErrorMessage from './ErrorMessage';

class TaxForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            taxBrackets: {},
            isFormError: false,
            error: {
                errStatus: null,
                errMessage: ''
            }
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.year !== prevState.year){
            this.getTaxBrackets();
        }
    }

    getTaxBrackets = async (year) => {
        const taxBracketResponse = await fetch(`http://localhost:5000/tax-calculator/brackets/${year}`)  
            .then((response) => {
                console.log(response)
                if (response.ok) {
                    return response.json();
                } else {
                    throw (response);
                }
            })
            .then((resp) => {
                this.setState({
                    taxBrackets: resp.tax_brackets
                });
            })
            .catch((error) => {
                console.log('CATCH ERROR: ', error);
                this.setState({
                    isFormError: true,
                    error: {
                        errStatus: error.status,
                        errMessage: error.statusText
                    }
                })
            });
        return taxBracketResponse;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const taxBrackets = this.getTaxBrackets(event.target.taxYear.value);
        if(taxBrackets){
            // do calculation
        }
        console.log(this.state)
    }

    render() {
        return (
            <div class="container">
                <h2>Marginal Tax Rate</h2>
                <form class="form-inline" onSubmit={this.handleSubmit}>
                    <div class="form-group col-md-6 mb-2" >
                        <label for="incomeInput">Annual Income</label>
                        <input type="number" class="form-control" id="incomeInput" name="income" placeholder="Enter annual income" />
                    </div>
                    <div class="form-group col-md-6 mb-2">
                        <label for="incomeInput">Tax Year</label>
                        <input type="number" class="form-control" id="yearInput" name="taxYear" placeholder="Enter tax year" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                {this.state.isFormError ? <ErrorMessage status={this.state.error.errStatus} message={this.state.error.errMessage} /> : null}
            </div>
        );
    }
}

export default TaxForm;
