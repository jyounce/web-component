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
				type: String,
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
			'fretboardChanged(fretboard.*)'
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

	/* response handlers
	 ********************/
	setFretboard(e) {
		this.set('fretboard', e.detail.response);
	}

	/* events
	 *********/
	setActiveNote(model) {
		var fretboard = this.get(`fretboard`);

		for (var i = 0; i < fretboard.length; i++) {
			let stringNote = fretboard[i].notes[model.index];
			if (!stringNote.active) continue
			if (stringNote == model.item) continue
			this.set(`fretboard.${i}.notes.${model.index}.active`, false);
		}

		model.set('item.active', !model.item.active);
		this.set('activeNote', model.item.active ? model.item.symbol : null)
		// this.set('activeNotes.1', model.item.symbol)
		// this.push('activeNotes', model.item.symbol);
	}

	isNoteKey(e) { //: boolean
		var accepted = [' ', 'Enter'];
		if (accepted.indexOf(e.key) === -1) return false;
		e.preventDefault();
		return true;
	}

	setNote(e) {
		if (typeof e.key == 'string' && !this.isNoteKey(e)) return
		var model = e.model;
		this.setActiveNote(model);
		// this.noteSelectedEvent(model);
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
































