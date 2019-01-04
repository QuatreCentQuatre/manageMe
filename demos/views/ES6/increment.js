class IncrementView extends ViewBasic {
	constructor(options) {
		super(options);
	}

	initialize() {
		this.eventsAdded = false;
		this.$incrementBtn = this.$('.increment-btn');
		this.$toogleEventsBtn = this.$('.toggle-events');
		this.$value = this.$('.value');
		this.value = parseInt(this.$value.html());

		//Exception: Don't want the toggle event to repeat every time we turn off and on events
		this.$toogleEventsBtn.on('click', ()=>{
			this.toogleEvents();
		});

		this.addEvents();
	};

	addEvents() {
		this.$incrementBtn.on('click', ()=>{
			this.incrementValue();
		});

		this.eventsAdded = true;
	};

	incrementValue(){
		this.value ++;
		this.$value.html(this.value);
	};

	toogleEvents(){
		if(this.eventsAdded){
			this.removeEvents();
		} else{
			this.addEvents();
		}
	}

	removeEvents() {
		this.$incrementBtn.off('click');

		this.eventsAdded = false;
	};

	terminate() {
		this.removeEvents();
	};
}

Me.views['IncrementView'] = IncrementView;