<template>
  <div class='filter-container'>
    <input type='text' class='filter-input' v-model='filter' @input='changeFilter' placeholder='type coin name'/>
    <div class='filtered-list' v-if='searching'>
      <button v-for='item in filteredList' :key='item' @click='selectItem(item)' class='disabled small'>
        {{item}}
      </button>
      <button class='small close-filter' @click='closeFilter'>
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class='selected-items' v-if='selectedItems.length'>
      <button v-for='item in selectedItems' :key='item.name' @click='removeItem(item)' class='small'>
        {{item}}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: function() { return [] }
    },
    defaultValues: {
      type: Array,
      default: function() { return [] }
    }
  },
  data() {
    return {
      searching: false,
      filter: "",
      filteredList: [],
      selectedItems: []
    }
  },
  methods: {
    apply() {
      this.$emit("change", this.selectedItems);
    },
    removeItem(item) {
      this.selectedItems = this.selectedItems.filter(e => e!==item);
      this.apply();
    },
    selectItem(item) {
      if (!this.selectedItems.includes(item)) {
        this.selectedItems.push(item);
      }

      this.apply();
    },
    closeFilter() {
      this.searching = false;
      this.filter = "";
    },
    changeFilter(event) {
      if (event.target.value === "") {
        this.filteredList = [];
        this.searching = false;
        return;
      }

      this.searching = true;
      this.filteredList = this.items.filter((e)=>{
        return e.indexOf(event.target.value.toUpperCase()) > -1
      });
    },
  }
}
</script>

<style scoped>
  .filter-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  .filtered-list {
    display: inline-flex;
    align-items: flex-start;
  }
  .filtered-list .close-filter {
    margin-left: auto;
    background-color: #5bc0de;
  }
  input.filter-input:focus {
    outline: none;
  }

</style>