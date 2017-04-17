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
		return flip ? 'flip' : ''
	}

	/* response handlers
	 ********************/
	setFretboard(e) {
		// this.fretboard = e.detail.response;
		this.set('fretboard', e.detail.response);
	}

	/* events
	 *********/
	setNote(e) {
		// console.log(e.model.data)
		// e.model.set('item.symbol', 'X');
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
































