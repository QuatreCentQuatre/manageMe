class ViewBasic {
    constructor(options) {
        if (!this.lookAtDependencies()) {return;}

         this.uid;
         this.name        = "ViewBasic";
         this.version     = 1.00;
         this.initiated   = false;
         this.defaults    = {
            el:'',
            debug:false
        };

         this.id;
         this.el;
         this.events;
         this.debug; 

         this.$el;
         this.options;

         this.props = ['name', 'el', 'options', 'events', 'debug'];


        this.setOptions(options);
        this.setElement();

        if (!this.el || this.el == "") {
            if (this.debug) {
                console.warn("Your view el doesn't exist.");
            }
            return this;
        }

        this.init.apply(this, arguments);

    }

    lookAtDependencies() {
        let isOk = true;
        return isOk;
    };

    setOptions(options) {
        this.uid             = _.uniqueId('view-');
        let combinedSettings = _.extend({}, this.defaults, options);
        let finalOptions     = {};
        for (let key in combinedSettings) {
            var keyObject = {};
            keyObject[key] = combinedSettings[key];

            if (this.props.indexOf(key) != -1) {
                _.extend(this, keyObject);
            } else {
                finalOptions = _.extend({}, finalOptions, keyObject);
            }
        }

        this.options = _.extend({}, this.options, finalOptions);
    };

    setElement() {
        if (this.$el) {return this;}
        this.$el = $(this.el);
        this.id  = this.$el.attr('id');
    };

    init() {
        this.initiated = true;
        this.initialize.call(this, arguments);
    };

    /* Make a jquery request to find element in scope of the view */
    $(selector) {
        return this.$el.find(selector);
    };

    html(html) {
        return this.$el.html(html);
    };

    /* Function that need to be overwrite */
    initialize() {};
    addEvents() {};
    removeEvents() {};
    terminate() {};
    render() {};

    toString() {
        return this.name;
    };
}