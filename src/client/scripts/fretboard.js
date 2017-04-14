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
				type: String
			},
			fretboard: {
				type: Array
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
	setFretboard(event) {
		this.fretboard = event.detail.response;
	}

	/* events
	 *********/
	setNote(e) {
		e.model.set('item.symbol', 'X');
	}
}

customElements.define(Fretboard.is, Fretboard);



















