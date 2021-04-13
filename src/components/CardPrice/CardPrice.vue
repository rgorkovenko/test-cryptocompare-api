<template>
  <div class="card-price">
    <div class='card-header-container'>
      <card-header v-model='currency' class='card-header'/>
      <button @click="refreshData"><i class="fas fa-sync"></i></button>
    </div>
    <div class="loading" v-if='loading'>...</div>
    <div class="card-body" v-else>
      <filterValues :items='coinList' @change='changeFilter'/>
      <table class='coin-table'>
        <thead>
          <tr>
            <th>
              Coin 
              <button @click='sortCoinList("coin")' class='small' :class='sort.coin.using?"active":"disabled"'>
                <i class="fas" :class='sort.coin[sort.coin.type+"icon"]'></i>
              </button>
            </th>
            <th>
              Price 
              <button @click='sortCoinList("price")' class='small' :class='sort.price.using?"active":"disabled"'>
                <i class="fas" :class='sort.price[sort.price.type+"icon"]'></i>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='item in getCoinPricesByCurrency()' :key="item.coin">
            <td>{{item.coin}}</td>
            <td>{{item.price}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import FilterValues from '../helpers/FilterValues.vue';
import CardHeader from './CardHeader.vue';

export default {
  components:{
    FilterValues,
    CardHeader
  },
  data() {
    return {
      currency: "RUB",
      loading: false,
      sort: {
        coin: {
          using: false,
          type: "",
          ascicon: "fa-sort-alpha-up-alt",
          descicon: "fa-sort-alpha-down-alt",
          icon: "fa-sort-alpha-up-alt"
        },
        price: {
          using: false,
          type: "",
          ascicon: "fa-sort-amount-up",
          descicon: "fa-sort-amount-down",
          icon: "fa-sort-amount-up"
        }
      },
      
    }
  },
  created() {
    this.refreshData();
  },
  computed: {
    coinList() {
      return this.$store.state.coinTypes;
    }
  },
  methods: {
    changeFilter(values) {
      this.$store.commit("setCoinFilter", values);
    },
    getCoinPricesByCurrency() {
      let values = this.$store.getters.coinPriceByCurrency(this.currency);

      let sortingField = null;
      for (let key in this.sort) {
        if (this.sort[key].using) {
          sortingField = key;
        }
      }
      if (!sortingField) return values;

      return values.sort((a,b)=> {
        const compare = this.sort[sortingField].type === "asc" 
          ? a[sortingField] > b[sortingField]
          : a[sortingField] < b[sortingField]
        return compare
      });
    },
    sortCoinList(field) {
      for(let key in this.sort) {
        this.sort[key].using = false;
      }

      this.sort[field].using = true;
      this.sort[field].type = this.sort[field].type === "asc" ? "desc" : "asc";
    },
    async refreshData() {
      this.loading = true;
      await this.$store.dispatch("loadData");
      this.loading = false;
    }
  }
}

</script>

<style scoped>
  .card-price {
    display: flex;
    flex-direction: column;
    width: 300px;
    border: 1px solid white;
    border-radius: 10px;
  }
  .card-price > .card-header-container {
    display: flex;
    font-size: 20px;
    height: 30px;
    padding: 10px;
    border-bottom: 2px solid #2c3e50;
  }
  .card-price > .card-body {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  table {
    width: 100%;
    text-align: left;
  }
  table tr:nth-child(even)>td {
    background-color: rgb(238, 238, 238);
  }
</style>