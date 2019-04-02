import React, { Component } from 'react';
import Layout from '../../components/layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import { Card, Grid, Button } from 'semantic-ui-react';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();

        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'Manager created the campaign and can withdraw from this',
                style: { overflowWrap: 'break-word '}        
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution',
                description:  'You must contribute at least this much wei to become an approver',
                style: { overflowWrap: 'break-word '}    
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money from the contract, Request must be approved by approvers', 
                style: { overflowWrap: 'break-word '}    
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description:  'Number of people who have contributed to the Campaign',
                style: { overflowWrap: 'break-word '}    
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (Ether)',
                description: 'This is the amount of ether left in the project'
            }
        ]

        return <Card.Group items={items} />;
    }

    render() {
        return (
        <Layout>
        <h3>Campaign Shows</h3>
        <Grid>
            <Grid.Row>
            <Grid.Column width={10}>
        {this.renderCards()}
        </Grid.Column>
        <Grid.Column width={6}>
        <ContributeForm address={this.props.address}/>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column>
            <Link route={`/campaign/${this.props.address}/requests`}>
            <a>
                <Button primary>View Requests</Button>
            </a>
        </Link>
            </Grid.Column>
        </Grid.Row>
        </Grid>
        </Layout>
        )
    }
}

export default CampaignShow;