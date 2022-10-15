import NoteApi from './NoteApi.js';
import NoteView from './NoteView.js';

export  default class App{
    constructor(root){
        this.notes= [];
        this.activeNote = null;
        this.view = new NoteView(root,this._handlers());

        this._refreshNotes();
    }

    _refreshNotes(){
        const notes = NoteApi.getAllNotes(); //Fetch  all notes from localstorage

        this._setNotes(notes);

        if(notes.lenght >0 ){
            this._setActiveNote(notes[0]);
        }
    }
    _setNotes(notes){
        this.notes = notes;
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.lenght>0);
    }

    _setActiveNote(note){
        this.activeNote = note;
        this.view.updateActiveNote(note);
    }

    _handlers(){
        return{
            onNoteSelect: noteId => {
                const selectedNote =    this.note.find(note => Node.Id == noteId)
                this._setActiveNote(selectedNote);
            },
            onNoteAdd: ()=>{
                const newNote = {
                    title:"New Note",
                    body:"Take Note..."
                };
                NoteApi.saveNote(newNote);
                this._refreshNotes();
            },
            onNoteEdit: (title,body)=>{
                NoteApi.saveNote({
                    id: this.activeNote.id,
                    title,
                    body
                });
                this._refreshNotes();
            },
            onNoteDelete:nodeId => {
                NoteApi.deleteNote(nodeId);
                this._refreshNotes();
            }
        }
    }
};
