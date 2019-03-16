import Vue from 'vue'
import Vuex from 'vuex'
import ax from 'axios'
export const axios = ax.create();
var COUNTRIES_API_IP = "https://restcountries.eu/rest/v2/all"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    countries:[]
  },
  mutations: {
    setCountries(state,countries){
      state.countries = countries;
    }
  },
  actions: {
    getCountries({commit}){
      let countr=[]
      axios.get(COUNTRIES_API_IP).then(response=>{

        for (var k in response.data) {
          countr.push({title: response.data[k].currencies[0].code ,img:response.data[k].flag})
        }
        commit('setCountries',countr)
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  getters : {
    getCountries: state => state.countries
  }
})
