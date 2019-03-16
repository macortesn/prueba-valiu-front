<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 offset-sm-4">
        <h1 class="myTitle">{{msj}}</h1>
        <p class="mylabel mt">You send</p>
        <div class="inptmult">
          <multiselect v-on:change="convertAmount" class="multisl" v-model="valueFrom" placeholder="Selecciona" label="title" track-by="title" :options="getOptions" :option-height="104" :custom-label="customLabel" :show-labels="false">
            <template slot="singleLabel" slot-scope="props"><img class="option__image" :src="props.option.img"><span class="option__desc"><span class="option__title">{{ props.option.title }}</span></span></template>
            <template slot="option" slot-scope="props"><img class="option__image" :src="props.option.img" alt="No Man’s Sky">
              <div class="option__desc"><span class="option__title">{{ props.option.title }}</span><span class="option__small">{{ props.option.desc }}</span></div>
            </template>
          </multiselect>
          <input v-on:change="convertAmount" type="number" v-model="amount" class="form-control inpt" aria-label="You send">
        </div>
      </div>
    </div>
    <div class="row mt">
      <div class="col-md-4 offset-sm-4">
        <h5 class="rateTag">Rate {{rate}}</h5>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 offset-sm-4">
        <p class="mylabel">Receive</p>
        <div class="inptmult">
          <multiselect v-on:change="convertAmount" class="multisl" v-model="valueTo" placeholder="Selecciona" label="title" track-by="title" :options="getOptions" :option-height="104" :custom-label="customLabel" :show-labels="false">
            <template slot="singleLabel" slot-scope="props"><img class="option__image" :src="props.option.img"><span class="option__desc"><span class="option__title">{{ props.option.title }}</span></span></template>
            <template slot="option" slot-scope="props"><img class="option__image" :src="props.option.img" alt="No Man’s Sky">
              <div class="option__desc"><span class="option__title">{{ props.option.title }}</span><span class="option__small">{{ props.option.desc }}</span></div>
            </template>
          </multiselect>
          <input v-model="result" type="text" class="form-control inpt" aria-label="You receive" disabled>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Multiselect from 'vue-multiselect'
import axios from 'axios'

var API_IP = "http://35.247.208.223:3000"

export default {
  components: { Multiselect },
  data () {
    return {
      msj: "CONVERTIDOR",
      valueFrom: {title: "COP", img: "https://restcountries.eu/data/col.svg"},
      valueTo:{title: "VEF", img: "https://restcountries.eu/data/ven.svg"},
      amount:"",
      result:"",
      options: [],
      rate:""
    }
  },
  watch:{
    amount: function(){
      this.convertAmount();
    },
    valueTo: function(){
      this.convertAmount();
    },
    valueFrom: function(){
      this.convertAmount();
    }
  },
  computed: {
    getOptions () {
      return this.$store.getters.getCountries
    }
  },
  mounted(){
    this.$store.dispatch('getCountries');
  },
  methods: {
    convertAmount(){
      this.result="";
      if(this.valueFrom != null && this.valueTo != null && this.amount != ""){
          axios.get(API_IP+'/rates/convert',{params:{
            from:this.valueFrom.title,
            to:this.valueTo.title,
            amount:this.amount
          }}).then((response) => {
            this.result=parseFloat(response.data.data.result.toFixed(5));
            this.rate=parseFloat(response.data.data.rate.toFixed(5));
          }).catch(err => {
            console.log(err);
          });
      }
    },
    customLabel ({ title, img }) {
      return `${img} - ${title}`
    }
  }
}
</script>

<style media="screen">

.inptmult{
  min-width:370px;
  border: 1px solid rgba(114,96,255,1);
  border-radius: 5px;
}
.multisl{

  width:30% !important;
  display:inline-block !important;
  min-height: auto !important;
}
.inpt{
  width:70% !important;
  display:inline-block !important;
}

.option__image{
  width: 20px !important;
}
.option__desc{
  display: inline-block !important;
}

.option__title{
  font-weight: bold !important;
  font-size: 14px !important;
  margin-left: 3px;
}
.multiselect__tags{
  background: rgba(114,96,255,1);
  background: -moz-linear-gradient(left, rgba(114,96,255,1) 0%, rgba(156,137,255,1) 100%)!important;
  background: -webkit-gradient(left top, right top, color-stop(0%, rgba(114,96,255,1)), color-stop(100%, rgba(156,137,255,1)))!important;
  background: -webkit-linear-gradient(left, rgba(114,96,255,1) 0%, rgba(156,137,255,1) 100%)!important;
  background: -o-linear-gradient(left, rgba(114,96,255,1) 0%, rgba(156,137,255,1) 100%)!important;
  background: -ms-linear-gradient(left, rgba(114,96,255,1) 0%, rgba(156,137,255,1) 100%)!important;
  background: linear-gradient(to right, rgba(114,96,255,1) 0%, rgba(156,137,255,1) 100%)!important;
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#7260ff', endColorstr='#9c89ff', GradientType=1 )!important;
  min-height: auto !important;
  border: none !important;
  border-radius: 5px 0px 0px 5px !important;
}

.multiselect__select:before{
    border-color: #fff transparent transparent !important;
    color:#fff !important;
}

.multiselect__element{
  background:#fff;
}

.multiselect__input, .multiselect__single{
  background:transparent !important;
  color:#fff;
}

.multiselect__option--highlight {
  background: rgba(114,96,255,1);
  background: -moz-linear-gradient(left, rgba(114,96,255,1) 0%, rgba(156,137,255,1) 100%)!important;
  background: -webkit-gradient(left top, right top, color-stop(0%, rgba(114,96,255,1)), color-stop(100%, rgba(156,137,255,1)))!important;
  background: -webkit-linear-gradient(left, rgba(114,96,255,1) 0%, rgba(156,137,255,1) 100%)!important;
  background: -o-linear-gradient(left, rgba(114,96,255,1) 0%, rgba(156,137,255,1) 100%)!important;
  background: -ms-linear-gradient(left, rgba(114,96,255,1) 0%, rgba(156,137,255,1) 100%)!important;
  background: linear-gradient(to right, rgba(114,96,255,1) 0%, rgba(156,137,255,1) 100%)!important;
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#7260ff', endColorstr='#9c89ff', GradientType=1 )!important;
}

.mylabel{
  text-align:right !important;
  margin:0;
  color:rgba(114,96,255);
  font-weight: bold !important;
  font-size: 14px !important;
}

.mt{
  margin-top:17px;
}

.rateTag{
  font-weight: bold !important;
  text-align: left;
  margin:0px;
  color:rgba(114,96,255);

}
.myTitle{
  font-weight:bold;
  margin-bottom:50px;
  color:rgba(102,90,195);
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
