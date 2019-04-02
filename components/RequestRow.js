import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class RequestNew extends Component {
    onApprove = async () => {
        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        })
    }

    onFinalize = async () => {
        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(this.props.id).send({
            from: accounts[0]
        })
    }

    render(){
        const {Row, Cell} = Table;
        const {id, request} = this.props;
        const readyToFinalize = request.approvalCount > this.props.approversCount/2;

        return (
            <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
                <Cell>{request.recepient}</Cell>
                <Cell>{request.approvalCount}/{this.props.approversCount}</Cell>
                <Cell>{request.complete ? null : (
                    <Button positive fluid onClick={this.onApprove}>Approve</Button>
                )}</Cell>
                <Cell>{request.complete ? null : (
                    <Button negative fluid onClick={this.onFinalize}>Finalize</Button>
                )}</Cell>
            </Row>
            
        );
    }

}

export default RequestNew;  