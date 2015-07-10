/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Calendar main body, root of all components.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.cal.ui.MainBody');

goog.require('goog.dom.classes');
goog.require('goog.math.Size');
goog.require('goog.style');
goog.require('rflect.browser.transitionend');
goog.require('rflect.cal.predefined');
goog.require('rflect.cal.Transport');
goog.require('rflect.cal.ui.CalendarsPane.EventTypes');
goog.require('rflect.cal.ui.CalSelector');
goog.require('rflect.cal.ui.CalSelector.EventType');
goog.require('rflect.cal.ui.ControlPane');
goog.require('rflect.cal.ui.EventPane');
goog.require('rflect.cal.ui.EventPane.EventTypes');
goog.require('rflect.cal.ui.MainPane');
goog.require('rflect.cal.ui.MiniCal');
goog.require('rflect.cal.ui.PageRequestEvent');
goog.require('rflect.cal.ui.PaneShowBehavior.EventTypes');
goog.require('rflect.cal.ui.PaneShowBehavior.SlideEvent');
goog.require('rflect.cal.ui.ScreenManager.EventTypes');
goog.require('rflect.cal.ui.SettingsPane');
goog.require('rflect.cal.ui.SettingsPane.EventTypes');
goog.require('rflect.cal.ui.SidePane');
goog.require('rflect.ui.Component');
goog.require('rflect.cal.ui.soy.mainbody');



/**
 * Main body main class.
 * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
 * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
 * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
 * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor Link to
 * container size monitor.
 * @param {rflect.cal.blocks.BlockManager} aBlockManager Link to block manager.
 * @param {rflect.cal.Transport} aTransport Link to transport.
 * @param {rflect.cal.Navigator} aNavigator Link to navigator.
 * @constructor
 * @extends {rflect.ui.Component}
 */
rflect.cal.ui.MainBody = function(aViewManager, aTimeManager, aEventManager,
    aContainerSizeMonitor, aBlockManager, aTransport, aNavigator) {
  rflect.ui.Component.call(this);

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
   * Link to container size monitor.
   * @type {rflect.cal.ContainerSizeMonitor}
   * @private
   */
  this.containerSizeMonitor_ = aContainerSizeMonitor;

  /**
   * Link to block manager.
   * @type {rflect.cal.blocks.BlockManager}
   * @private
   */
  this.blockManager_ = aBlockManager;

  /**
   * Link to transport.
   * @type {rflect.cal.Transport}
   * @private
   */
  this.transport_ = aTransport;

  /**
   * Link to navigator.
   * @type {rflect.cal.Navigator}
   * @private
   */
  this.navigator_ = aNavigator;

  // Add child components in order for them to be included in propagation of
  // string building and updating.
  this.addChild(this.topPane_ = new rflect.cal.ui.ControlPane(
      this.viewManager_, this.timeManager_, this.navigator_));
  this.addChild(this.mainPane_ = new rflect.cal.ui.MainPane(this.viewManager_,
      this.timeManager_, this.eventManager_, this.containerSizeMonitor_,
      this.blockManager_, this.transport_, this.navigator_));

  this.addChild(this.sidePane_ = new rflect.cal.ui.SidePane(
      this.viewManager_, this.timeManager_, this.eventManager_,
      this.containerSizeMonitor_, this.navigator_));

  //Enabling touch-only interface.
  //this.enableTouchInterface(rflect.TOUCH_INTERFACE_ENABLED, true);
  //this.enableMouseInterface(!rflect.TOUCH_INTERFACE_ENABLED, true);

  if (goog.DEBUG) {
    _inspect('topPane_', this.topPane_);
    _inspect('mainPane_', this.mainPane_);
    _inspect('sidePane_', this.sidePane_);
  }
};
goog.inherits(rflect.cal.ui.MainBody, rflect.ui.Component);


/**
 * Main body html parts, used by renderer.
 * @type {Array.<string>}
 * @const
 * @private
 */
rflect.cal.ui.MainBody.HTML_PARTS_ = [
  '<div id="main-body" class="main-body">',
  '<div id="top-pane" class="control-pane">',
  '</div>',
  '<div id="main-pane-cont" class="main-pane-cont">',
  '<div id="side-pane" class="side-pane slide-pane-left ',
  '">',
  '</div>',
  '<div id="main-pane" class="main-pane">',
  '</div>',
  '</div>',
  '</div>'
];


/**
 * Accumulated difference in size between dynamic element (scrollables) and
 * their surroundings - top pane, side pane.
 * This version is for week mode.
 * @type {goog.math.Size}
 */
rflect.cal.ui.MainBody.prototype.staticSizesWk;


/**
 * Static sizes for month mode.
 * @type {goog.math.Size}
 */
rflect.cal.ui.MainBody.prototype.staticSizesMn;


/**
 * Static sizes for cal selector.
 * @type {goog.math.Size}
 */
rflect.cal.ui.MainBody.prototype.staticSizesLeftPane;


/**
 * Whether it's a first build in week mode.
 * @type {boolean}
 */
rflect.cal.ui.MainBody.prototype.firstBuildWk = true;


/**
 * Whether it's a first build in month mode.
 * @type {boolean}
 */
rflect.cal.ui.MainBody.prototype.firstBuildMn = true;


/**
 * Whether it's a first build for cal selectors.
 * @type {boolean}
 */
rflect.cal.ui.MainBody.prototype.firstBuildLeftPane = true;


/**
 * Event pane.
 * @type {rflect.cal.ui.EventPane}
 * @private
 */
rflect.cal.ui.MainBody.prototype.eventPane_;


/**
 * Settings pane.
 * @type {rflect.cal.ui.SettingsPane}
 * @private
 */
rflect.cal.ui.MainBody.prototype.settingsPane_;


/**
 * Side pane.
 * @type {rflect.cal.ui.SidePane}
 * @private
 */
rflect.cal.ui.MainBody.prototype.sidePane_;


/**
 * Whether main pane is expanded.
 * @type {boolean}
 * @private
 */
rflect.cal.ui.MainBody.prototype.mainPaneExpanded_;


/**
 * @return {goog.ui.Component}
 */
rflect.cal.ui.MainBody.prototype.getSidePane = function() {
  return this.sidePane_;
};


/**
 * @return {goog.ui.Component}
 */
rflect.cal.ui.MainBody.prototype.getTopPane = function() {
  return this.topPane_;
};


/**
 * @return {goog.ui.Component}
 */
rflect.cal.ui.MainBody.prototype.getMainPane = function() {
  return this.mainPane_;
};


/**
 * @return {goog.ui.Component}
 */
rflect.cal.ui.MainBody.prototype.getBottomPane = function() {
  return this.bottomPane_;
};


/**
 * @return {goog.ui.Component}
 */
rflect.cal.ui.MainBody.prototype.getCalSelector = function() {
  return this.sidePane_.getCalSelector();
};


/**
 * @return {goog.ui.Component}
 */
rflect.cal.ui.MainBody.prototype.getTaskSelector = function() {
  return this.sidePane_.getTaskSelector();
};


/**
 * @return {goog.ui.Component}
 */
rflect.cal.ui.MainBody.prototype.getMiniCal = function() {
  return this.sidePane_.getMiniCal();
};


/**
 * Creates main body on an empty div element.
 */
rflect.cal.ui.MainBody.prototype.createDom = function() {
  this.decorateInternal(this.getDomHelper().createElement('div'));
};


/**
 * Decorates an existing html div element as a Main Body.
 * @override
 */
rflect.cal.ui.MainBody.prototype.decorateInternal = function(aElement,
                                                          opt_doNotBuildBody) {
  // Set this.element_ and build component.
  rflect.cal.ui.MainBody.superClass_.decorateInternal.call(this, aElement,
      opt_doNotBuildBody);

  if (!opt_doNotBuildBody) {
    this.getElement().id = 'main-body';
    this.getElement().className = goog.getCssName('main-body');
  }
};


/**
 * Builds body of component.
 * @param {boolean=} opt_outerHTML Whether to build outer html.
 * @return {string}
 * @see rflect.ui.Component#build
 * @override
 */
rflect.cal.ui.MainBody.prototype.buildHTML = function(opt_outerHTML) {
  return rflect.cal.ui.soy.mainbody.mainBody({
    includeOuterHTML: opt_outerHTML,
    topPaneHTML: this.topPane_.buildHTML(true),
    sidePaneHTML: this.sidePane_.buildHTML(true),
    mainPaneHTML: this.mainPane_.buildHTML(true)
  });
};


/**
 * Redirects parameter to main pane, other children are updated normally.
 * @param {boolean=} opt_deep Whether to update children.
 * @param {boolean=} opt_updateByNavigation Whether this update initiated by
 * buttons of top pane or minical.
 * @override
 */
rflect.cal.ui.MainBody.prototype.updateBeforeRedraw = function(opt_deep,
    opt_updateByNavigation) {
  if (opt_deep){
    this.forEachChild(function(aChild) {
      if (aChild.updateBeforeRedraw && aChild != this.mainPane_)
        aChild.updateBeforeRedraw(opt_deep);
    });
  }

  if (opt_deep){
    // We will update main pane separately to pass params.
    this.mainPane_.updateBeforeRedraw(false, undefined, opt_updateByNavigation);
  }
};


/**
 * Decorates child components.
 */
rflect.cal.ui.MainBody.prototype.enterDocument = function() {
  // We could decorate children right after superclass decorateInternal call,
  // but to preserve pattern (that if we want reliable presence of component in
  // DOM, we should address it in enterDocument), we do it here.
  this.topPane_.decorateInternal(this.getDomHelper().getElement('top-pane'),
      true);
  this.mainPane_.decorateInternal(this.getDomHelper().getElement('main-pane'),
      true);
  this.sidePane_.decorateInternal(this.getDomHelper().getElement('side-pane'),
      true);

  // Propagate call to children.
  rflect.cal.ui.MainBody.superClass_.enterDocument.call(this);

  this.getHandler().listen(this.topPane_, goog.ui.Component.EventType.ACTION,
      this.onControlPaneAction_, false, this)
      .listen(this.sidePane_, goog.ui.Component.EventType.ACTION,
      this.onControlPaneAction_, false, this)
      .listen(this.sidePane_,
      rflect.cal.ui.CalSelector.EventType.CALENDAR_SWITCH,
      this.onCalendarSwitch_, false, this)
      .listen(this.sidePane_.showBehavior,
      rflect.cal.ui.PaneShowBehavior.EventTypes.SLIDE_BREAK,
      this.onSidePaneSlide_, false, this)
      .listen(this.sidePane_, goog.ui.Component.EventType.ACTION,
      this.onSidePaneAction_, false, this)
      .listen(this.viewManager_.getScreenManager(),
      rflect.cal.ui.ScreenManager.EventTypes.BEFORE_PAGE_CHANGE,
      this.onBeforePageChange_, false, this)
      .listen(this.getElement(),
      rflect.browser.transitionend.VENDOR_TRANSITION_END_NAMES,
      this.onMainBodyTransitionEnd, false, this);

  this.getHandler().listen(this.transport_,
      rflect.cal.Transport.EventTypes.LOAD_EVENT, this.onLoadEvents_, false,
      this);

  this.rebuildMainPaneWithSizes();

  if (!this.navigator_.isSmallScreen())
    //Mobile UI's left pane doesn't affect main pane width.
    this.rebuildLeftPaneWithSizes();
};


/**
 * Rebuilds main pane after sizes of all static panes are known.
 */
rflect.cal.ui.MainBody.prototype.rebuildMainPaneWithSizes = function() {
  this.measureStaticSizes();
  if (this.viewManager_.isInWeekMode())
    this.firstBuildWk = false;
  if (this.viewManager_.isInMonthMode())
    this.firstBuildMn = false;

  this.mainPane_.updateBeforeRedraw();
  this.mainPane_.updateByRedraw();

}


/**
 * Rebuilds main pane after sizes of all static panes are known.
 */
rflect.cal.ui.MainBody.prototype.rebuildLeftPaneWithSizes = function() {
  this.measureLeftPaneStaticSizes();

  this.firstBuildLeftPane = false;

  this.getCalSelector().updateBeforeRedraw();
  this.getCalSelector().updateByRedraw();
  this.getTaskSelector().updateBeforeRedraw();
  this.getTaskSelector().updateByRedraw();

}


/**
 * Measures main pane static sizes.
 */
rflect.cal.ui.MainBody.prototype.measureStaticSizes = function() {
  var dom = this.getDomHelper();
  var totalSize = goog.style.getSize(dom.getElement('main-body'));

  if (this.viewManager_.isInWeekMode()) {

    var allDayPaneSize = this.navigator_.isSmallScreen() ?
        new goog.math.Size(0, 0) :
        goog.style.getSize(dom.getElement('main-pane-header-scrollable'));
    var weekPaneSize = goog.style.getSize(
        dom.getElement('main-pane-body-scrollable-wk'));
    //TODO(alexk): fix these pixels in layout
    var additionalPixelsWeek = 0;

    // Border widths are present because they are also "static" relative to
    // pure sizes of grid containers.
    this.staticSizesWk = new goog.math.Size(totalSize.width -
        allDayPaneSize.width +
        rflect.cal.predefined.DEFAULT_BORDER_WIDTH * 2, totalSize.height -
        allDayPaneSize.height - weekPaneSize.height +
        rflect.cal.predefined.DEFAULT_BORDER_WIDTH * 4);

  } else if (this.viewManager_.isInMonthMode()) {

    var monthPaneSize = goog.style.getSize(
        dom.getElement('main-pane-body-scrollable-mn'));
    var additionalPixelsMonth = 0;

    this.staticSizesMn = new goog.math.Size(totalSize.width -
        monthPaneSize.width +
        rflect.cal.predefined.DEFAULT_BORDER_WIDTH * 2
        , totalSize.height -
        monthPaneSize.height +
        //TODO(alexk): why do I need 4px here and not 2?
        rflect.cal.predefined.DEFAULT_BORDER_WIDTH * 4 +
        additionalPixelsMonth);

  }
}


/**
 * Measures left pane static sizes.
 */
rflect.cal.ui.MainBody.prototype.measureLeftPaneStaticSizes = function() {
  var dom = this.getDomHelper();

  var calContainerMB =
      goog.style.getMarginBox(dom.getElement('main-body'));
  var calContainerBB =
      goog.style.getBorderBox(dom.getElement('main-body'));
  var calContainerPB =
      goog.style.getPaddingBox(dom.getElement('main-body'));

  var topPaneSize = goog.style.getSize(dom.getElement('top-pane'));
  var minicalSize = goog.style.getSize(dom.getElement('month-selector'));


  var calSelectorSize =
      goog.style.getSize(dom.getElement('calendars-selector-my'));
  var taskSelectorSize =
      goog.style.getSize(dom.getElement('calendars-selector-other'));

  var totalHeight = calContainerMB.top + calContainerMB.bottom +
      calContainerBB.top + calContainerBB.bottom +
      calContainerPB.top + calContainerPB.bottom +
      topPaneSize.height + minicalSize.height + calSelectorSize.height +
      taskSelectorSize.height
      //TODO(alexk): fix these two pixels in layout
      + 2;

  this.staticSizesLeftPane = new goog.math.Size(0, totalHeight);
}


/**
 * @return {goog.math.Size} Minimal possible size of component.
 */
rflect.cal.ui.MainBody.prototype.getMinimalSize = function() {
  return new goog.math.Size(this.staticSizesWk.width + Math.max(
      rflect.cal.predefined.ALLDAY_SCROLLABLE_DEFAULT_SIZE.width,
      rflect.cal.predefined.MONTH_SCROLLABLE_DEFAULT_SIZE.width),
      this.staticSizesWk.height + Math.max(
      rflect.cal.predefined.ALLDAY_SCROLLABLE_DEFAULT_SIZE.height +
      rflect.cal.predefined.WEEK_SCROLLABLE_DEFAULT_SIZE.height,
      rflect.cal.predefined.MONTH_SCROLLABLE_DEFAULT_SIZE.height));
}


/**
 * Control pane action handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.MainBody.prototype.onControlPaneAction_ = function(aEvent) {
  var id = aEvent.target.getId();

  switch(id){
    case rflect.cal.predefined.BUTTON_NEW_EVENT_ID: {
      this.eventManager_.startEventCreationSession();
      this.showEventPane(true, true);
    };break;
    case rflect.cal.predefined.BUTTON_SETTINGS_ID: {
      this.showSettingsPane(true);
    };break;
    case rflect.cal.predefined.BUTTON_MENU_ID: {
      this.toggleSidePane();
    };break;
    default:break;
  }
}


/**
 * Side pane action handler.
 * @param {goog.events.Event} aEvent Event object.
 * @private
 */
rflect.cal.ui.MainBody.prototype.onSidePaneAction_ = function(aEvent) {
  var id = aEvent.target.getId();

  if (id == rflect.cal.predefined.BUTTON_SETTINGS_ID) {
    this.showSidePane(false);
    this.showSettingsPane(true);
  }
}


/**
 * Side pane slide handler.
 * @param {rflect.cal.ui.PaneShowBehavior.SlideEvent} aEvent Event object.
 * @private
 */
rflect.cal.ui.MainBody.prototype.onSidePaneSlide_ = function(aEvent) {
  var isSmallScreen = this.navigator_.isSmallScreen();

  if (aEvent.start && !aEvent.showing) {
    //NOTE(alexk): we can use rflect.cal.ui.MainBody.prototype.toggleSidePane
    // instead which fires directly on button press.
    if (rflect.SIDE_PANE_MOVABLE)
      this.mainPane_.expandElement(true);
  }
  if (!aEvent.start && !aEvent.showing) {
    if (rflect.SIDE_PANE_MOVABLE)
      this.measureStaticSizes();
  }
  if (aEvent.start && aEvent.showing) {
    if (rflect.SIDE_PANE_MOVABLE)
      this.mainPane_.expandElement(false);
  }
  if (!aEvent.start && aEvent.showing) {
    if (rflect.SIDE_PANE_MOVABLE)
      this.measureStaticSizes();
  }
}


/**
 * Page slide end handler.
 * @param {rflect.cal.ui.ScreenManager.BeforePageChangeEvent} aEvent Event
 * object.
 * @private
 */
rflect.cal.ui.MainBody.prototype.onBeforePageChange_ = function(aEvent) {
  // If switching to main body, add momentum scroller...
  if (aEvent.currentScreen == this) {
    var htmlElement = this.getDomHelper().getDocument().documentElement;
    if (rflect.ARTIFICIAL_SCROLLER_ENABLED) {
      this.mainPane_.addMomentumScroller();
    }
    goog.dom.classes.add(htmlElement, 'overflow-vertical-protected');
    //To prevent offset after scrolling external panes.
    htmlElement.scrollTop = 0;
  }
  //... and remove otherwise.
  else {
    if (rflect.ARTIFICIAL_SCROLLER_ENABLED) {
      this.mainPane_.removeMomentumScroller();
    }
    goog.dom.classes.remove(this.getDomHelper().getDocument().documentElement,
        'overflow-vertical-protected');
  }
}


/**
 * Cal selector action handler.
 * @param {rflect.cal.ui.CalSelector.CalendarSwitchEvent} aEvent Event object.
 * @private
 */
rflect.cal.ui.MainBody.prototype.onCalendarSwitch_ = function(aEvent) {
  var calendarId = aEvent.calendarId;
  var visible = aEvent.visible;

  this.eventManager_.setVisibleCalendar(calendarId, visible);
  this.eventManager_.run();
  this.mainPane_.updateBeforeRedraw();
  this.mainPane_.updateByRedraw();
}


/**
 * Events load handler.
 * @param {rflect.cal.Transport.LoadEventEvent} aEvent Event object.
 * @private
 */
rflect.cal.ui.MainBody.prototype.onLoadEvents_ = function(aEvent) {
  this.eventManager_.run();
  this.mainPane_.update();
}


/**
 * Shows side pane.
 * @param {boolean} aShow Whether to show event pane.
 */
rflect.cal.ui.MainBody.prototype.showSidePane = function(aShow) {
  this.sidePane_.showBehavior.setVisible(aShow);
}


/**
 * Toggles side pane.
 */
rflect.cal.ui.MainBody.prototype.toggleSidePane = function() {
  if (this.navigator_.isSmallScreen()) {
    this.sidePane_.showBehavior.setVisible(
        !this.sidePane_.showBehavior.isVisible());
  } else {
    var movable = this.getElement().querySelector('#main-pane-cont');
    if (this.mainPaneExpanded_) {
      this.getSidePane().getElement().style.display = '';
      this.getMainPane().getElement().style.width = 'auto'
      goog.dom.classes.remove(movable, 'main-pane-cont-expanded');
    } else {
      this.getMainPane().getElement().style.width = '100%'
      goog.dom.classes.add(movable, 'main-pane-cont-expanded');
    }
  }
}


/**
 * Main body transition end listener.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.ui.MainBody.prototype.onMainBodyTransitionEnd = function(aEvent) {
  var movable = this.getElement().querySelector('#main-pane-cont');

  if (aEvent.target != movable)
    return;

  if (!this.mainPaneExpanded_) {
    this.getSidePane().getElement().style.display = 'none'
  } else {
  }

  this.mainPaneExpanded_ = !this.mainPaneExpanded_;
}




/**
 * Shows event pane when possible and lazily instantiates it at the first time.
 * @param {boolean} aShow Whether to show event pane.
 * @param {boolean=} opt_creatingNewEvent Whether we're creating new event.
 */
rflect.cal.ui.MainBody.prototype.showEventPane = function(aShow,
    opt_creatingNewEvent) {
  if (!this.eventPane_) {
    this.eventPane_ = new rflect.cal.ui.EventPane(this.viewManager_,
        this.timeManager_, this.eventManager_,
        this.getDomHelper().getElement('main-container'), this.transport_,
        this.navigator_);
    this.addChild(this.eventPane_);

    this.getHandler().listen(this.eventPane_,
        rflect.cal.ui.EventPane.EventTypes.SAVE, this.onEventPaneSave_,
        false, this).listen(this.eventPane_,
        rflect.cal.ui.EventPane.EventTypes.DELETE, this.onEventPaneDelete_,
        false, this);
  }

  this.eventPane_.setNewEventMode(opt_creatingNewEvent);

  this.dispatchEvent(new rflect.cal.ui.PageRequestEvent(this.eventPane_,
      aShow));
}


/**
 * Shows settings pane when possible and lazily instantiates it at the first
 * time.
 * @param {boolean} aShow Whether to show settings pane.
 */
rflect.cal.ui.MainBody.prototype.showSettingsPane = function(aShow) {
  if (!this.settingsPane_) {
    this.settingsPane_ = new rflect.cal.ui.SettingsPane(this.viewManager_,
        this.timeManager_, this.eventManager_,
        this.getDomHelper().getElement('main-container'), this.transport_);
    this.addChild(this.settingsPane_);

    // Save settings handler is in view manager.
    this.getHandler().listen(this.settingsPane_,
        rflect.cal.ui.CalendarsPane.EventTypes.CALENDAR_UPDATE,
        this.onSettingsPaneCalendarUpdate_, false, this);

    if (goog.DEBUG) {
      _inspect('settingsPane_', this.settingsPane_);
    }
  }

  this.dispatchEvent(new rflect.cal.ui.PageRequestEvent(this.settingsPane_,
      aShow));
}


/**
 * @param {boolean} aShow Whether to show calendar element.
 * @private
 */
rflect.cal.ui.MainBody.prototype.showCalendar_ = function(aShow) {
  goog.style.showElement(this.getDomHelper().getElement('cal-container'),
      aShow);
}


/**
 * Event pane save listener.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.ui.MainBody.prototype.onEventPaneSave_ = function(aEvent) {
  this.updateMainPane_();
}


/**
 * Event pane delete listener.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.ui.MainBody.prototype.onEventPaneDelete_ = function(aEvent) {
  this.updateMainPane_();
}


/**
 * Settings pane cancel listener.
 */
rflect.cal.ui.MainBody.prototype.onSettingsPaneCancel_ = function() {
  this.showSettingsPane(false);
}


/**
 * Settings pane calendar update listener.
 * @param {goog.events.Event} aEvent Event object.
 */
rflect.cal.ui.MainBody.prototype.onSettingsPaneCalendarUpdate_ =
    function(aEvent) {

  this.eventManager_.run();
  this.getCalSelector().redrawIsNeeded = true;
  this.getTaskSelector().redrawIsNeeded = true;

  this.sidePane_.update();
  this.sidePane_.getCalSelector().update();
  this.sidePane_.getTaskSelector().update();


  this.getMainPane().updateBeforeRedraw();
  //Do not attach momentum scroller, we will do it on page change.
  this.getMainPane().updateByRedraw(false, true);

}


/**
 * Updates just main pane.
 */
rflect.cal.ui.MainBody.prototype.updateMainPane_ = function() {
  this.eventManager_.run();

  this.getMainPane().updateBeforeRedraw();
  //Do not attach momentum scroller, we will do it on page change.
  this.getMainPane().updateByRedraw(false, true);
}



/**
 * Disposes of the Main Body.
 * @override
 * @protected
 */
rflect.cal.ui.MainBody.prototype.disposeInternal = function() {
  rflect.cal.ui.MainBody.superClass_.disposeInternal.call(this);

  this.topPane_ = null;
  this.bottomPane_ = null;
  this.mainPane_ = null;
  this.viewManager_ = null;
  this.timeManager_ = null;
  this.blockManager_ = null;
  this.eventPane_ = null;
};
