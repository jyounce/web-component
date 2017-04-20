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
	setActiveNote(model) {
		var fretboard = this.get(`fretboard`)

		for (var i = 0; i < fretboard.length; i++) {
			if (model.item.active) continue
			this.set(`fretboard.${i}.notes.${model.index}.active`, false);
		}

		model.set('item.active', !model.item.active);
		// e.currentTarget.classList.toggle('active');
	}

	setNote(e) {
		var model = e.model;
		this.setActiveNote(model);
		// this.notifyPath('fretboard.0.notes.0.active')
		// console.log(e.model.data)
		// e.model.set('item.name', 'X');
		// this.fretboard[0].notes[0].symbol = 'X'
		// this.notifyPath('fretboard.0.notes.0.symbol')
		// this.set('fretboard.0.notes.0.symbol', 'X')
		// console.log(this.fretboard[0].notes[0].symbol)
		// console.log(this.get('fretboard.*'))
		// this.set('rotate', 'left');
		var note = model.item.active ? model.item.symbol : null;
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
































