Vue.component('note', {
  props: ["note"],
  data: function() {
    return{
      showDelete: false,
      showEditTitle: false,
      showEditNote: false,
      rowChange: 3,
    }
  },

  methods: {
    mouseOver: function (event) {
      this.showDelete = true;
    },
    mouseLeave: function (event) {
      this.showDelete = false;
    },
    deleteNote: function(event) {
      const id = this.note.id;
      const index = listNote.notes.findIndex(note => note.id === id);
      if(index > -1) {
        listNote.notes.splice(index, 1);
      }
      return true;
    },
    editTitle: function(event) {
      this.showEditTitle = true;        
      this.$nextTick(() => this.$refs.refEditTitle.focus());
    },
    stopEditTitle: function() {
      this.showEditTitle = false;
    },
    editNote: function(event) {
      this.showEditNote = true;
      this.$nextTick(() => this.$refs.refEditNote.focus());
    },
    stopEditNote: function() {
      this.showEditNote = false;
    },
    changeRow: function(event) {
      const messageSplit = this.note.note.split("\n");
      const messageSplitLength = messageSplit.length;
      if (messageSplitLength > 2) {
        this.rowChange = messageSplitLength + 1;
      }
    },
    countNombreCaractres: function() {
      titleLenght = this.note.titre.length;
    
      if (titleLenght > 31) {
        this.stopEditTitle();
        infoAfterSend.infoAfterSendMsg = "Merci de ne pas dépasser 30 caractères pour le titre.";
        msgSendNote();  
      } 
    }
  },
  template: `
  <div class="note" @mouseover="mouseOver" @mouseleave="mouseLeave">
    <h1 
      v-show="!showEditTitle"
      v-on:click="editTitle">
      {{ note.titre }}
    </h1>
    <input v-on:keyup.enter="stopEditTitle" v-on:keyup="countNombreCaractres" v-show="showEditTitle" ref="refEditTitle" class="changeNoteInput" type="text" v-model="note.titre" @focusout="stopEditTitle" v-on:input="$emit('edit-note-storage')">
    <p class="noteContenue" v-show="!showEditNote" v-on:click="editNote">{{ note.note }}</p>
    <textarea 
      v-show="showEditNote"
      ref="refEditNote"
      v-on:keyup="changeRow" 
      v-bind:rows="rowChange" 
      class="changeNoteTextarea"
      @focusout="stopEditNote"
      type="text"
      v-on:input="$emit('edit-note-storage')"
      v-model="note.note">
    </textarea> 
    <button class="buttonDelete" v-show="showDelete" v-on:click="deleteNote">
      <img src="trash.svg" class="svgTrash" />
    </button>
  </div>
  `
})