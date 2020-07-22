import {
    COINS_UPDATE
} from './types';

export const updateCoinData = (payload) => ({
     type: COINS_UPDATE,
     payload
   });

const tradeWs = new WebSocket('wss://ws.coincap.io/trades/binance')

export const handleDataUpdate = (data) => (dispatch) => {
    tradeWs.onmessage = function (msg) {
        data = JSON.parse(msg.data);
        dispatch(updateCoinData(data));
    }
};
