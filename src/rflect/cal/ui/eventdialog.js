/*
 * Copyright (c) 2016. Reflect, Alex K.
 */

/**
 * @fileoverview Modal that hosts event pane
 * @author alexeykofficial@gmail.com (Alex K.)
 * @suppress {accessControls}
 */

goog.provide('rflect.cal.ui.EventDialog');

goog.require('rflect.cal.ui.ScreenManagerPopup');


/**
 * Touch hold helper main class.
 * @unrestricted
 */
class EventDialog extends rflect.cal.ui.ScreenManagerPopup {

  /**
   * @param {rflect.cal.ViewManager} aViewManager Link to view manager.
   * @param {rflect.cal.TimeManager} aTimeManager Link to time manager.
   * @param {rflect.cal.events.EventManager} aEventManager Link to event manager.
   * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor Link to
   * container size monitor.
   * @param {rflect.cal.Transport} aTransport Link to transport.
   * @param {rflect.cal.Navigator} aNavigator Link to navigator.
   * @param {boolean=} opt_useIframeMask Work around windowed controls z-index
   *     issue by using an iframe instead of a div for bg element.
   * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link
   *     goog.ui.Component} for semantics.
   */
  constructor(aViewManager, aTimeManager, aEventManager, aContainerSizeMonitor,
      aTransport, aNavigator, opt_useIframeMask, opt_domHelper) {
    super(opt_useIframeMask, opt_domHelper);

    /**
     * Pager.
     */
    this.eventPane_ = new rflect.cal.ui.EventPane(aViewManager, aTimeManager,
        aEventManager, aContainerSizeMonitor, aTransport, aNavigator);

    this.screenManager.addChild(this.eventPane_);
  };

  /**
   * @param {boolean} aShow
   * @param {Element=} opt_anchorElement
   * @param {goog.math.Coordinate=} opt_anchorCoordinate
   * @param {boolean=} opt_creatingNewEvent
   * @param {boolean=} opt_creatingByTouchHold
   * @override
   */
  setVisible(aShow, opt_anchorElement, opt_anchorCoordinate,
      opt_creatingNewEvent, opt_creatingByTouchHold) {
    if (aShow) {
      this.eventPane_.setNewEventMode(opt_creatingNewEvent);
      this.eventPane_.setTouchHoldMode(opt_creatingByTouchHold);
    }

    EventDialog.superClass_.setVisible.call(this, aShow, opt_anchorElement,
        opt_anchorCoordinate);
  }

  /**
   * @override
   */
  disposeInternal() {
    EventDialog.superClass_.disposeInternal.call(this);
  }
}


/**
 * @typedef {EventDialog}
 */
rflect.cal.ui.EventDialog = EventDialog;