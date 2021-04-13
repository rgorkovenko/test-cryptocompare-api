
import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import config from './../config.json'

Vue.use(Vuex);

const coinTypes = ["BTC", "ETH", "DOGE", "XRP", "TRX",
 "XLM", "BCH", "BSV", "NEO", "ADA", 
 "AWC", "GO", "XTZ", "QTUM", "SMART",
 "LTC", "XMR", "VET", "VTHO", "DENT",
 "EOS", "DCN", "NEXO", "USDC", "USDT"];

const currencyTypes = ["RUB", "EUR", "USD"];

export default new Vuex.Store({
  state: {
    currencyTypes,
    coinTypes,
    data: {},
    coinFilter: []
  },
  getters: {
    coinPriceByCurrency(state) {
      return function(currency) {
        let result = [];
        for (let key in state.data) {
          result.push({
            coin: key,
            price: state.data[key][currency]
          })
        }

        if (state.coinFilter.length > 0) {
          result = result.filter(e=>state.coinFilter.includes(e.coin));
        }
        return result;
      }
    }
  },
  mutations: {
    setData(state, data) {
      if (typeof data !== "object") {
        return null;
      }

      state.data = data;
    },
    setCoinFilter(state, data) {
      state.coinFilter = data;
    }
  },
  actions: {
    async loadData({ state, commit }) {
      const  { url } = config.cryptocompare;

      const filter = state.coinFilter.join(',') || state.coinTypes.join(',');
      const response = await axios.get(`${url}pricemulti?&fsyms=${filter}&tsyms=${state.currencyTypes.join(',')}`);
      if (response.status === 200) {
        commit("setData", response.data);
      }
    }
  }
});

