import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import './styles.css';
import { Table, Row, Spinner} from 'reactstrap';
import { fetchFootprintsAction } from '../actions/fetchFootPrints';


class FootPrints extends Component {
  constructor () {
    super();
    this.state = {
      limit: 20,
      isOpen: false,
    }
  }

componentDidMount() {
  const { fetchFootprintsAction } = this.props;
  fetchFootprintsAction();

  }

  render () {
    const { footPrints, isLoading } = this.props;
    const { data } = footPrints;
    console.log(isLoading)
    return (
      <div className='container'>
        <div className='row mt-5 '>
          <div className='col-lg-12 col-sm-12 mt-4  '>
            <h3 className='title-section'>
              Foot prints...
            </h3>
          </div>
          <div className='col-lg-12 col-sm-12 mt-5'>
          { isLoading ? 
              <Row style={{justifyContent: 'center'}}>
                  <Spinner
                      as="span"
                      animation="grow"
                      size="xl"
                      role="status"
                      aria-hidden="true"
                  />
                </Row> :
                <>
                <Table hover>
              <thead>
                <tr>
                  <th>Language</th>
                  <th>Platform</th>
                  <th>User Agent</th>
                  <th>IP Address</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>City</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {data.map((print, index) => {
                  return (
                    <tr key={index}>
                    <td>{print.language}</td>
                    <td>{print.platform}</td>
                    <td>{print.user_agent}</td>
                    <td>{print.ip_address}</td>
                    <td>{print.latitude}</td>
                    <td>{print.longitude}</td>
                    <td>{print.city}</td>
                    <td>{print.country}</td>
                  </tr>
                  )
                })
                }
              </tbody>
            </Table>
              </>
              }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  footPrints: state.fetchFootPrintsReducer.footPrints,
  isLoading: state.fetchFootPrintsReducer.isLoading,
});

export default connect(mapStateToProps, {
    fetchFootprintsAction
})(withRouter(FootPrints));