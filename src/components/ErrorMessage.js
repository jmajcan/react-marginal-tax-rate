import React, { Component } from 'react';


class ErrorMessage extends Component {
    render() {
        return (
            <div>
                <div class="alert alert-danger" role="alert">
                    <h4 class="alert-heading">An error occured!</h4>
                    <p class="mb-0">Error {this.props.status}: {this.props.message}</p>
                </div>
            </div>
        );
    }
}

export default ErrorMessage;
