/*****************
 * FRETBOARD INIT
 *****************/
class Fretboard extends Polymer.Element {
	static get is() { return 'chordc-fretboard' }

	/* lifecycle
	 ************/
	constructor() {
		super();
		// console.log('constructor');
	}
	ready() {
		super.ready();
		// console.log('ready');
		this.$.getFretboard.generateRequest();
	}
	connectedCallback() {
		super.connectedCallback();
		// console.log('connectedCallback');
	}

	/* properties
	 ************/
	static get properties() {
		return {
			flip: {
				type: Boolean
			},
			rotate: {
				type: String,
				// notify: true
			},
			fretboard: {
				type: Array,
			}
		}
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
	setActiveNote(e) {
		var fretboard = this.get(`fretboard`);
		for (var i = 0; i < fretboard.length; i++) {
			this.set(`fretboard.${i}.notes.${e.model.index}.active`, false);
		}
		e.model.set('item.active', !e.model.item.active);
		// console.log(e.model.index, e.model.item)
		// e.currentTarget.classList.toggle('active');
	}

	setNote(e) {
		this.setActiveNote(e);
		// this.notifyPath('fretboard.0.notes.0.active')
		// console.log(e.model.data)
		// e.model.set('item.name', 'X');
		// this.fretboard[0].notes[0].symbol = 'X'
		// this.notifyPath('fretboard.0.notes.0.symbol')
		// this.set('fretboard.0.notes.0.symbol', 'X')
		// console.log(this.fretboard[0].notes[0].symbol)
		// console.log(this.get('fretboard.*'))
		// this.set('rotate', 'left');

		var note = e.model.item.symbol;
		this.dispatchEvent(
			new CustomEvent(
				'note-selected',
				{
					detail: { note }
				}
			)
		);
	}
}

customElements.define(Fretboard.is, Fretboard);
































