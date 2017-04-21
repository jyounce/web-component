/*****************
 * FRETBOARD INIT
 *****************/
class Fretboard extends Polymer.Element {
	static get is() { return 'chordc-fretboard' }

	/* lifecycle
	 ************/
	constructor() {
		super();
	}
	ready() {
		super.ready();
		this.$.getFretboard.generateRequest();
	}
	connectedCallback() {
		super.connectedCallback();
	}

	/* properties
	 ************/
	static get properties() {
		return {
			flip: {
				type: Boolean
			},
			rotate: {
				type: String
			},
			fretboard: {
				type: Array
			},
			activeNote: {
				type: Object,
				notify: true
			},
			activeNotes: {
				type: Array,
				notify: true,
				value: []
			}
		}
	}

	/* complex observers
	 ********************/
	static get observers() {
		return [
			'fretboardChanged(fretboard.*)',
		]
	}

	fretboardChanged(fretboard) {
		// console.log(fretboard)
	}

	/* computed bindings
	 ********************/
	_flip(flip) {
		return flip ? 'flip' : '';
	}
	_activeNote(active) {
		return active ? 'active' : '';
	}
	_stringify(item) {
		var json = JSON.stringify(item, null, '\t');
		return json;
	}

	/* private
	 **********/
	__sortNote(note) {
		if (!note) return;
		var symbol = note.symbol;
		delete note.symbol;
		note.symbol = symbol;
	}

	/* response handlers
	 ********************/
	setFretboard(e) {
		this.set('fretboard', e.detail.response);
	}

	/* note(s) methods
	 ******************/
	updateActiveNotes(model) {
		var index      = model.index,
			activeNote = model.item.active ? model.item : null;

		if (activeNote) {
			this.splice('activeNotes', index, 1);
			this.splice('activeNotes', index, 0, activeNote);
		} else {
			this.splice('activeNotes', index, 1);
		}
	}

	setActiveNote(model) {
		var fretboard = this.get(`fretboard`);

		for (let i = 0; i < fretboard.length; i++) {
			let stringNote = fretboard[i].notes[model.index];
			if (!stringNote.active) continue
			if (stringNote == model.item) continue
			this.set(`fretboard.${i}.notes.${model.index}.active`, false);
		}

		var isActive = !!model.item.active;
		model.set('item.fret', model.parentModel.item.fret);
		model.set('item.active', !isActive);
		var activeNote = !isActive ? model.item : null;
		this.__sortNote(activeNote);
		this.set('activeNote', activeNote);
	}

	setNote(e) {
		if (typeof e.key == 'string' && !this.isNoteKey(e)) return
		var model = e.model;
		this.setActiveNote(model);
		this.updateActiveNotes(model);
	}

	/* events
	 *********/
	isNoteKey(e) { //: boolean
		var accepted = [' ', 'Enter'];
		if (accepted.indexOf(e.key) === -1) return false;
		e.preventDefault();
		return true;
	}

	// custom event out example
	noteSelectedEvent(model) {
		var note = model.item.active ? model.item.symbol : null;
		this.dispatchEvent(
			new CustomEvent('note-selected', {
				detail: { note }
			})
		);
	}
}

customElements.define(Fretboard.is, Fretboard);
































