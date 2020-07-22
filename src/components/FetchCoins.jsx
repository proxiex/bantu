import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import NumberFormat from 'react-number-format';
import './styles.css';
import { Table, Button, Row, Modal, ModalBody, ModalFooter, Spinner} from 'reactstrap';
import { fetchCoinsAction } from '../actions/fetchCoinsAction';
import { handleDataUpdate } from '../actions/updateCoins';
import { fetchDailyPriceAction } from '../actions/fetchDailyPriceAction';
import Websocket from 'react-websocket';
import { AreaChart } from 'react-chartkick'
import 'chart.js'

class GetCoins extends Component {
  constructor () {
    super();
    this.state = {
      isOpen: false,
      coins: {},
    }
  }

  componentDidMount() {
    const { fetchCoinsAction, handleDataUpdate } = this.props;
    fetchCoinsAction();
    handleDataUpdate()

  }

  handleData(data) {
    let result = JSON.parse(data);
    const coinData = this.state.coins
    const coinId = coinData.data.findIndex(x => x.id === result.base);

    if (coinId > -1) {
      let classn;

      const newPriceUsd = result.priceUsd;
      const coin = coinData.data[coinId]

      if (newPriceUsd > coin.priceUsd) {
        classn = 'up';
      } else if (newPriceUsd < coin.priceUsd) {
        classn = 'down';
      } else {
        classn = '';
      }

      coinData.data[coinId].priceUsd = result.priceUsd
      coinData.data[coinId].classn = classn
    };
    setInterval(async () => {
      this.setState({
        coins: coinData
      });
    }, 1000);
  }



  componentWillReceiveProps(nextProps) {
    const coinData = nextProps.coins;
    this.setState({
      coins: coinData
    });
  }

  toggle = async ({ id }) => {
    await this.props.fetchDailyPriceAction(id);
    this.setState({isOpen: !this.state.isOpen})
  };

  composeChart = () => {
    const { coinHistory } = this.props;
    const chartData = [];
    coinHistory.map(each => {
      const date = new Date(each.date).toISOString().split('T')[0];
      const stringDate = date.toString();
      return chartData.push([ [stringDate], each.priceUsd ])
    }); 
    return chartData;
  }

  render () {
    const { isLoading, coins } = this.props;
    const { data } = coins;
    return (
      <div className='container'>
        <Websocket url='wss://ws.coincap.io/trades/binance' onMessage={this.handleData.bind(this)}/>
        <div className='row mt-5 '>
          <div className='col-lg-12 col-sm-12 mt-4  '>
            <h3 className='title-section'>
              Top 100 Crypto-currencies by Market Capitalization
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
                  <th>Rank</th>
                  <th>Name</th>
                  <th style={{textAlign: 'right'}}>Market Cap</th>
                  <th style={{textAlign: 'right'}}>Price</th>
                  <th style={{textAlign: 'right'}}>Volume (24h)</th>
                  <th style={{textAlign: 'right'}}>Circulating Supply</th>
                  <th style={{textAlign: 'right'}}>Change (24h)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((coin, index) => {
                  return (
                    <tr
                    key={index}
                    onClick={() => this.toggle(coin)}
                    // style={{backgroundColor: '#8f8'}}
                    className={coin.classn}
                    >
                    <td>{coin.rank}</td>
                  <td>
                    <div style={{display: 'flex'}}>
                    <img style={{width: '30px', height: '30px', marginRight: '10px'}} alt='icon' src={`https://static.coincap.io/assets/icons/${coin.symbol.toLocaleLowerCase()}@2x.png`} />
                    <div>
                      {coin.name}
                      <p style={{color: '#b5b8bb', fontSize: '12px', marginBottom: '10px'}}>{coin.symbol}</p></div>
                      </div></td>
                    <td style={{textAlign: 'right'}}>
                    <NumberFormat
                    value={coin.marketCapUsd}
                    decimalScale={0}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$ '} />
                    </td>
                    <td style={{textAlign: 'right'}}>
                    <NumberFormat
                    value={coin.priceUsd}
                    decimalScale={2}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$ '} />
                    </td>
                    <td style={{textAlign: 'right'}}>
                    <NumberFormat
                    value={coin.volumeUsd24Hr}
                    decimalScale={0}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={`${' '} ${coin.symbol}`}/>
                    </td>
                    <td style={{textAlign: 'right'}}>
                    <NumberFormat
                    value={coin.supply}
                    decimalScale={0}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={`${' '} ${coin.symbol}`} />
                    </td>
                    <td className={coin.changePercent24Hr > 0 ? 'change24-up' : 'change24-down'} style={{textAlign: 'right'}}>
                    <NumberFormat
                    value={coin.changePercent24Hr}
                    decimalScale={3}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={ " %"} />
                    </td>
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
        <Modal isOpen={this.state.isOpen} size='lg'>
          
          <ModalBody>
          <AreaChart
            colors={["#13b2bc", "#666"]}
            curve={true}
            data={this.props.coinHistory.length > 0 && this.composeChart()}
            prefix="$"
            xtitle="Date"
            ytitle="Price"
          /> 
        </ModalBody> 
          <ModalFooter>
            <Button color="primary" style={{backgroundColor: '#13b2bc', borderColor: '#13b2bc'}} onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  coins: state.fetchCoinsReducer.coins,
  isLoading: state.fetchCoinsReducer.isLoading,
  coinHistory: state.fetchDailyPriceReducer.coinHistory,
});

export default connect(mapStateToProps, {
  fetchCoinsAction, handleDataUpdate, fetchDailyPriceAction
})(withRouter(GetCoins));