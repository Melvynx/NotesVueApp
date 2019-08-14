//utile
const msgSendNote = function() {
  infoAfterSend.styleObject.top = "10%"
  infoAfterSend.seen = true;
  setTimeout(function () { infoAfterSend.styleObject.top = '-600px' }, 2000);
  setTimeout(function () { infoAfterSend.seen = false; }, 2000);
}
const checkedTitle = function(title) {
  if (title.length > 3 && title.length < 30) {
    return true;
  } else {
    infoAfterSend.infoAfterSendMsg = "Merci de donner un titre de plus de 3 caractères et un maximume de 30.";
    msgSendNote();
    return false;
  }
}
const checkedNote = function(note) {
  if (note.length > 3 && note.length < 2000) {
    return true;
  } else {
    infoAfterSend.infoAfterSendMsg = "Merci d'effectuer une note de plus de 5 caractères. 2000 est la limites.";
    msgSendNote();
    return false;
  }
}
const findTheBiggestID = function() {
  let biggestID = Math.max(...listNote.listNotes.map(item => item.id)) + 1;
  return biggestID;
}
//variable
let infoAfterSendMsg;
let message23 = "";
//vue.js
const listNote = new Vue ({
  el: "#listNote",
  data: {
    listNotes: [{ id: 0, titre: "aucun sens", note: "Pourquoi ce n'est pas possible d'aller à l'école quand je pense que les enfants n'aime pas les chaise mais si il le pense moi je le pense"}, {  id: 1, titre: "l'envie des pouls", note: "si les poules avait des dents je pense que je souhaiterais devenir une poule"}, { id: 2, titre: "1 éléphant grand", note: "Lorsque je suis aller à la maison\n j'ai vue un éléphant."}, { id: 3, titre: "le secret de jane", note: "la première fois que j'ai vue JANE je pensais pas pouvoir l'aime"}],
    seen: true,
  
  
  },
  methods: {
    overDone: function (event) {
      event.target.getElementsByClassName("buttonDelete")[0].classList.remove("hideButton")
      console.log("l'oiseau est la");
      console.log(event.target.getAttribute("data-id"));
    },
    overFalse: function () {
      event.target.getElementsByClassName("buttonDelete")[0].classList.add("hideButton")
      console.log("il est partie")
    }
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
      if (checkedTitle(this.titre) && checkedNote(this.message)) {
        
        listNote.listNotes.push({ id: findTheBiggestID(), titre : this.titre, note : this.message});
        console.log("it's pushed");
        this.message = "";
        this.titre = "";
        msgSendNote();
        infoAfterSend.infoAfterSendMsg = "La note à été sauvegarder.";
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
listNote.listNotes.find(function(element) { return element.id == 2 })