const backgroundColors = ['#69626d', '#177e89', '#32021f', '#8b635c', '#49306b', '#6b2000', '#15075f', '#5c0029'];
const infoDeleteTitle = 'Un click pour supprimer une note.';
const infoLabelTitle = 'Un click pour modifier le Label (couleur)';
const archivedInfo = 'Cliquer une fois pour instantanément archiver votre discution. Elle sera retrouvable en cliquant sur archived';
const infoArchivedLabel = 'Cette note est archiver. \n Cliquer sur archiver pour la desarchiver.';
const editNoteInfo = 'Un click permet de modifier la note.';
const editTitleInfo = 'Un click permet de modifier le titre de la note.';
Vue.component('note', {
  props: ['note'],
  data() {
    return {
      color: backgroundColors[this.note.color],
      rowChange: 3,
      showColor: false,
      showDelete: false,
      showEditTitle: false,
      showEditNote: false,
      showListColor: false,
      showValidationDelete: false,
      infoDateCreateNote: new Date(this.note.date),
      styleButton: {
        background: '#69626d',
        border: '1px solid #d1d1d9',
      },
      backgroundColors: ['#69626d', '#177e89', '#32021f', '#8b635c', '#49306b', '#6b2000', '#15075f', '#5c0029'],
    };
  },
  computed: {
    ifArchived() {
      return this.note.archived;
    },
  },
  methods: {
    mouseOver() {
      this.showDelete = true;
      this.showColor = true;
    },
    mouseLeave() {
      this.showDelete = false;
      this.showColor = false;
    },
    deleteNote() {
      this.showValidationDelete = true;
    },
    yesDeleteNote() {
      const { id } = this.note;
      const index = listNote.notes.findIndex((note) => note.id === id);
      if (index > -1) {
        listNote.notes.splice(index, 1);
      }
      this.showValidationDelete = false;
      return true;
    },
    listColor() {
      this.showListColor = !this.showListColor;
    },
    noDeleteNote() {
      this.showValidationDelete = false;
    },
    changeColor(colorIndex) {
      this.color = backgroundColors[colorIndex];
      this.showListColor = false;
      this.note.color = this.color;
      listNote.persist();
    },
    mouseLeaveColor() {
      this.showListColor = false;
    },
    editTitle() {
      this.showEditTitle = true;
      this.$nextTick(() => this.$refs.refEditTitle.focus());
    },
    stopEditTitle() {
      this.showEditTitle = false;
    },
    editNote() {
      this.showEditNote = true;
      this.$nextTick(() => this.$refs.refEditNote.focus());
    },
    stopEditNote() {
      this.showEditNote = false;
    },
    changeRow() {
      const messageSplit = this.note.note.split('\n');
      const messageSplitLength = messageSplit.length;
      if (messageSplitLength > 2) {
        this.rowChange = messageSplitLength + 1;
      }
    },
    countNombreCaractres() {
      titleLenght = this.note.titre.length;
      if (titleLenght > 31) {
        this.stopEditTitle();
        infoAfterSend.infoAfterSendMsg = 'Merci de ne pas dépasser 30 caractères pour le titre.';
        msgSendNote();
      }
    },
    archived() {
      this.note.archived = !this.note.archived;
      listNote.persist();
    },
  },
  template: `
  <div v-bind:style="{ backgroundColor: color || this.note.color }" class="note" @mouseover="mouseOver" @mouseleave="mouseLeave" v-bind:title="infoDateCreateNote">
    <h1 
      title="${editTitleInfo}"
      v-show="!showEditTitle"
      v-on:click="editTitle">
      {{ note.titre }}
    </h1>
    <input v-on:keyup.enter="stopEditTitle" v-on:keyup="countNombreCaractres" v-show="showEditTitle" ref="refEditTitle" class="changeNoteInput" type="text" v-model="note.titre" @focusout="stopEditTitle" v-on:input="$emit('edit-note-storage')">
    <p title="${editNoteInfo}" class="noteContenue" v-show="!showEditNote" v-on:click="editNote">{{ note.note }}</p>
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
    <transition name="deleteButtonTransition">
      <button title="${infoDeleteTitle}" class="buttonDelete" v-show="showDelete" v-on:click="deleteNote">
        <img src="trash.svg" class="svgTrash" />
      </button>
    </transition><transition name="deleteButtonTransition">
      <button v-on:click="archived" class="buttonArchived" v-show="showDelete" title="${archivedInfo}">
          <img src="archived.svg" class="svgArchived">
      </button>
    </transition>
    <p title="${infoArchivedLabel}" class="ifArchivedLabel" v-show="ifArchived">Archived</p>
    <transition name="fade">
      <div class="blockOfValidationDeleteNote" v-show="showValidationDelete">
        <div class="validationOfDelete">
          <h3 class="questionValidationDelete">Voulez vous vraiment supprimer cette note ? </h3>
          <p class="infoValidationDelete">Le titre de votre note est : <span v-bind:style="{ color: color || this.note.color }" class="titleValidationDelete">{{ note.titre }}</span>.</p>
          <button v-on:click="yesDeleteNote" class="buttonYes">OUI</button>
          <button v-on:click="noDeleteNote" class="buttonNo">NON</button>
        </div>
      </div>
    </transition>
    <div id="changeColorBlock" class="changeColorBlock">
      <transition name="deleteButtonTransition">
        <button 
          @mouseover="listColor" v-bind:style="{ backgroundColor: color || this.note.color }" title="${infoLabelTitle}" class="buttonColor" v-show="showColor" v-on:click="listColor">
        </button>
      </transition>
      <transition name="fade">
        <div class="listColor" v-show="showListColor" @mouseleave="mouseLeaveColor">
            <button v-for="(color, index) in backgroundColors" v-on:click="changeColor(index)" v-bind:style="{ backgroundColor: color }" class="buttonLabelColor"/>
        </div>
      </transition>
    </div>
  </div>
  `,
});
