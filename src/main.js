import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueFullPage from 'vue-fullpage.js'
import firebase from 'firebase'
import { firebaseConfig } from '../firebase-config.js' 

firebase.initializeApp(firebaseConfig);
Vue.config.productionTip = false

Vue.use(VueFullPage);

const eventHub = new Vue(); // Single event hub

Vue.mixin({
  data: function () {
    return {
        eventHub: eventHub
    }
  },
  methods: {
    fireFetch(collection, twix1, twix2, then) {
      var db = firebase.firestore();
      var finalThen;
      
      if(typeof twix1 == "function") { //fetch entire collection
        finalThen = twix1;
        db.collection(collection)
        .get()
        .then((docs) => {
            finalThen(docs);
        });
      } else { //query fetch
        var splitQuery = twix1.split(' ');
        
        var isQueryVar;
        
        var queryVar = eval("this." + splitQuery[2].substring(1,splitQuery[2].length));
        var queryLiteral = splitQuery[2];

        if(splitQuery[2][0] == "$") { //check if splitQuery[2] begins with '$'
          isQueryVar = true;
        } else {
          isQueryVar = false;
        }

        if(typeof twix2 == "function") {
          finalThen = twix2;
          db.collection(collection)
          .where(splitQuery[0], splitQuery[1], ( isQueryVar ? queryVar : queryLiteral ))
          .get()
          .then((docs) => {
              finalThen(docs);
          });
        } else { //order data by...
          finalThen = then;
          db.collection(collection)
          .where(splitQuery[0], splitQuery[1], ( isQueryVar ? queryVar : queryLiteral ))
          .orderBy(twix2)
          .get()
          .then((docs) => {
              finalThen(docs);
          });
        }
      }
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
