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
  let biggestID = Math.max(...listNote.notes.map(item => item.id)) + 1;
  return biggestID;
}
//variable
let infoAfterSendMsg;
let message23 = "";
//vue.js
const listNote = new Vue ({
  el: "#listNote",
  data: {
    notes: [{id:"0", titre: 'Salut', note:'blabla'},{ id: "1", titre: "aucun sens", note: "Pourquoi ce n'est pas possible d'aller à l'école quand je pense que les enfants n'aime pas les chaise mais si il le pense moi je le pense"}, {  id: "2", titre: "l'envie des pouls", note: "si les poules avait des dents je pense que je souhaiterais devenir une poule"}, { id: "3", titre: "1 éléphant grand", note: "Lorsque je suis aller à la maison\n j'ai vue un éléphant."}, { id: "4", titre: "le secret de jane", note: "la première fois que j'ai vue JANE je pensais pas pouvoir l'aime"}],
    seen: true,
    seenTitre: true,
    seenTitreInput: false,
    seenNote: true,
    seenNoteInput: false,
    newTitle: "",
    newNote: "",
    
  },
  methods: {
    mouseOver: function (event) {
      const children = event.currentTarget.children;
      // Toujours le dernier élément du tableau
      const deleteButton = children[children.length - 1];

      if(deleteButton) {
        deleteButton.classList.remove("hideButton");
      }
    },
    mouseLeave: function (event) {
      const children = event.currentTarget.children;
      const deleteButton = children[children.length - 1];
      
      if(deleteButton) {
        deleteButton.classList.add("hideButton");
      }
    },
    deleteNote: function(event) {
      const parentElement = event.currentTarget.parentElement;
      const id = parentElement.getAttribute('data-id');
      const index = listNote.notes.findIndex(note => note.id === id);

      console.log(index);
      if(index > -1) {
        listNote.notes.splice(index, 1);
      }
      return true;
    },
    editTitle: function(event) {
      const children = event.currentTarget.parentElement.children;
      this.newTitle = children[0].innerHTML;
      const [title, content] = children;
      title.classList.add("hideInput");
      content.classList.remove("hideInput");
      content.focus();
      // When the elements loose focus, we should save the note
      const save = (event) => {
        title.classList.remove("hideInput");
        content.classList.add("hideInput");
        
        const parentElement = event.currentTarget.parentElement;
        const id = parentElement.getAttribute('data-id');
        const index = listNote.notes.findIndex(note => note.id === id);
        
        console.log(index);
        if(index > -1) {
          debugger;
          listNote.notes[index].titre = this.newTitle;
        }

      };

      title.addEventListener('focusout', save);
      content.addEventListener('focusout', save);
  
    },
    editNote: function(event) {
      const children = event.currentTarget.parentElement.children;
      this.newNote = children[2].innerHTML;
      const note = children[2];
      const content = children[3];
      note.classList.add("hideInput");
      content.classList.remove("hideInput");
      content.focus();

      const save = (event) => {
        note.classList.remove("hideInput");
        content.classList.add("hideInput");
        const parentElement = event.currentTarget.parentElement;
        const id = parentElement.getAttribute('data-id');
        const index = listNote.notes.findIndex(note => note.id === id);

        if (index > -1) {
          listNote.notes[index].note = this.newNote;
        }
      }
      note.addEventListener('focusout', save);
      content.addEventListener('focusout', save);
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
      const messageSplit = this.message.split("\n");
      const messageSplitLength = messageSplit.length;
      if (messageSplitLength > 2) {
        this.rows = messageSplitLength + 1;
      }
    },
    clickSendNote: function () {
      if (checkedTitle(this.titre) && checkedNote(this.message)) {
        
        listNote.notes.push({ id: String(findTheBiggestID()), titre : this.titre, note : this.message});
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
listNote.notes.find(function(element) { return element.id == 2 })