<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6 offset-sm-3">
        <h1>{{msj}}</h1>

      <div>
        <label class="typo__label">Custom option template</label>
        <multiselect v-model="value" placeholder="Fav No Man’s Sky path" label="title" track-by="title" :options="options" :option-height="104" :custom-label="customLabel" :show-labels="true">
          <template slot="singleLabel" slot-scope="props"><img class="option__image" :src="props.option.img" alt="No Man’s Sky"><span class="option__desc"><span class="option__title">{{ props.option.title }}</span></span></template>
          <template slot="option" slot-scope="props"><img class="option__image" :src="props.option.img" alt="No Man’s Sky">
             <div class="option__desc"><span class="option__title">{{ props.option.title }}</span></div>
          </template>
        </multiselect>
        <pre class="language-json"><code>{{ value  }}</code></pre>
      </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <select class="custom-select" id="inputGroupSelect03" aria-label="Example select with button addon">
              <option selected>Choose...</option>
              <option value="1"><img src="https://cdn.pixabay.com/photo/2015/05/17/10/51/facebook-770688_960_720.png" width="17px" />Facebook</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <input type="text" class="form-control" aria-label="Text input with checkbox">
      </div>

      </div>
    </div>
  </div>
</template>


<!-- New step!
     Add Multiselect CSS. Can be added as a static asset or inside a component. -->

<script>

import Multiselect from 'vue-multiselect'

import axios from 'axios'

export default {
  // OR register locally
  components: { Multiselect },
  data () {
    return {
      msj: "CONVERTIDOR",
      value: { title: 'Explorer', desc: 'Discovering new species!', img: 'static/posters/creatures.png' },
      options: []
    }
  },
  mounted(){
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {

      for (var k in response.data) {
        this.options.push({title: response.data[k].currencies[0].code ,img:response.data[k].flag})
      }
      console.log(response.data)
    })
  },
  methods: {
    customLabel ({ title, desc }) {
      return `${title} – ${desc}`
    }
  }
}
</script>

<style media="screen">
  .option__image{
    width: 20px !important;
  }
  .option__desc{
    display: inline-block !important;
  }
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
