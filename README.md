manageMe
=======

IMPORTANT NOTE: This repository has been archived and migrated to Bitbucket.

Version - 3.1.0
- Add function afterAllViewInitialize to have the possibility to trigger events after all view instances are created.

Version - 3.0.1
- Fix merging default value with data passed as params
- Cleaning useless function in the viewManager

Version - 3.0.0
- Replaced dots by dashes into source filenames
- Added build task to transpile sources files into dist/ folder
- Updated demo

Version - 2.0.1
- Refactor for ES6
- Split View manager and Base view into two distinct class
- Add new demo

Dependencies

- Babel Polyfill (https://babeljs.io/docs/en/babel-polyfill#usage-in-browser)
- jQuery (https://jquery.com/)

## How to implement

First, you'll need to link Babel Polyfill, jQuery and manageMe in your project 
```html
<script type="text/javascript" src="/path/to/directory/polyfill.js"></script>
<script type="text/javascript" src="/path/to/directory/jquery.js"></script>
<script src="/path/to/directory/me-manage.min.js"></script>
```

Then you're already good to go and create your first view!


### Create your first view
To create a view, you'll need to add in a script tag or in a JS file the following code:


```javascript
class ClassName extends ViewBasic {
	constructor(options) {
	    super(options);
	};
	
	initialize(){
            this.addEvents();
        };
	
	addEvents(){
	
	};
	
	removeEvents(){
	    
	};
	
	terminate(){
	    this.removeEvents();
	};
}

Me.views['ClassName'] = ClassName;
```

You'll need to replace 'ClassName' by the name you want and that represent what the class refers to.

The last line is very important. Do not forget to copy paste it!

After adding the Javascript part, you'll need to add some HTML to tell your view on what it need to 
be applied on.

You need to add an attribute on the element you need the view to be applied on. That attribute is 
**me:view** and you need to assign a string to that attribute. That string must be the class name 
you set in the Javascript part.

```html
<div id="demo" me:view="DemoView"></div>
```

Then when the page will be loaded, the View manager will take care of everything. It will create 
your **DemoView** and **initialize()** will be call. You can add a console.log() to confirm that 
it enters the **initialize** method.

### Pass data to your view

If you need data provided by the Backend in your Javascript view, you can add a simple attribute. 
On the same element where the **me:view** is set, you can add the attribute **me:view:data**.

PHP
```php 
//$data is an object
<div id="demo" me:view="DemoView" me:view:data="<?php echo json_encode($data, JSON_HEX_APOS); ?>"></div>
```

TWIG
```twig
//data is an object
<div id="demo" me:view="DemoView" me:view:data="{{ data|json_encode(constant('JSON_HEX_APOS')) }}"></div>
```

Once added, you'll be able to retrieve this data in your Javascript view. Simply use **this.params.data**.

```javascript
//Add a console.log in the initialize function of your view

initialize(){
    console.log(this.params.data);
};
```


## View Manager functions

### Initialize new view
In case you need to add DOM and that DOM has a view in it, you'll need to call a function to create and 
initialize all of the new views added to the DOM. Right after you append new DOM, simply call the function **initViews()** of Me.manage.


initViews accept one parameter. This parameter define where the manager will search for new views in the DOM.
The parameter **must** be an **element**.

```javascript
Me.manage.initViews();
// or
Me.manage.initViews($('.container'));
```

### Clear deleted views

When deleting DOM that contains one or multiple views, you should clear them.
Simply call the **clearViews** function and the View Manager will take care of the rest. 
Just don't forget to remove all events in the **removeEvents** function of every view.


```javascript
Me.manage.clearViews();
```

In every view that will be deleted we make sure that all events are removed.
```javascript
removeEvents(){
    this.$('.btn').off('click');
};
```

## ViewBasic functions

### defaults()

This is the function where you set the default params for your class.

```javascript
defaults(){
    return {};
};
```

### initialize()

This is the function that will be call be the View Manager once all views are created. You can declare options, variables, etc ...
Most of the time it will end with a call to the **addEvents** function.

```javascript
initialize(){
    //Add thing here before addEvents
	
    this.addEvents();
};
```

### afterAllViewInitialize()

This function will be triggered once all views are created. If you're looking to trigger an event when the view is loaded, you should trigger the event in this function. That way you'll be sure that all class will exist.
```javascript
afterAllViewInitialize(){
  //Example
  Me.dispatch.emit('event-name', this, {});
};
```

### addEvents()
This is where you set most of your listener. 

```javascript
addEvents(){
    this.$('.btn').on('click', function ()=>{});
};
```

How to use

```javascript
this.addEvents();
```

### removeEvents()
This is where you remove your listeners. This function will be call by terminate once the view is deleted.

```javascript
removeEvents(){
    this.$('.btn').off('click');
};
```

How to use

```javascript
this.removeEvents();
```

### terminate()
Usualy, you do not have to modify this function. It is called when you delete a view and then it will call **removeEvents** function

```javascript
terminate(){
    this.removeEvents();
};
```

How to use

```javascript
this.terminate();
```

### $(selector)
This function serve as helper to target element in the scope of your current view.
This function accept a single parameter. It must be a string selector and returns a jQuery object.

```javascript
$(selector) {
    return this.$el.find(selector);
};
```

How to use

```javascript
this.$('.container');
```
