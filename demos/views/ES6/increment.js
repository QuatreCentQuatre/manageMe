class IncrementView extends ViewBasic {
	constructor(options) {
		super(options);
	}

	initialize() {
		this.eventsAdded = false;
		this.incrementActive = true;
		this.$incrementBtn = this.el.querySelector('.increment-btn');
		this.$toogleEventsBtn = this.el.querySelector('.toggle-events');
		this.$value = this.el.querySelector('.value');
		this.value = parseInt(this.$value.innerHTML);

		//Exception: Don't want the toggle event to repeat every time we turn off and on events
		this.$toogleEventsBtn.addEventListener('click', ()=>{
			this.toogleEvents();
		});

		this.addEvents();
	};

	addEvents() {
		this.$incrementBtn.addEventListener('click', ()=>{
			this.incrementValue();
		});

		this.eventsAdded = true;
	};

	incrementValue(){
		if(!this.incrementActive)
			return;

		this.value ++;
		this.$value.innerHTML = this.value;
	};

	toogleEvents(){
		if(this.eventsAdded){
			this.incrementActive = !this.incrementActive;
		}
	}

	removeEvents() {};

	terminate() {
		this.removeEvents();
	};
}

Me.views['IncrementView'] = IncrementView;