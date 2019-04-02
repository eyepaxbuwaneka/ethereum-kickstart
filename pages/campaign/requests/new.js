import React, { Component } from 'react';
import Layout from '../../../components/layout';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import { Form, Input, Button, Message } from 'semantic-ui-react';

class RequestNew extends Component {
    state = {
        description: '',
        contribution: '',
        receipient: '',
        errorMessage: '',
        loading: false
    }

    static async getInitialProps(props)
    {
        const { address } = props.query;

        return {address};
    }

    onSubmit = async event => {
        event.preventDefault();
        this.setState({loading: true, errorMessage: ''});
        const campaign = Campaign(this.props.address);
        const {description, contribution, receipient} = this.state;
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(
                description, 
                web3.utils.toWei(contribution, 'ether'), 
                receipient
                ).send({
                   from: accounts[0]
                });

            Router.pushRoute(`/campaign/${this.props.address}/requests`);
        } catch (err) {
            this.setState({errorMessage: err});
        }
        this.setState({loading: false});
    }

    render() {
        return (
            <Layout>
                <Link route={`/campaign/${this.props.address}/requests`}>
                <a>
                  Back
                </a>
                </Link>
                <h3>Create a Request!</h3>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
                <label>Description</label>
                <Input 
                value={this.state.description}
                onChange={event => this.setState({description: event.target.value})}
                />
            </Form.Field>
            <Form.Field>
                <label>Amount in Ether</label>
                <Input 
                value={this.state.contribution}
                onChange={event => this.setState({contribution: event.target.value})}
                />
            </Form.Field>
            <Form.Field>
                <label>Receipient</label>
                <Input 
                value={this.state.receipient}
                onChange={event => this.setState({receipient: event.target.value})}
                />
            </Form.Field>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button loading={this.state.loading} primary>Create!</Button>
        </Form>
            </Layout>

        )
    };
}

export default RequestNew;