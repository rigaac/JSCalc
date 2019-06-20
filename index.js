/* Services */
import Store from './services/store.service.js';

/* Routes */
const router = new VueRouter({
  routes: [
    { path: '/', component: httpVueLoader('pages/home.page.vue') },
    { path: '/example', component: httpVueLoader('pages/example.page.vue') },
    { path: '*', component: httpVueLoader('pages/404.vue') }
  ]
});

/* Create */
var evaluate = new BigEval();

window.App = new Vue({
  router,
  el: '#calc',
  data: {
    lcd: '0'
  },
  methods: {
    update: function(val) {
        if (this.lcd.toString() === '0') {
          if (val === '.') {
            this.lcd = '0.';
          }
          else {
            this.lcd = '';
            this.lcd += val.toString();
          }
        }
        else {
          this.lcd += val.toString();
        }
    },
    evaluate: function() {
      if (this.lcd.length > 0) {
        var replaceOps = /[x÷]/g;
        var tmpStr = this.lcd;
        var replacedStr = tmpStr.replace(replaceOps, function(match){
          if (match === '÷') {
            return '/';
          }
          else if (match === 'x') {
            return '*';
          }
        });
        this.lcd = evaluate.exec(replacedStr);
      }
    },
    allClear: function() {
      this.lcd = 0;
    },
    backspace: function() {
      if (this.lcd.length > 1) {
        this.lcd = this.lcd.substr(0, this.lcd.length - 1);
      }
      else {
        this.lcd = 0;
      }
    }
  }
})

/* Assign global services */
Object.defineProperty(Vue.prototype, '_store', { value: new Store() });
