/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Dialog for saving event.
 * @author alexeykofficial@gmail.com (Alex K.)
 * TODO(user):
 */

goog.provide('rflect.cal.ui.SaveDialog');

goog.require('goog.dom');
goog.require('rflect.cal.i18n.Symbols');
goog.require('rflect.ui.DialogMouseMissBehavior');
goog.require('rflect.cal.ui.CalendarsSelect');



/**
 * Class for save event dialog.
 * @param {string=} opt_class CSS class name for the dialog element, also used
 *     as a class name prefix for related elements; defaults to modal-dialog.
 * @param {boolean=} opt_useIframeMask Work around windowed controls z-index
 *     issue by using an iframe instead of a div for bg element.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link
 *     goog.ui.Component} for semantics.
 * @param {rflect.cal.events.EventManager=} opt_eventManager Link to event manager.
 * @constructor
 * @extends {rflect.ui.DialogMouseMissBehavior}
 */
rflect.cal.ui.SaveDialog = function (opt_class,
    opt_useIframeMask, opt_domHelper, opt_eventManager) {
  rflect.ui.DialogMouseMissBehavior.call(this, undefined, undefined, undefined);

  /**
   * Link to event manager.
   * @type {rflect.cal.events.EventManager}
   * @private
   */
  this.eventManager_ = /**@type {rflect.cal.events.EventManager}*/
      (opt_eventManager);

  this.setTitle('New event');
  this.setModal(false);
  this.setBackgroundElementOpacity(0);
  this.setButtonSet(rflect.ui.Dialog.ButtonSet.createSaveCancel());
  this.setContent(rflect.cal.ui.SaveDialog.HTML_PARTS_);
};
goog.inherits(rflect.cal.ui.SaveDialog, rflect.ui.DialogMouseMissBehavior);


/**
 * Input for event name.
 * @type {Element}
 * @private
 */
rflect.cal.ui.SaveDialog.prototype.input_;


/**
 * Calendars select.
 * @type {rflect.cal.ui.CalendarsSelect}
 * @private
 */
rflect.cal.ui.SaveDialog.prototype.select_;


/**
 * Content for dialog.
 * @type {string}
 * @const
 * @private
 */
rflect.cal.ui.SaveDialog.HTML_PARTS_ = [
  '<div class="event-name-input-cont event-pane-cont-first event-pane-cont">',
    '<input placeholder="Event name" class="ep-event-name-input" id="event-name" type="text">',
  '</div>',
  '<div class="event-pane-cont">',
    '<label class="label-fluid event-pane-label event-pane-calendars-label" for="dialog-event-calendars">Calendar</label>',
    '<div class="button dropdown settings-pane-select">',
      '<select id="dialog-event-calendars">',
      '</select>',
    '</div>',
  '</div>'
].join('');


/**
 * Focuses the dialog contents and the default dialog button if there is one.
 * @override
 */
rflect.cal.ui.SaveDialog.prototype.focus = function () {
  goog.ui.ModalPopup.prototype.focus.call(this);
  // Move focus to input field.
  if (this.input_) {
    this.input_.value = '';
    this.input_.focus();
  }
};


/**
 * @override
 */
rflect.cal.ui.SaveDialog.prototype.enterDocument = function () {
  var dom = this.getDomHelper();
  this.input_ = dom.getElement('event-name');

  var selectEl = dom.getElement('dialog-event-calendars');

  this.select_ = new rflect.cal.ui.CalendarsSelect(selectEl,
      this.eventManager_);

  rflect.cal.ui.SaveDialog.superClass_.enterDocument.call(this);
}


/**
 * @return {string} Event name from input value.
 */
rflect.cal.ui.SaveDialog.prototype.getEventName = function () {
  return this.input_.value;
}


/**
 * @return {string} Selected calendar id.
 */
rflect.cal.ui.SaveDialog.prototype.getCalendarId = function () {
  return this.select_.getCalendarId();
}


/**
 * Edit event.
 * @const {string}
 */
rflect.cal.ui.SaveDialog.EVENT_EDIT = 'editevent';


/**
 * @override
 */
rflect.cal.ui.SaveDialog.prototype.setVisible = function (aVisible) {
  rflect.cal.ui.SaveDialog.superClass_.setVisible.call(this, aVisible);
  // If dialog disappears, input still remains focused in Webkit and Opera,
  // which could produce weird behavior. More specifically, holding Enter
  // produces many events with the same id.
  if (!aVisible)
    this.input_ && this.input_.blur();
  else
    this.select_.update();
}


/**
 * Dispose method.
 * @override
 */
rflect.cal.ui.SaveDialog.prototype.disposeInternal = function () {
  this.input_ = null;
  this.select_ && this.select_.dispose();
  rflect.cal.ui.SaveDialog.superClass_.disposeInternal.call(this);

}