/*
 * ManageMe 1.0.5 (https://github.com/QuatreCentQuatre/manageMe/)
 * make view system usage easy
 *
 * Licence :
 *  - GLP v2
 *
 * Dependencies :
 *  - jQuery (http://jquery.com/)
 * 	- Underscore (http://underscorejs.org/)
 *
 */

class ViewManager {
    constructor(options) {
        if (!this.lookAtDependencies()) {return this;}

        this.name     = "ViewManager";
        this.version  = 1.00;
        this.defaults = {};
        this.views    = [];
        this.options;

        this.setOptions(options);
        return this;
    }

    lookAtDependencies() {
        var isOk = true;

        if (!$) {
            console.warn(this.name + " :: " + "required jquery (http://jquery.com/)");
            isOk = false;
        }

        if (!_) {
            console.warn(this.name + " :: " + "required underscore (http://underscorejs.org/)");
            isOk = false;
        }

        return isOk;
    }

    setOptions(options) {
        this.options = $.extend({}, this.defaults, options);
        return this;
    }

    getOptions() {
        return this.options;
    }

    initViews($root) {
        this.clearViews();

        if(typeof $root === 'undefined'){$root = $('html');}
        var $views = $root.find('[me\\:view]');

        for (let i = 0; i < $views.length; i++) {

            let $el = $($views[i]);
            if ($el.attr('me:view:render')) {continue;}
            $el.attr('me:view:render', "true");

            let viewName = $el.attr('me:view');
            if (typeof window[viewName] !== "function") {
                console.warn("You need to have view that exist.", viewName);
                continue;
            }

            let viewParams = {el:$el[0], name:viewName, options: {}};
            let viewDataString = $el.attr('me:view:data');
            let viewData;

            if (viewDataString) {
                // if is object in window
                if (window[viewDataString]) {
                    viewData = _.extend({}, window[viewDataString]);
                }
                // if is an object
                else if (viewDataString.indexOf(':') != -1) {
                    if (viewDataString.indexOf(',') != -1) {
                        viewData = viewDataString.replace(/ /g, '');
                        viewData = viewData.split(',');
                        viewData = this.parseParams(viewData, false);
                    } else {
                        viewData = this.parseParams(viewDataString, true);
                    }
                }
                // if is nested object in window
                else if (viewDataString.indexOf('.') != -1) {
                    var newData = this.findVariable(viewDataString);
                    if (newData) {viewData = _.extend({}, newData);}
                }
            }

            if (viewData) {viewParams.options = _.extend({}, viewData);}

            var view = new window[viewName](viewParams);
            this.views.push(view);
        }
    };

    clearViews() {
        var activeViews  = [];
        var deletedViews = [];
        for (var i in this.views) {
            var view = this.views[i];
            var selector = $('html').find(view.$el[0]);
            if (selector.length > 0) {
                activeViews.push(view);
            } else {
                view.terminate();
                deletedViews.push(view);
            }
        }

        this.views = activeViews;
    }

    parseParams(data, single) {
        let scope = this;
        var newData = {};
        if (!single) {
            $.each(data, function(index, item) {
                if (item == "") {return;}
                scope.parseParam(item, newData);
            });
        } else {
            scope.parseParam(data, newData);
        }
        return newData;
    }

    parseParam(param, data) {
        param = param.split(':');
        if (param[1].indexOf('@') != -1) {
            data[param[0]] = this.findVariable(param[1].replace('@', ''));
        } else if (param[1].indexOf('[') != -1) {
            data[param[0]] = [param[1].replace('[', '').replace(']', '')];
        } else {
            data[param[0]] = param[1];
        }
    }

    findVariable(variable) {
        let node = window;
        /* let node = window;
         variable = variable.split('.');
         _.each(variable, function(item, index) {
         if (node[item]) {node = node[item];}
         });*/
        return node;
    }

    toString() {
        return this.name;
    }

}

if (!Me) {}

if (!window['Me']) {var Me = {};}
Me.manage = new ViewManager();

$(document).ready(function() {
    Me.manage.initViews();
});
