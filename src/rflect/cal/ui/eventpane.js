/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Event edit pane, where new event is created or existing is
 * edited.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.EventPane');
goog.provide('rflect.cal.ui.EventPane.EventTypes');

goog.require('goog.dom.classes');
goog.require('goog.events.Event');
goog.require('goog.events.EventType');
goog.require('goog.events.KeyCodes');
goog.require('goog.i18n.DateTimeParse');
goog.require('goog.i18n.DateTimeSymbols');
goog.require('goog.style');
goog.require('goog.ui.ac');
goog.require('goog.ui.Button');
goog.require('rflect.ui.Checkbox');
goog.require('goog.ui.Component');
goog.require('goog.ui.FlatButtonRenderer');
goog.require('rflect.cal.i18n.Symbols');
goog.require('rflect.cal.ui.ac');
goog.require('rflect.cal.ui.CalendarsSelect');
goog.require('rflect.cal.ui.common');
goog.require('rflect.cal.i18n.Symbols');
goog.require('rflect.cal.ui.InputDatePicker');
goog.require('rflect.cal.ui.PaneShowBehavior');
goog.require('rflect.cal.ui.PaneShowBehavior.EventTypes');
goog.require('rflect.date.util');
goog.require('rflect.dom');
goog.require('rflect.ui.Checkbox');
goog.require('rflect.cal.i18n.Symbols');


/**
 * Event pane main class.
 * TODO(alexk): Currently only creation through render is supported. Add decorate.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @param {Element} aParentElement Element in which pane will be rendered.
 * @param {rflect.cal.Transport} aTransport Link to transport.
 * @constructor
 * @extends {goog.ui.Component}
 */
rflect.cal.ui.EventPane = function(aViewManager, aTimeManager, aEventManager,
    aParentElement, aTransport) {
  goog.ui.Component.call(this);

  /**
   * Link to view manager.
   * @type {rflect.cal.ViewManager}
   * @private
   */
  this.viewManager_ = aViewManager;

  /**
   * Link to time manager.
   * @type {rflect.cal.TimeManager}
   * @private
   */
  this.timeManager_ = aTimeManager;

  /**
   * Link to event manager.
   * @type {rflect.cal.events.EventManager}
   * @private
   */
  this.eventManager_ = aEventManager;

  /**
   * Link to transport.
   * @type {rflect.cal.Transport}
   * @private
   */
  this.transport_ = aTransport;

  this.parentEl_ = aParentElement;

  this.addChild(this.buttonCancel1_ = new goog.ui.Button(
      rflect.cal.i18n.Symbols.CANCEL,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonSave1_ = new goog.ui.Button(
      rflect.cal.i18n.Symbols.SAVE,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonDelete_ = new goog.ui.Button(
      rflect.cal.i18n.Symbols.DELETE,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.checkboxAllDay_ = new rflect.ui.Checkbox());
  this.addChild(this.buttonCancel2_ = new goog.ui.Button(
      rflect.cal.i18n.Symbols.CANCEL,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonBack_ = new goog.ui.Button(null,
      goog.ui.FlatButtonRenderer.getInstance()));
  this.addChild(this.buttonSave2_ = new goog.ui.Button(
      rflect.cal.i18n.Symbols.SAVE,
      goog.ui.FlatButtonRenderer.getInstance()));

  /**
   * @type {rflect.cal.ui.InputDatePicker}
   * @private
   */
  this.inputDatePicker_ = new rflect.cal.ui.InputDatePicker(this.viewManager_,
      rflect.cal.ui.EventPane.getDateFormatString());

  /**
   * Pane show behavior.
   * @type {rflect.cal.ui.PaneShowBehavior}
   */
  this.showBehavior = new rflect.cal.ui.PaneShowBehavior(this,
      this.getDomHelper().getElement('main-container'));

};
goog.inherits(rflect.cal.ui.EventPane, goog.ui.Component);


/**
 * @enum {string}
 */
rflect.cal.ui.EventPane.EventTypes = {
  CANCEL: 'cancel',
  SAVE: 'save',
  DELETE: 'delete'
};


/**
 * Displays dates in form.
 * @return {string} Date format with 4 digit year.
 */
rflect.cal.ui.EventPane.getDateFormatString = function() {
  return goog.i18n.DateTimeSymbols.DATEFORMATS[3].replace(/y+/, 'yyyy');
}


/**
 * Marks input as invalid or removes that mark.
 * @param {boolean} aValid Whether input is valid.
 * @param {Element} aInputEl Input element.
 */
rflect.cal.ui.EventPane.markInput = function(aValid, aInputEl) {
  if (!aValid)
    goog.dom.classes.add(aInputEl, goog.getCssName('input-invalid'));
  else
    goog.dom.classes.remove(aInputEl, goog.getCssName('input-invalid'));
}


/**
 * Whether the component is visible.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.EventPane.prototype.visible_ = false;


/**
 * Whether event pane is in state when we're creating new event.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.EventPane.prototype.newEventMode_ = false;


/**
 * Element in which event pane will be rendered.
 * @type {Element}
 * @private
 */
rflect.cal.ui.EventPane.prototype.parentEl_;


/**
 * Start time ac.
 * @type {rflect.cal.ui.ac.TimeAutoComplete}
 * @private
 */
rflect.cal.ui.EventPane.prototype.startTimeAC_;


/**
 * End time ac.
 * @type {rflect.cal.ui.ac.TimeAutoComplete}
 * @private
 */
rflect.cal.ui.EventPane.prototype.endTimeAC_;


/**
 * Calendars select.
 * @type {rflect.cal.ui.CalendarsSelect}
 * @private
 */
rflect.cal.ui.EventPane.prototype.selectCalendars_;


/**
 * @return {boolean} Whether the component is visible.
 */
rflect.cal.ui.EventPane.prototype.isVisible = function() {
  return this.visible_;
};


/**
 * @override
 */
rflect.cal.ui.EventPane.prototype.createDom = function() {
  var dom = this.getDomHelper();

  /**@const*/
  var labelClassName = goog.getCssName('label-fluid') + ' ' +
      goog.getCssName('event-edit-pane-label');

  this.forEachChild(function(child){
    child.createDom();
    if (child instanceof goog.ui.Button)
      goog.dom.classes.add(child.getElement(),
          goog.getCssName('cal-menu-button'));
  });

  rflect.cal.ui.common.setBackButtonContent(this.buttonBack_);
  rflect.cal.ui.common.setDeleteButtonContent(this.buttonDelete_);
  goog.dom.classes.add(this.buttonBack_.getElement(),
      'cal-menu-button-simple');

  goog.dom.classes.add(this.buttonSave1_.getElement(),
      goog.getCssName('emphasis-button'));
  goog.dom.classes.add(this.buttonSave2_.getElement(),
      goog.getCssName('emphasis-button'));
  goog.dom.classes.add(this.buttonDelete_.getElement(),
      goog.getCssName('event-edit-pane-button-delete'));

  if (rflect.MOBILE) {

    var paneLeft1 = dom.createDom('div', 'pane-left');
    var paneRight1 = dom.createDom('div', 'pane-right');
    var paneCenter2 = dom.createDom('div', 'pane-center');
    var paneRight2 = dom.createDom('div', 'pane-right');

    paneLeft1.appendChild(this.buttonBack_.getElement());
    paneRight1.appendChild(this.buttonSave1_.getElement());
    paneRight1.appendChild(this.buttonCancel1_.getElement());

    var buttonsCont1 = dom.createDom('div', 'control-pane', paneRight1,
        paneLeft1);

    paneCenter2.appendChild(this.buttonDelete_.getElement());
    paneRight2.appendChild(this.buttonSave2_.getElement());
    paneRight2.appendChild(this.buttonCancel2_.getElement());

    var buttonsCont2 = dom.createDom('div', 'control-pane', paneRight2,
        paneCenter2);

  } else {
    var buttonsCont1 = dom.createDom('div',
        [goog.getCssName('settings-pane-buttons'),
        goog.getCssName('event-pane-buttons-upper'),
        goog.getCssName('goog-inline-block')],
        this.buttonBack_.getElement(),
        this.buttonSave1_.getElement(),
        this.buttonCancel1_.getElement(),
        this.buttonDelete_.getElement());
    var buttonsCont2 = dom.createDom('div',
        [goog.getCssName('settings-pane-buttons'),
         goog.getCssName('event-pane-buttons-lower')],
        this.buttonSave2_.getElement(),
        this.buttonCancel2_.getElement());
  }

  var labelName = dom.createDom('label', {
    'for': 'ep-event-name-input',
    className: labelClassName
  }, 'Name');
  this.inputName_ = dom.createDom('input', {
    'type': 'text',
    id: 'ep-event-name-input',
    className: goog.getCssName('ep-event-name-input'),
    autofocus: 'autofocus',
    placeholder: rflect.cal.i18n.Symbols.NO_NAME_EVENT
  });
  var nameCont = dom.createDom('div',
    [goog.getCssName('event-name-input-cont'),
      goog.getCssName('event-edit-pane-cont-first'),
      goog.getCssName('event-edit-pane-cont')],
    labelName, rflect.dom.wrapControl(this.inputName_));

  var labelDate = dom.createDom('label', {
    'for': 'event-start-date',
    className: labelClassName
  }, 'Date');
  this.inputStartDate_ = dom.createDom('input', {
    'type': 'text',
    id: 'event-start-date',
    className: goog.getCssName('event-date-input')
  });
  this.inputStartTime_ = dom.createDom('input', {
    'type': 'text',
    id: 'event-start-time',
    className: goog.getCssName('event-time-input')
  });

  this.inputEndDate_ = dom.createDom('input', {
    'type': 'text',
    id: 'event-end-date',
    className: goog.getCssName('event-date-input')
  });
  this.inputEndTime_ = dom.createDom('input', {
    'type': 'text',
    id: 'event-end-time',
    className: goog.getCssName('event-time-input')
  });

  var startDateSubCont = dom.createDom('div', ['date-sub-cont',
      'goog-inline-block'], this.inputStartDate_, this.inputStartTime_);
  var endDateSubCont = dom.createDom('div', ['date-sub-cont',
      'goog-inline-block'], this.inputEndDate_, this.inputEndTime_);

  /*var dateInputCont = dom.createDom('div',
      [goog.getCssName('start-input-cont'),
        goog.getCssName('event-edit-pane-cont-inner')],
      labelDate, controlWrapperMultiple);*/
      
  var controlWrapperMultiple = dom.createDom('div', 'control-wrapper-multiple', 
      startDateSubCont, ' - ', endDateSubCont);

  var dateCont = dom.createDom('div',
    [goog.getCssName('date-input-cont'),
      goog.getCssName('event-edit-pane-cont')],
    labelDate, controlWrapperMultiple);

  var labelAllDay = dom.createDom('label', {
    'for': 'event-all-day',
    className: 'goog-inline-block event-edit-pane-label all-day-label'
  }, 'All-day event');
  var allDaySubCont = dom.createDom('span', null, labelAllDay,
      this.checkboxAllDay_.getElement());
  this.checkboxAllDay_.setLabel(allDaySubCont);
  var allDayCont = dom.createDom('div', {
    id: 'all-day-label',
    className: goog.getCssName('description-cont') + ' ' +
      goog.getCssName('event-edit-pane-cont')
    }, allDaySubCont);

  // Calendars select.
  var labelCalendars = dom.createDom('label', {
    'for': 'event-calendars',
    className: labelClassName
  }, 'Calendar');
  var selectCalendarsEl = dom.createDom('select', {
      id: 'event-calendars',
      className: goog.getCssName('event-cal-select') + ' ' +
          goog.getCssName('event-edit-pane-cal-select')
    });
  this.selectCalendars_ = new rflect.cal.ui.CalendarsSelect(selectCalendarsEl,
      this.eventManager_);
  var calendarsCont = dom.createDom('div', {
    id: 'all-day-label',
    className: goog.getCssName('event-edit-pane-cont')
    }, labelCalendars, rflect.dom.wrapControl(selectCalendarsEl));

  var labelDesc = dom.createDom('label', {
    'for': 'event-description',
    className: labelClassName + ' ' +
      goog.getCssName('event-description-label')
  }, 'Description');
  this.textAreaDesc_ = dom.createDom('textarea', {
    id: 'event-description',
      className: goog.getCssName('event-description')
  });
  var descCont = dom.createDom('div', [
    goog.getCssName('description-cont'),
      goog.getCssName('event-edit-pane-cont')],
    labelDesc, rflect.dom.wrapControl(this.textAreaDesc_));

  var body = dom.createDom('div', goog.getCssName('settings-body'),
      nameCont, allDayCont, dateCont, calendarsCont, descCont);

  var root = dom.createDom('div', {
    className: goog.getCssName('settings-pane') + (rflect.MOBILE ?
        ' slide-pane-left' : ''),
    id: 'event-edit-pane'
    }, buttonsCont1, body, buttonsCont2);

  this.setElementInternal(root);

  var timeLabels = rflect.date.util.getTimeLabels();
  this.startTimeAC_ = rflect.cal.ui.ac.createTimeAutoComplete(
      timeLabels, this.inputStartTime_, false);

  this.endTimeAC_ = rflect.cal.ui.ac.createTimeAutoComplete(
      timeLabels, this.inputEndTime_, false);

  //Adding custom class name to renderer.
  this.startTimeAC_.getRenderer().className += ' ' +
      goog.getCssName('ac-renderer-time');
  this.endTimeAC_.getRenderer().className += ' ' +
      goog.getCssName('ac-renderer-time');
}


/**
 * @override
 */
rflect.cal.ui.EventPane.prototype.enterDocument = function() {
  rflect.cal.ui.EventPane.superClass_.enterDocument.call(this);

  // Menu commands.
  this.getHandler().listen(this.buttonCancel1_,
      goog.ui.Component.EventType.ACTION, this.onCancel_, false, this)
      .listen(this.buttonCancel2_, goog.ui.Component.EventType.ACTION,
      this.onCancel_, false, this)
      .listen(this.buttonBack_, goog.ui.Component.EventType.ACTION,
      this.onCancel_, false, this)
      .listen(this.buttonSave1_,
      goog.ui.Component.EventType.ACTION, this.onSave_, false, this)
      .listen(this.buttonSave2_, goog.ui.Component.EventType.ACTION,
      this.onSave_, false, this)
      .listen(this.buttonDelete_,
      goog.ui.Component.EventType.ACTION, this.onDelete_, false, this)
      .listen(this.checkboxAllDay_,
      goog.ui.Component.EventType.CHANGE, this.onCheck_, false, this)

      .listen(this.inputStartDate_,
      goog.events.EventType.FOCUS, this.onInputFocus_, false, this)
      .listen(this.inputStartTime_,
      goog.events.EventType.FOCUS, this.onInputFocus_, false, this)
      .listen(this.inputEndDate_,
      goog.events.EventType.FOCUS, this.onInputFocus_, false, this)
      .listen(this.inputEndTime_,
      goog.events.EventType.FOCUS, this.onInputFocus_, false, this)

      .listen(this.inputStartTime_, goog.events.EventType.MOUSEDOWN,
          this.onTimeInputMouseDown_, false, this)
      .listen(this.inputEndTime_, goog.events.EventType.MOUSEDOWN,
          this.onTimeInputMouseDown_, false, this)

      .listen(document,
      goog.events.EventType.KEYDOWN, this.onKeyDown_, false, this);

  this.inputDatePicker_.addInput(this.inputStartDate_);
  this.inputDatePicker_.addInput(this.inputEndDate_);

  //Show/hide actions.
  this.getHandler().listen(this.showBehavior,
      rflect.cal.ui.PaneShowBehavior.EventTypes.BEFORE_SHOW, function(){
    this.displayValues();
  }, false, this);

  if (rflect.MOBILE) {
    var eventNameForInputFocus =
        rflect.cal.ui.PaneShowBehavior.EventTypes.SLIDE_BREAK_POINT;
  } else {
    var eventNameForInputFocus =
        rflect.cal.ui.PaneShowBehavior.EventTypes.AFTER_SHOW;
  }

  this.getHandler().listen(this.showBehavior, eventNameForInputFocus,
      this.onPaneReady_, false, this);
};


/**
 * @param {rflect.cal.ui.PaneShowBehavior.SlideBreakPointEvent} aEvent Event
 * object.
 */
rflect.cal.ui.EventPane.prototype.onPaneReady_ = function(aEvent) {
  // Do this only at the end of sliding-in pane.
  if (rflect.cal.ui.PaneShowBehavior.EventTypes.SLIDE_BREAK_POINT ==
      aEvent.type && !(!aEvent.start && aEvent.showing))
    return;

  /** @preserveTry */
  try {
    this.inputName_.focus();
    this.inputName_.select();
  } catch(e) {
    // IE8- shows error that it couldn't set focus but nevertheless, sets
    // it.
  }
}


/**
 * @param {boolean=} opt_creatingNewEvent Whether event pane is in new
 * event mode.
 */
rflect.cal.ui.EventPane.prototype.setNewEventMode = function(
    opt_creatingNewEvent) {
  this.newEventMode_ = opt_creatingNewEvent || false;
}


/**
 * Component key listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.EventPane.prototype.onKeyDown_ = function(aEvent) {
  if (this.visible_ && !this.startTimeAC_.getRenderer().isVisible() &&
      !this.endTimeAC_.getRenderer().isVisible()) {
    // ESC key.
    if (aEvent.keyCode == goog.events.KeyCodes.ESC) {

      aEvent.stopPropagation();
      this.onCancel_();

    // Ctrl + Enter saves form
    } else if (aEvent.keyCode == goog.events.KeyCodes.ENTER &&
        aEvent.platformModifierKey) {

      this.onSave_();

    }
  }
}


/**
 * Input focus listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.EventPane.prototype.onInputFocus_ = function(aEvent) {
  goog.dom.classes.remove(/**@type {Element}*/(aEvent.target),
      goog.getCssName('input-invalid'));

  var target = /**@type{Element}*/(aEvent.target);
  if (target == this.inputStartTime_) {
    this.updateAC_(this.startTimeAC_);
  } else if (target == this.inputEndTime_) {
    this.updateAC_(this.endTimeAC_);
  }  else {
    this.startTimeAC_.dismiss();
    this.endTimeAC_.dismiss();
  }
}


/**
 * Time input mousedown listener.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.EventPane.prototype.onTimeInputMouseDown_ = function(aEvent) {
  var target = /**@type{Element}*/(aEvent.target);
  if (target == this.inputStartTime_) {
    this.updateAC_(this.startTimeAC_);
  } else if (target == this.inputEndTime_) {
    this.updateAC_(this.endTimeAC_);
  }
}


/**
 * Updates ac for given input.
 * @param {rflect.cal.ui.ac.TimeAutoComplete} aAC Autocomplete.
 */
rflect.cal.ui.EventPane.prototype.updateAC_ = function(aAC) {
  if (goog.userAgent.IE) {
    if (goog.string.compareVersions(goog.userAgent.VERSION, '8') <= 0)
      setTimeout(goog.bind(function(){aAC.update(true)}, this), 0);
  } else
    aAC.update(true);
}


/**
 * Cancel action listener.
 * Default action is to hide pane.
 */
rflect.cal.ui.EventPane.prototype.onCancel_ = function() {
  if (this.dispatchEvent(new goog.events.Event(
      rflect.cal.ui.EventPane.EventTypes.CANCEL))) {
    this.showBehavior.setVisible(false);
  }
}


/**
 * Save action listener.
 */
rflect.cal.ui.EventPane.prototype.onSave_ = function() {
  if (this.scanValues()) {
    this.eventManager_.eventHolder.endWithEdit();
    this.transport_.saveEventAsync(
        this.eventManager_.eventHolder.getCurrentEvent());
    if (this.dispatchEvent(new goog.events.Event(
        rflect.cal.ui.EventPane.EventTypes.SAVE))) {
      this.showBehavior.setVisible(false);
    }
  }
}


/**
 * Delete action listener.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.ui.EventPane.prototype.onDelete_ = function(aEvent) {
  this.eventManager_.eventHolder.endWithDelete();

  this.transport_.deleteEventAsync(
      this.eventManager_.eventHolder.getBackUpEvent());

  if (this.dispatchEvent(new goog.events.Event(
      rflect.cal.ui.EventPane.EventTypes.DELETE))) {
    this.showBehavior.setVisible(false);
  }
}


/**
 * Checkbox action listener.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.ui.EventPane.prototype.onCheck_ = function(aEvent) {
  var eh = this.eventManager_.eventHolder;
  var checked;
  if (aEvent.target == this.checkboxAllDay_) {
    checked = this.checkboxAllDay_.isChecked();
    this.showTimeInputs_(!checked);
    eh.setAllDay(checked);

    this.displayDates_();
  }
}


/**
 * @param {boolean} aShow Whether to show time inputs.
 * @private
 */
rflect.cal.ui.EventPane.prototype.showTimeInputs_ = function(aShow) {
  goog.style.showElement(this.inputStartTime_, aShow);
  goog.style.showElement(this.inputEndTime_, aShow);
}


/**
 * Displays event properties in form.
 */
rflect.cal.ui.EventPane.prototype.displayValues = function() {
  var eh = this.eventManager_.eventHolder;

  this.buttonDelete_.setVisible(!this.newEventMode_);

  this.displayDates_();

  this.inputName_.value = eh.getSummary();

  this.textAreaDesc_.innerHTML = eh.getDescription();

  this.checkboxAllDay_.setChecked(eh.getAllDay());

  this.selectCalendars_.update();
  this.selectCalendars_.setCalendarId(eh.getCalendarId());

  this.showTimeInputs_(!eh.getAllDay());

};


/**
 * Displays dates in form.
 * @private
 */
rflect.cal.ui.EventPane.prototype.displayDates_ = function() {
  var eh = this.eventManager_.eventHolder;

  var startDate = eh.getStartDate();
  var endDate = eh.getEndDate();
  // We need human-adjusted end date for all-day events.
  // Our interval end dates are exclusive, and it's more natural for all-day
  // events to have inclusive end.
  var uiEndDate = endDate.clone();

  if (eh.getAllDay() && uiEndDate.getHours() == 0 &&
      uiEndDate.getMinutes() == 0)
    uiEndDate.add(new goog.date.Interval(goog.date.Interval.DAYS, -1));

  var formatStringDate = rflect.cal.ui.EventPane.getDateFormatString();
  var formatStringTime = goog.i18n.DateTimeSymbols.TIMEFORMATS[3];
  var formatDate = new goog.i18n.DateTimeFormat(formatStringDate);
  var formatTime = new goog.i18n.DateTimeFormat(formatStringTime);
  var startDateFormatted = formatDate.format(startDate);
  var startTimeFormatted = formatTime.format(startDate);
  var endDateFormatted = formatDate.format(uiEndDate);
  var endTimeFormatted = formatTime.format(uiEndDate);

  this.inputStartDate_.value = startDateFormatted;
  this.inputStartTime_.value = startTimeFormatted;
  this.inputEndDate_.value = endDateFormatted;
  this.inputEndTime_.value = endTimeFormatted;

  rflect.cal.ui.EventPane.markInput(true, this.inputStartDate_);
  rflect.cal.ui.EventPane.markInput(true, this.inputEndDate_);
  rflect.cal.ui.EventPane.markInput(true, this.inputStartTime_);
  rflect.cal.ui.EventPane.markInput(true, this.inputEndTime_);
}


/**
 * Scans values from form.
 * @return {boolean} Whether input is valid.
 */
rflect.cal.ui.EventPane.prototype.scanValues = function() {
  var valid = false;

  var eh = this.eventManager_.eventHolder;

  eh.setSummary(this.inputName_.value);

  eh.setDescription(this.textAreaDesc_.innerHTML);

  eh.setCalendarId(this.selectCalendars_.getCalendarId());

  var startDate = new goog.date.DateTime();
  var startTime = new goog.date.DateTime();
  var endDate = new goog.date.DateTime();
  var endTime = new goog.date.DateTime();

  var parserDate = new goog.i18n.DateTimeParse(
      rflect.cal.ui.EventPane.getDateFormatString());
  var parserTime = new goog.i18n.DateTimeParse(
      goog.i18n.DateTimeSymbols.TIMEFORMATS[3]);

  var validStartDate = parserDate.parse(this.inputStartDate_.value, startDate)
      != 0;
  var validEndDate = parserDate.parse(this.inputEndDate_.value, endDate) != 0;
  var validStartTime = parserTime.parse(this.inputStartTime_.value, startTime)
      != 0;
  var validEndTime = parserTime.parse(this.inputEndTime_.value, endTime) != 0;

  if (valid = (validStartDate && validEndDate && validStartTime &&
      validEndTime)) {
    startDate.setHours(startTime.getHours());
    startDate.setMinutes(startTime.getMinutes());
    endDate.setHours(endTime.getHours());
    endDate.setMinutes(endTime.getMinutes());
  }
  
  if (valid && startDate.getTime() > endDate.getTime())
    valid = validEndDate = validEndTime = false;

  rflect.cal.ui.EventPane.markInput(validStartDate, this.inputStartDate_);
  rflect.cal.ui.EventPane.markInput(validEndDate, this.inputEndDate_);
  rflect.cal.ui.EventPane.markInput(validStartTime, this.inputStartTime_);
  rflect.cal.ui.EventPane.markInput(validEndTime, this.inputEndTime_);

  if (valid) {
    var startDateShim = rflect.date.createDateShim(startDate.getYear(),
        startDate.getMonth(), startDate.getDate(), startDate.getHours(),
        startDate.getMinutes(), 0, true);
    var endDateShim = rflect.date.createDateShim(endDate.getYear(),
        endDate.getMonth(), endDate.getDate(), endDate.getHours(),
        endDate.getMinutes(), 0);

    if (eh.getAllDay()) {
      startDateShim.setHours(0);
      startDateShim.setMinutes(0);
      if (!(endDateShim.getHours() == 0 &&
          endDateShim.getMinutes() == 0)) {
        endDateShim.setHours(0);
        endDateShim.setMinutes(0);
      }

      // ui date is lesser than real by 1 day for all-day events
      endDateShim = endDateShim.getTomorrow();

    }

    eh.setStartDate(startDateShim);
    eh.setEndDate(endDateShim);
  }

  return valid;
};


/**
 * Disposes of the event pane.
 * @override
 * @protected
 */
rflect.cal.ui.EventPane.prototype.disposeInternal = function() {
  this.inputDatePicker_.dispose();
  this.startTimeAC_.dispose();
  this.endTimeAC_.dispose();
  this.selectCalendars_.dispose();

  rflect.cal.ui.EventPane.superClass_.disposeInternal.call(this);
};