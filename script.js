//utile
msgSendNote = function() {
  infoAfterSend.styleObject.top = "10%"
  infoAfterSend.seen = true;
  setTimeout(function () { infoAfterSend.styleObject.top = '-600px' }, 2000);
  setTimeout(function () { infoAfterSend.seen = false; }, 2000);
}
//variable
let infoAfterSendMsg;
let message23 = "";
//vue.js
const listNote = new Vue ({
  el: "#listNote",
  data: {
    listNotes: [{ titre: "aucun sens", note: "Pourquoi ce n'est pas possible d'aller à l'école quand je pense que les enfants n'aime pas les chaise mais si il le pense moi je le pense"}, { titre: "l'envie des pouls", note: "si les poules avait des dents je pense que je souhaiterais devenir une poule"}, { titre: "1 éléphant grand", note: "Lorsque je suis aller à la maison\n j'ai vue un éléphant."}, { titre: "le secret de jane", note: "la première fois que j'ai vue JANE je pensais pas pouvoir l'aime"}],
  }
});
const createNote = new Vue({
  el: "#createNote",
  data: {
    rows: 3, 
    message: "",
    titre: "",
  },
  methods: {
    change: function (event) {
      messageSplit = this.message.split("\n");
      messageSplitLength = messageSplit.length;
      if (messageSplitLength > 2) {
        this.rows = messageSplitLength + 1;
      }
    },
    clickSendNote: function () {
      if (this.titre.length > 3 && this.titre.length < 30) {
        if (this.message.length > 5 && this.message.length < 2000) {
          listNote.listNotes.push({ titre : this.titre, note : this.message});
          console.log("it's pushed");
          this.message = "";
          this.titre = "";
          msgSendNote();
          infoAfterSend.infoAfterSendMsg = "La note à été sauvegarder.";
        }
        else {
          infoAfterSend.infoAfterSendMsg = "Merci d'effectuer une note de plus de 5 caractères. 2000 est la limites.";
          msgSendNote();
        }
      }
      else {
        infoAfterSend.infoAfterSendMsg = "Merci de donner un titre de plus de 3 caractères et un maximume de 30.";
        msgSendNote();
      }
    }
  }
})
const infoAfterSend = new Vue({
  el: "#infoAfterSend",
  data: {
    seen: false,
    infoAfterSendMsg: "La note à été sauvegarder.",
    styleObject: {
      top: '-600px'
    }
  }
})