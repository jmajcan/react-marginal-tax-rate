import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';


class LoadingModal extends Component {
    render() {
        return (
            <>
                <Modal show={this.props.show}>
                    <Modal.Body>
                        <div class="d-flex align-items-center">
                        <strong>Calculating...</strong>
                            <div class="spinner-border m-5" role="status" aria-hidden="true"></div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default LoadingModal;
