<template>
  <div class="card-header">
    <button v-for='(item, name) in currencyIcons' :key='item'
      :class='name!==currency?"disabled":""'
      @click='changeCurrency(name)'
    >
      <i class="fas" :class='currencyIcons[name]'></i>
    </button>
  </div>
</template>

<script>
  export default {
    props: {
      value: String
    },
    data() {
      return {
        currency: this.value || "RUB",
        currencyIcons: {
          RUB: 'fa-ruble-sign',
          USD: 'fa-dollar-sign',
          EUR: 'fa-euro-sign'
        }
      }
    },
    computed: {
      currencyList() {
        return this.$store.state.currencyTypes;
      },
    },
    methods: {
      changeCurrency(value) {
        this.currency = value;
        this.$emit("input", this.currency);
      }
    }
  }
</script>

<style>
  .card-header {
    display: flex;
    flex: 1 0 auto;
  }
  .card-currency {
    border: none;
    border-bottom: 1px solid lightgray;
    padding: 0.3em 1.2em;
    margin: 0 0.1em 0.1em 0;
  }
  .card-header {
    display: flex;
    flex: 1;
    align-items: center;
  }
  .card-header > button {
    margin-right: 0.5em;
  }
</style>