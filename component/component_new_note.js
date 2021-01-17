Vue.component("newnoteform", {
  props: ["note"],
  data() {
    return {
      rows: 3,
      message: "",
      titre: "",
      showListColor: false,
      color: "#69626d",
      backgroundColors: [
        "#69626d",
        "#177e89",
        "#32021f",
        "#8b635c",
        "#49306b",
        "#6b2000",
        "#15075f",
        "#5c0029",
      ],
    };
  },
  methods: {
    change() {
      const messageSplit = this.message.split("\n");
      const messageSplitLength = messageSplit.length;
      if (messageSplitLength > 2) {
        this.rows = messageSplitLength + 1;
      }
    },
    listColor() {
      this.showListColor = true;
    },
    mouseLeaveColor() {
      this.showListColor = false;
    },
    changeColor(color) {
      this.color = backgroundColors[color];
      this.showListColor = false;
    },
    clickSendNote() {
      if (checkedTitle(this.titre) && checkedNote(this.message)) {
        const newNote = {
          id: String(findTheBiggestID()),
          titre: this.titre,
          note: this.message,
          color: this.color,
          date: Date.now(),
          archived: false,
        };
        this.$emit("create-new", newNote);
        this.message = "";
        this.titre = "";
        this.rows = 3;
        msgSendNote();
        infoAfterSend.infoAfterSendMsg = "La note à été sauvegarder.";
      }
    },
  },
  template: `
      <div id="createNoteComponent" class="createNewNote" v-bind:style="{ backgroundColor: color }">
        <input v-model="titre" type="text" class="titleCreate" id="titleNote" placeholder="Titre..." v-bind:style="{ backgroundColor: color, borderColor: color }">
        <textarea v-bind:style="{ backgroundColor: color }" class="noteCreate createNoteTextArea" v-model="message" v-on:keyup="change" id="containedNote" placeholder="Note..." v-bind:rows="rows"></textarea><br/>
        <input class="createNoteButton" type="submit" v-on:click="clickSendNote" id="sendNote" value="Noter" >
        <input v-bind:style="{ backgroundColor: color }" class="colorForNewNote" type="button" v-on:click="listColor" @mouseover="listColor">
        <transition name="fade">
          <div class="listNewColor" v-show="showListColor" id="listColor" @mouseleave="mouseLeaveColor">
            <button v-for="(color, index) in backgroundColors" v-on:click="changeColor(index)" v-bind:style="{ backgroundColor: color }" class="buttonLabelColor"/>
          </div>
        </transition>
      </div>
  `,
});
