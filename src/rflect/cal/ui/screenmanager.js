/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Class that standardizes panes switching.
 */

goog.provide('rflect.cal.ui.ScreenManager');
goog.provide('rflect.cal.ui.ScreenManager.EventTypes');
goog.provide('rflect.cal.ui.ScreenManager.PageChangeEvent');
goog.provide('rflect.cal.ui.ScreenManager.BeforePageChangeEvent');
goog.provide('rflect.cal.ui.ScreenManager.PageRequestEvent');


goog.require('goog.array');
goog.require('goog.ui.Component');
goog.require('goog.events');
goog.require('goog.events.Event');
goog.require('goog.events.EventType');
goog.require('goog.string');
goog.require('goog.style');
goog.require('rflect.browser.transitionend');



/**
 * Pane show/hide behaviour main class.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {goog.ui.Component}
 */
rflect.cal.ui.ScreenManager = function(opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);

  /**
   * Stack of pages. Empty stack means that default page is shown.
   * @type {Array.<goog.ui.Component>}
   */
  this.pageStack_ = [];
  
  /**
   * Components that are queued to be hidden after page slide.
   * @type {Array<goog.ui.Component>}
   * @private
   */
  this.componentsToHide_ = [];
}
goog.inherits(rflect.cal.ui.ScreenManager, goog.ui.Component);


/**
 * @enum {string}
 */
rflect.cal.ui.ScreenManager.EventTypes = {
  PAGE_CHANGE: 'pageChange',
  BEFORE_PAGE_CHANGE: 'beforePageChange',
  PAGE_REQUEST: 'pageRequest'
};


/**
 * Event that is fired at the end of page change.
 * @param {number} aPageNumber Number of current page.
 * @param {goog.ui.Component} aCurrentScreen Current screen component.
 * @param {Array<goog.ui.Component>} aPreviousScreens Previous screen
 * components.
 * @param {boolean} aActionIsIrreversible Whether this action is irreversible.
 * @constructor
 * @extends {goog.events.Event}
 */
rflect.cal.ui.ScreenManager.PageChangeEvent = function(aPageNumber,
    aCurrentScreen, aPreviousScreens, aActionIsIrreversible) {
  goog.events.Event.call(this,
      rflect.cal.ui.ScreenManager.EventTypes.PAGE_CHANGE);

  /**
   * Whether this is start of transition.
   * @type {number}
   */
  this.pageNumber = aPageNumber;

  /**
   * Current screen component.
   * @type {goog.ui.Component}
   */
  this.currentScreen = aCurrentScreen;

  /**
   * Previous screen component.
   * @type {Array<goog.ui.Component>}
   */
  this.previousScreens = aPreviousScreens;

  /**
   * Whether this action is irreversible.
   * @type {boolean}
   */
  this.aActionIsIrreversible = aActionIsIrreversible;

}
goog.inherits(rflect.cal.ui.ScreenManager.PageChangeEvent, goog.events.Event);


/**
 * Event that is fired at the start of page change.
 * @param {number} aPageNumber Number of current page.
 * @param {goog.ui.Component} aCurrentScreen Current screen component.
 * @param {Array<goog.ui.Component>} aPreviousScreens Previous screen
 * components.
 * @constructor
 * @extends {goog.events.Event}
 */
rflect.cal.ui.ScreenManager.BeforePageChangeEvent = function(aPageNumber,
    aCurrentScreen, aPreviousScreens) {
  goog.events.Event.call(this,
      rflect.cal.ui.ScreenManager.EventTypes.BEFORE_PAGE_CHANGE);

  /**
   * Whether this is start of transition.
   * @type {number}
   */
  this.pageNumber = aPageNumber;

  /**
   * Current screen component.
   * @type {goog.ui.Component}
   */
  this.currentScreen = aCurrentScreen;

  /**
   * Previous screen component.
   * @type {Array<goog.ui.Component>}
   */
  this.previousScreens = aPreviousScreens;
}
goog.inherits(rflect.cal.ui.ScreenManager.BeforePageChangeEvent,
    goog.events.Event);


/**
 * Event that is fired to let know {@link rflect.cal.ui.ScreenManager} know that page
 * should be turned visible/invisible.
 * @param {goog.ui.Component} aComponent Component to show.
 * @param {boolean} aShow Whether to show component.
 * @extends {goog.events.Event}
 * @constructor
 */
rflect.cal.ui.ScreenManager.PageRequestEvent = function(aComponent, aShow) {
  goog.events.Event.call(this, rflect.cal.ui.ScreenManager.EventTypes.PAGE_REQUEST);

  /**
   * Component associated with page.
   * @type {goog.ui.Component}
   */
  this.component = aComponent;

  /**
   * Whether show this page.
   * @type {boolean}
   */
  this.show = aShow;
}
goog.inherits(rflect.cal.ui.ScreenManager.PageRequestEvent,
    goog.events.Event);


/**
 * Template for translate style both for page element and container element.
 * @type {string}
 * @const
 */
rflect.cal.ui.ScreenManager.TRANSLATE_TEMPLATE =
    'translate3d(%s%,0,0)';


/**
 * Translates container element to show actual page.
 * @param {Element} aElement Element which style to modify.
 * @param {number} aValue Translate value to set.
 */
rflect.cal.ui.ScreenManager.translateElement = function(aElement,
    aValue){
  var style = aElement.style;
  if ('transform' in style){
    style.transform = goog.string.subs(
        rflect.cal.ui.ScreenManager.TRANSLATE_TEMPLATE, aValue);
  } else if ('webkitTransform' in style) {
    style.webkitTransform = goog.string.subs(
        rflect.cal.ui.ScreenManager.TRANSLATE_TEMPLATE, aValue);
  }
}


/**
 * Whether sliding is enabled.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.ScreenManager.prototype.slidingIsEnabled_ = false;


/**
 * Key for transition end listener.
 * @type {goog.events.Key}
 * @private
 */
rflect.cal.ui.ScreenManager.prototype.transitionEndKey_;


/**
 * Whether pending action of changing screens is irreversible.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.ScreenManager.prototype.actionIsIrreversible_ = false;


/**
 * Whether the page is in stack.
 * @return {boolean}
 */
rflect.cal.ui.ScreenManager.prototype.pageIsInStack = function(aComponent){
  return goog.array.findIndex(this.pageStack_, function(element){
    return element == aComponent;
  }) > 0;
}


/**
 * Whether the page is visible.
 * @return {boolean}
 */
rflect.cal.ui.ScreenManager.prototype.isVisible = function(aComponent){
  return /**@type {goog.ui.Component}*/ (goog.array.peek(this.pageStack_)) ==
      aComponent;
}


/**
 * @param {goog.ui.Component} aComponent Component to add.
 * @return {number} New length of stack.
 */
rflect.cal.ui.ScreenManager.prototype.pushToStack = function(aComponent){
  return this.pageStack_.push(aComponent);
}


/**
 * @return {goog.ui.Component} Component that was removed.
 */
rflect.cal.ui.ScreenManager.prototype.popFromStack = function(){
  return this.pageStack_.pop();
}


/**
 * Clears stack.
 */
rflect.cal.ui.ScreenManager.prototype.hideAll = function(){
  this.forEachChild((screen, index) => {
    if (index > 0 && screen.isInDocument()) {
      goog.style.showElement(screen.getElement(), false);
    }
  });
  if (rflect.TOUCH_INTERFACE_ENABLED) {
    this.slideToPosition(1);
  }
  this.pageStack_.length = 1;
  this.componentsToHide_.length = 0;
}


/**
 * @return {string} Unique id.
 * @override
 */
rflect.cal.ui.ScreenManager.prototype.getId = function() {
  return 'screen-manager' + rflect.cal.ui.ScreenManager.superClass_.getId.call(
          this);
}


/**
 * @override
 */
rflect.cal.ui.ScreenManager.prototype.createDom = function() {
  var element = document.createElement('div');
  element.id = this.getId();
  element.className = 'screen-manager-base';

  this.setElementInternal(element);
}


/**
 * @override
 */
rflect.cal.ui.ScreenManager.prototype.decorateInternal = function(aElement) {
  this.setElementInternal(aElement);

  this.getElement().id = this.getId();
  this.getElement().className = 'screen-manager-base';
}


/**
 * Shows page with given component.
 * @param {goog.ui.Component} aComponent Component to show.
 * @param {boolean} aShow Whether to show component.
 * @param {boolean=} opt_irreversible Whether action of switching screen could
 * not be reverted, this is intended to be used by history manager when
 * switching screen by back button - this action could not be undone, or it
 * will incur looping between screens.
 */
rflect.cal.ui.ScreenManager.prototype.showScreen = function(aComponent, aShow,
    opt_irreversible){
  if (goog.DEBUG)
        console.log('screenmanager: ', this.getElement());

  if (goog.DEBUG)
        console.log(`showScreen(${aShow}): `, aComponent.getElement(), ` or ${aComponent.getId()}`);

  if (goog.DEBUG)
        console.log('this.pageStack_: ', this.pageStack_);

  if (goog.DEBUG)
        console.log(`this.pageIsInStack(aComponent): `, this.pageIsInStack(aComponent));


  if (aShow == this.pageIsInStack(aComponent)) {
    return;
  }

  this.actionIsIrreversible_ = !!opt_irreversible;

  if (aShow){
    this.componentsToHide_.length && this.componentsToHide_.push(
        /**@type {goog.ui.Component}*/ (goog.array.peek(this.pageStack_)));

    var position = this.pushToStack(aComponent) - 1;

    // If the pane hasn't been rendered yet, render it now.
    if (!aComponent.isInDocument()) {
      aComponent.render(this.getElement());
    } else {
      goog.style.showElement(aComponent.getElement(), true);
    }
    if (rflect.TOUCH_INTERFACE_ENABLED)
      this.assignPosition(aComponent, position);
  } else {
    this.componentsToHide_.push(this.popFromStack());
    position = this.pageStack_.length - 1;

    goog.style.showElement(/**@type {goog.ui.Component}*/
        (goog.array.peek(this.pageStack_)).getElement(), true);
  }

  if (rflect.TOUCH_INTERFACE_ENABLED)
    this.slideToPosition(position);
  else
    this.changeScreen();
};


/**
 * Translates element wherever far is needed for paging.
 * @param {goog.ui.Component} aComponent Component to show.
 * @param {number} aPosition Page number to shift to.
 */
rflect.cal.ui.ScreenManager.prototype.assignPosition = function(aComponent,
    aPosition){
  //Element shows up from the right, so translate it to the right.
  if (aPosition > 0){
    rflect.cal.ui.ScreenManager.translateElement(aComponent.getElement(),
        100 * aPosition);
  }
}


/**
 * Change screen without sliding.
 */
rflect.cal.ui.ScreenManager.prototype.changeScreen = function() {
  this.dispatchBeforePageChangeEvent_();
  this.finishScreenChange_();
}


/**
 * Dispatches before page change event.
 * @private
 */
rflect.cal.ui.ScreenManager.prototype.dispatchBeforePageChangeEvent_ =
    function(){
  this.dispatchEvent(new rflect.cal.ui.ScreenManager.BeforePageChangeEvent(
      this.pageStack_.length - 1,
      /**@type {goog.ui.Component}*/ (goog.array.peek(this.pageStack_)),
      this.componentsToHide_));
}


/**
 * Applies transition to screen manager element.
 * @param {boolean} aEnable Whether to enable transition.
 */
rflect.cal.ui.ScreenManager.prototype.applyTransition = function(aEnable) {
  if (aEnable)
    goog.dom.classes.add(this.getElement(), 'screen-manager');
  else
    goog.dom.classes.remove(this.getElement(), 'screen-manager');
}


/**
 * Translates container element to show actual page.
 * @param {number} aPosition Page number to shift to.
 */
rflect.cal.ui.ScreenManager.prototype.slideToPosition = function(aPosition){
  this.dispatchBeforePageChangeEvent_();
  //Container moves to the left.
  this.applyTransition(true);
  rflect.cal.ui.ScreenManager.translateElement(this.getElement(),
      -100 * aPosition);
}


/**
 * @param {boolean} aSlidingIsEnabled Whether sliding is enabled.
 */
rflect.cal.ui.ScreenManager.prototype.setSlidingIsEnabled =
    function(aSlidingIsEnabled) {
  this.slidingIsEnabled_ = aSlidingIsEnabled;
}


/**
 * @override
 */
rflect.cal.ui.ScreenManager.prototype.enterDocument = function() {
  rflect.cal.ui.ScreenManager.superClass_.enterDocument.call(this);

  this.getHandler().listen(this,
      rflect.cal.ui.ScreenManager.EventTypes.PAGE_REQUEST,
      this.onPageRequest_, false, this);
  
  if (this.slidingIsEnabled_ && !this.transitionEndKey_){
    this.transitionEndKey_ = goog.events.listen(
        this.getElement(),
        rflect.browser.transitionend.VENDOR_TRANSITION_END_NAMES,
        this.onSlideEnd_, false, this);
  }
}


/**
 * Page request handler.
 * @param {rflect.cal.ui.ScreenManager.PageRequestEvent} aEvent Event object.
 * @private
 */
rflect.cal.ui.ScreenManager.prototype.onPageRequest_ = function(aEvent) {
  //Only process own children, not from the deep nested structures.
  if (this.indexOfChild(aEvent.component) >= 0) {
    this.showScreen(aEvent.component, aEvent.show);
  }
}


/**
 * Slide end listener.
 * @param {Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.ScreenManager.prototype.onSlideEnd_ = function(aEvent) {
  if (aEvent.target != this.getElement())
    return;

  this.applyTransition(false);
  this.finishScreenChange_();
}


/**
 * Hides old screen. Final phase.
 * @private
 */
rflect.cal.ui.ScreenManager.prototype.finishScreenChange_ = function() {
  var currentComponent = /**@type {goog.ui.Component}*/
      (goog.array.peek(this.pageStack_));

  this.pageStack_.forEach(component => {
    (component != currentComponent) &&
        goog.style.showElement(component.getElement(), false);
  })
  this.componentsToHide_.forEach(component => {
    (component != currentComponent) &&
        goog.style.showElement(component.getElement(), false);
  })

  this.dispatchEvent(new rflect.cal.ui.ScreenManager.PageChangeEvent(
      this.pageStack_.length - 1, currentComponent, this.componentsToHide_,
      this.actionIsIrreversible_));

  this.componentsToHide_.length = 0;
  this.actionIsIrreversible_ = false;
}


/**
 * Disposes of the object.
 * @override
 * @protected
 */
rflect.cal.ui.ScreenManager.prototype.disposeInternal = function() {
  rflect.cal.ui.ScreenManager.superClass_.disposeInternal.call(this);

  this.pageStack_.length = 0;
  this.componentsToHide_.length = 0;
  goog.events.unlistenByKey(this.transitionEndKey_);
};
