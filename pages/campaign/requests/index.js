import React, { Component } from 'react';
import Layout from '../../../components/layout';
import { Link } from '../../../routes';
import { Button, Grid, Table } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const {address} = props.query;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestCount))
            .fill()
            .map((element, index) => {
                return campaign.methods.requests(index).call();
            })
        )
        
        return {address, requests, requestCount, approversCount};
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
            return (
                <RequestRow 
                key={index} 
                id={index} 
                request={request} 
                address={this.props.address} 
                approversCount={this.props.approversCount}/>
            )
        })
    }

    render() {
        const { Header, Row, HeaderCell, Body} = Table;
        return (
            <Layout>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={14}>
                        <h3>Request List</h3>
                </Grid.Column>
                <Grid.Column width={2}>
                <Link route={`/campaign/${this.props.address}/requests/new`}>
                <a>
                    <Button primary>Create Request</Button>
                </a>
                </Link>
            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            <Table celled>
    <Header>
      <Row>
        <HeaderCell>Id</HeaderCell>
        <HeaderCell>Description</HeaderCell>
        <HeaderCell>Amount</HeaderCell>
        <HeaderCell>Recipient</HeaderCell>
        <HeaderCell>Approval Count</HeaderCell>
        <HeaderCell>Approve</HeaderCell>
        <HeaderCell>Finalize</HeaderCell>
      </Row>
    </Header>
    <Body>
            {this.renderRows()}
        </Body>
    </Table>
            </Grid.Row>
            </Grid>
            </Layout>
        );
    }
}

export default RequestIndex;  