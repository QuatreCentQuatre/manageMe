class DemoView extends ViewBasic {
	defaults(){
		return {
			'template': 'modal'
		}
	}
	
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
		this.$btnAddView =  this.el.querySelector('#add-view');
		this.$btnAddViewNoInit =  this.el.querySelector('#add-view-no-init');
		this.$btnInitView =  this.el.querySelector('#init-views');
		this.$elViewWrapper = this.el.querySelector('#element-view-wrapper');

		this.addEvents();
	}

	addEvents() {
		this.$btnAddView.addEventListener('click', ()=>{
			this.addViewElement(true);
		});

		this.$btnAddViewNoInit.addEventListener('click', ()=>{
			this.addViewElement(false);
		});

		this.$btnInitView.addEventListener('click', ()=>{
			Me.manage.initViews();
		});
	}

	addViewElement(init){
		this.$elViewWrapper.insertAdjacentHTML('afterend',this.viewTemplate);

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