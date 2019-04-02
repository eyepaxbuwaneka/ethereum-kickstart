import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import { EventEmitter } from 'events';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {
    state = {
        value: '',
        ErrorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();
        const campaign = Campaign(this.props.address);
        this.setState({loading: true});
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });

            Router.replaceRoute(`/campaign/${this.props.address}`);
        } catch (err) {
            this.setState({ErrorMessage: err.message});
        }

        this.setState({loading: false})
    }
    
    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.ErrorMessage}> 
                <Form.Field>
                <label>Amount to Contribute</label>
                <Input
                    value={this.state.value}
                    onChange={event => this.setState({value: event.target.value})}
                    label="Ether"
                    labelPosition="right" 
                />
                </Form.Field>
                <Message error header="OOps!!" content={this.state.ErrorMessage} />
                <Button primary loading={this.state.loading}>
                Contribute
                </Button>
            </Form>
        )
    }
}

export default ContributeForm;