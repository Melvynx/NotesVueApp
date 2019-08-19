// utile
const msgSendNote = function () {
  infoAfterSend.styleObject.top = '10%';
  infoAfterSend.seen = true;
  setTimeout(() => { infoAfterSend.styleObject.top = '-600px'; }, 2000);
  setTimeout(() => { infoAfterSend.seen = false; }, 2000);
};
const checkedTitle = function (title) {
  if (title.length > 3 && title.length < 30) {
    return true;
  }
  infoAfterSend.infoAfterSendMsg = 'Merci de donner un titre de plus de 3 caractères et un maximume de 30.';
  msgSendNote();
  return false;
};
const checkedNote = function (note) {
  if (note.length > 3 && note.length < 2000) {
    return true;
  }
  infoAfterSend.infoAfterSendMsg = "Merci d'effectuer une note de plus de 5 caractères. 2000 est la limites.";
  msgSendNote();
  return false;
};
const findTheBiggestID = function () {
  const biggestID = Math.max(...listNote.notes.map((item) => item.id)) + 1;
  return biggestID;
};
// variable
let infoAfterSendMsg;
// vue.js
const listNote = new Vue({
  el: '#listNote',
  data: {
    notes: [],
  },
  mounted() {
    if (localStorage.notes) {
      this.notes = JSON.parse(localStorage.notes);
    } else {
      this.notes = [];
    }
  },
  watch: {
    notes(notes) {
      localStorage.notes = JSON.stringify(notes);
    },
  },
  methods: {
    persist() {
      localStorage.notes = JSON.stringify(this.notes);
    },
  },
});
const createNote = new Vue({
  el: '#createNote',
  data: {
    rows: 3,
    message: '',
    titre: '',
  },
});
const infoAfterSend = new Vue({
  el: '#infoAfterSend',
  data: {
    seen: false,
    infoAfterSendMsg: 'La note à été sauvegarder.',
    styleObject: {
      top: '-600px',
    },
  },
});
