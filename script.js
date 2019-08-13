

const createNote = new Vue({
  el: "#createNote",
  data: {
    rows: 3,  
    message: "",    
  },
  methods: {
    change: function (event) {
      console.log(this.message);
    }
  }
})

const app = new Vue({
  el: "#app",
  data: {
    message: "salut",
  }
})