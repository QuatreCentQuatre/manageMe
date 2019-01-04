class DemoView extends ViewBasic {
	constructor(options) {
		super(options);


		this.viewTemplate = `
			<br>
			<div class="increment-view" style="border: 1px solid #eee;padding: 10px;" me:view="IncrementView">
				<div>
					<p class="value">0</p>
				</div>
				<button class="increment-btn">Increment</button>
				<button class="toggle-events">Toggle Events</button>
				<small><sup>*</sup>If the increment is not working, it's because the view has not been initialised or you toggled the event off</small>
			</div>
		`;
	}

	initialize() {
		this.$btnAddView =  this.$('#add-view');
		this.$btnAddViewNoInit =  this.$('#add-view-no-init');
		this.$btnInitView =  this.$('#init-views');
		this.$elViewWrapper = this.$('#element-view-wrapper');

		this.addEvents();
	}

	addEvents() {
		this.$btnAddView.on('click', ()=>{
			this.addViewElement(true);
		});
		this.$btnAddViewNoInit.on('click', ()=>{
			this.addViewElement(false);
		});
		this.$btnInitView.on('click', ()=>{
			Me.manage.initViews();
		});
	}

	addViewElement(init){
		this.$elViewWrapper.append(this.viewTemplate);

		if(init){
			Me.manage.initViews();
		}
	}

	removeEvents() {

	};

	terminate() {
		this.removeEvents();
	};
}

Me.views['DemoView'] = DemoView;