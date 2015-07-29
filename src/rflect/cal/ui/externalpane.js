/*
 * Copyright (c) 2014. Rflect, Alex K.
 */

/**
 * @fileoverview External pane - prototype of all panes.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.ExternalPane');

goog.require('goog.array');
goog.require('goog.dom.classes');
goog.require('goog.ui.Button');
goog.require('rflect.ui.Component');
goog.require('goog.ui.FlatButtonRenderer');
goog.require('rflect.cal.i18n.Symbols');
goog.require('rflect.cal.ui.common');
goog.require('rflect.cal.ui.PaneShowBehavior');



/**
 * External pane main class.
 * TODO(alexk): Currently only creation through render is supported. Add decorate.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @param {Element} aParentElement Element in which pane will be rendered.
 * @param {rflect.cal.Transport} aTransport Link to transport.
 * @constructor
 * @extends {rflect.ui.Component}
 */
rflect.cal.ui.ExternalPane = function(aViewManager, aTimeManager, aEventManager,
    aParentElement, aTransport) {
  rflect.ui.Component.call(this);

  /**
   * Link to view manager.
   * @type {rflect.cal.ViewManager}
   * @protected
   */
  this.viewManager = aViewManager;

  /**
   * Link to time manager.
   * @type {rflect.cal.TimeManager}
   * @protected
   */
  this.timeManager = aTimeManager;

  /**
   * Link to event manager.
   * @type {rflect.cal.events.EventManager}
   * @protected
   */
  this.eventManager = aEventManager;

  /**
   * Link to transport.
   * @type {rflect.cal.Transport}
   * @protected
   */
  this.transport = aTransport;

  this.addChild(this.buttonBack1 = new goog.ui.Button(null,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonPrimary1 = new goog.ui.Button(null,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonBack2 = new goog.ui.Button(null,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonPrimary2 = new goog.ui.Button(null,
      goog.ui.FlatButtonRenderer.getInstance()));

  if (this.isButtonDeleteEnabled()) {
    this.addChild(this.buttonDelete = new goog.ui.Button(null,
        goog.ui.FlatButtonRenderer.getInstance()));
  }
};
goog.inherits(rflect.cal.ui.ExternalPane, rflect.ui.Component);


/**
 * @return {string}
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.getBackButtonLabel = function() {
  return rflect.cal.i18n.Symbols.BACK;
};


/**
 * @return {boolean}
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.isButtonDeleteEnabled = function() {
  return true;
};


/**
 * @type {goog.ui.Button}
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.buttonBack1;


/**
 * @type {goog.ui.Button}
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.buttonBack2;


/**
 * @type {goog.ui.Button}
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.buttonPrimary1;


/**
 * @type {goog.ui.Button}
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.buttonPrimary2;


/**
 * @type {goog.ui.Button}
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.buttonDelete;


/**
 * @param {boolean} aShowButtonDelete Whether to show button delete.
 * @param {boolean} aShowButtonNew Whether to show button new.
 * @param {boolean} aShowButtonSave Whether to show button save.
 * @param {boolean} aUpper Whether pane is upper.
 * @return {string} HTML of upper or lower control pane.
 * @private
 */
rflect.cal.ui.ExternalPane.prototype.buildControlPane = function(
    aShowButtonDelete, aShowButtonNew, aShowButtonSave, aUpper) {
  return rflect.cal.ui.soy.externalpane.controlPane({
    backButtonLabel: this.getBackButtonLabel(),
    showButtonDelete: this.isButtonDeleteEnabled() && aShowButtonDelete,
    showButtonNew: aShowButtonNew,
    showButtonSave: aShowButtonSave,
    upper: aUpper
  });
}


/**
 * @override
 */
rflect.cal.ui.ExternalPane.prototype.enterDocument = function() {

  var [controlPane1, controlPane2] = this.getElement().querySelectorAll(
      '.control-pane-external');

  this.buttonBack1.decorate(controlPane1.querySelector(
      '.pane-left > .goog-flat-button'));
  this.buttonPrimary1.decorate(controlPane1.querySelector(
      '.pane-right > .goog-flat-button'));
  this.buttonBack2.decorate(controlPane2.querySelector(
      '.pane-left > .goog-flat-button'));
  this.buttonPrimary2.decorate(controlPane2.querySelector(
      '.pane-right > .goog-flat-button'));
  if (this.isButtonDeleteEnabled()) {
    this.buttonDelete.decorate(controlPane2.querySelector(
        '.pane-center > .goog-flat-button'));
  }

  rflect.cal.ui.ExternalPane.superClass_.enterDocument.call(this);
}


/**
 * Disposes of the event pane.
 * @override
 * @protected
 */
rflect.cal.ui.ExternalPane.prototype.disposeInternal = function() {
  rflect.cal.ui.ExternalPane.superClass_.disposeInternal.call(this);
};


