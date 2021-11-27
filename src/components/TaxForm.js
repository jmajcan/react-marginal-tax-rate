import React, { Component } from 'react';
import ErrorMessage from './ErrorMessage';
import IncomeTaxMessage from './IncomeTaxMessage';
import LoadingModal from './LoadingModal';

class TaxForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            incomeTax: 0,
            year: null,
            income: null,
            taxBrackets: {},
            isFormError: false,
            isCalculationFinished: false,
            showModal:false,
            error: {
                errStatus: null,
                errMessage: ''
            }
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.taxBrackets !== prevState.taxBrackets){
            console.log("Tax Brackets Acquired",this.state.taxBrackets);
        }
    }

    getTaxBrackets = async () => {
        const taxBracketResponse = await fetch(`http://localhost:5000/tax-calculator/brackets/${this.state.year}`)  
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw (response);
                }
            })
            .then((resp) => {
                this.setState({
                    isFormError: false,
                    taxBrackets: resp.tax_brackets
                });
                return resp;
            })
            .catch((error) => {
                this.setState({
                    isFormError: true,
                    showModal: false,
                    error: {
                        errStatus: error.status,
                        errMessage: error.statusText
                    }
                })
            });
        if(taxBracketResponse){
            this.calcIncomeTax();
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            showModal: true,
            year: event.target.taxYear.value,
            income: event.target.income.value,
            isCalculationFinished: false
        });
        this.getTaxBrackets();
    }

    calcIncomeTax = () => {
        let totalTax = 0;
        this.state.taxBrackets.forEach(({min, max, rate}) => {
            let income = this.state.income;
            if(max !== undefined){
                if(income > max){
                    totalTax += (max - min) * rate;
                } else if (income < max && income > min){
                    totalTax += (max - income) * rate;
                }
            } else if(income > min){
                totalTax += (income - min) * rate;
            }
        })
        this.setState({ 
            incomeTax: totalTax,
            isCalculationFinished: true,
            showModal: false
        });
    }

    render() {
        return (
            <div class="container">
                <LoadingModal show={ this.state.showModal } />
                <h2>Marginal Tax Rate</h2>
                <form class="form-inline" onSubmit={(event) => this.handleSubmit(event)}>
                    <div class="form-group col-md-6 mb-2" >
                        <label for="incomeInput">Annual Income</label>
                        <input type="number" class="form-control" id="incomeInput" name="income" placeholder="Enter annual income" />
                    </div>
                    <div class="form-group  col-md-2 mb-4">
                        <label for="yearInput">Select tax year</label>
                        <select class="form-control" id="yearInput" name="taxYear" >
                            <option value="" selected disabled>Please select</option>
                            <option value={2019} >2019</option>
                            <option value={2020} >2020</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary" >Submit</button>
                </form><br/>
                {this.state.isFormError ? <ErrorMessage status={this.state.error.errStatus} message={this.state.error.errMessage} /> : null}
                { !this.state.isFormError && this.state.isCalculationFinished ?
                    <IncomeTaxMessage salary={this.state.income} year={this.state.year} incomeTax={this.state.incomeTax} />
                    : null
                }
            </div>
        );
    }
}

export default TaxForm;
