import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import './styles.css';
import { Row, Spinner } from 'reactstrap';
import {fetchCoinsAction } from '../actions/fetchCoinsAction';
import { Doughnut } from 'react-chartjs-2';

import 'chart.js'

class GetCoins extends Component {
  constructor () {
    super();
    this.state = {
      limit: 20,
      isOpen: false,
      chart: {
            labels: [],
            datasets: [{
                backgroundColor: [
                '#B21F00',
                '#C9DE00',
                '#2FDE00',
                '#00A6B4',
                '#6800B4'
                ],
                hoverBackgroundColor: [
                '#501800',
                '#4B5000',
                '#175000',
                '#003350',
                '#35014F'
                ],
                data: []
            }]
        }
    }
  }

componentDidMount() {
  const { fetchCoinsAction } = this.props;
    fetchCoinsAction();
    

  }

  render () {
    const { coins, isLoading } = this.props;
    const { data } = coins;
    let pieData = [];
    let labels = [];
    if (data) {
        data.slice(0,5).map(function(coin, index){
            labels.push(coin.name)
            pieData.push(coin.marketCapUsd)
        })
    }

    const pieDataSet = {
        labels,
        datasets: [{
            backgroundColor: [
            '#B21F00',
            '#C9DE00',
            '#2FDE00',
            '#00A6B4',
            '#6800B4'
            ],
            hoverBackgroundColor: [
            '#501800',
            '#4B5000',
            '#175000',
            '#003350',
            '#35014F'
            ],
            data: pieData
        }]
    }
    return (
      <div className='container'>
        <div className='row mt-5 '>
          <div className='col-lg-12 col-sm-12 mt-4  '>
            <h3 className='title-section'>
              Top 5 Cryptocurrencies by Market Capitalization
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
              <Doughnut data={pieDataSet} />
              </>
              }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  coins: state.fetchCoinsReducer.coins,
  isLoading: state.fetchCoinsReducer.isLoading,
});

export default connect(mapStateToProps, {
  fetchCoinsAction
})(withRouter(GetCoins));