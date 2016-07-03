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

    this.eventPane_ = new rflect.cal.ui.EventPane(aViewManager, aTimeManager,
        aEventManager, aContainerSizeMonitor, aTransport, aNavigator);

    /**
     * Pager.
     */
    this.screenManager.addChild(this.eventPane_);
  };

  /**
   * @param {boolean} aShow
   * @param {boolean} aCreatingByNewButton
   * @param {Element} aAnchorElement
   * @param {goog.math.Coordinate=} opt_anchorCoordinate
   * @param {boolean=} opt_creatingNewEvent
   * @param {boolean=} opt_creatingByTouchHold
   */
  show(aShow, aCreatingByNewButton, aAnchorElement, opt_anchorCoordinate,
      opt_creatingNewEvent, opt_creatingByTouchHold) {
    if (aShow) {
      this.eventPane_.setNewEventMode(opt_creatingNewEvent);
      this.eventPane_.setTouchHoldMode(opt_creatingByTouchHold);
    }

    if (aCreatingByNewButton) {
      this.showForNewButtonCase(aAnchorElement, aShow);
    } else {
      this.showForGridCase(aShow, this.moreSpaceToTheRight(),
          opt_anchorCoordinate);
    }
  }

  /**
   * @param {goog.math.Coordinate=} aAnchorCoordinate
   * @return {number} Margin top for centering modal box.
   */
  getMarginTop(aAnchorCoordinate) {

    const {
        top: topOfPopup,
        right: rightOfPopup,
        bottom: bottomOfPopup,
        left: leftOfPopup
    } = this.getElement().getBoundingClientRect();
    const heightOfPopup = bottomOfPopup - topOfPopup;

    const defaultMarginTopAbs = heightOfPopup / 2;

    const doc = this.getDomHelper().getDocument();
    const win = goog.dom.getWindow(doc) || window;
    const viewSize = goog.dom.getViewportSize(win);

    const howMuchOfPopupIsOut = viewSize.height - aAnchorCoordinate.y -
        defaultMarginTopAbs;

    var marginTopAbs = defaultMarginTopAbs;
    if (defaultMarginTopAbs > aAnchorCoordinate.y) {
      marginTopAbs = aAnchorCoordinate.y;
    } else if (howMuchOfPopupIsOut < 0) {
      marginTopAbs = defaultMarginTopAbs - howMuchOfPopupIsOut;
    }

    return -marginTopAbs;
  }

  /**
   * @param {goog.math.Coordinate=} aAnchorCoordinate
   * @param {boolean} aShow
   * @param {boolean} aRight
   */
  showForGridCase(aShow, aRight,
                  aAnchorCoordinate = new goog.math.Coordinate(0, 0)) {
    const anchorElement = this.getMarkerElement(aAnchorCoordinate);
    this.getDomHelper().getDocument().body.appendChild(anchorElement);

    this.setVisible(aShow);

    this.setPinnedCorner(goog.positioning.Corner.TOP_LEFT);
    const {
      top: topOfPopup,
      right: rightOfPopup,
      bottom: bottomOfPopup,
      left: leftOfPopup
    } = this.getElement().getBoundingClientRect();
    const heightOfPopup = bottomOfPopup - topOfPopup;

    const widthOfPopup = rightOfPopup - leftOfPopup;
    
    this.setMargin(new goog.math.Box(this.getMarginTop(aAnchorCoordinate), 20,
        0, 20));
    this.setPosition(new goog.positioning.AnchoredViewportPosition(
        anchorElement, aRight ?
            goog.positioning.Corner.TOP_LEFT :
            goog.positioning.Corner.TOP_RIGHT));
    this.positionArrow(aRight ?
        rflect.cal.ui.ScreenManagerPopup.ARROW_CONFIGURATION.LEFT :
        rflect.cal.ui.ScreenManagerPopup.ARROW_CONFIGURATION.RIGHT,
        anchorElement);

    goog.dom.removeNode(anchorElement);
  }

  /**
   * @param {goog.math.Coordinate=} aAnchorCoordinate
   * @return {Element}
   */
  getMarkerElement(aAnchorCoordinate){
    return this.getDomHelper().createDom('div', {
      style: `position:absolute;width:1px;height:1px;opacity:0;z-index:-1;top:${
          aAnchorCoordinate.y}px;left:${aAnchorCoordinate.x}px`
        });
  }

  /**
   * @return {boolean}
   */
  moreSpaceToTheRight() {
    return true;
  }

  showForNewButtonCase(aAnchorElement, aShow){
    this.setPinnedCorner(goog.positioning.Corner.TOP_RIGHT);
    this.setMargin(new goog.math.Box(10, 0, 0, 0));
    this.setPosition(new goog.positioning.AnchoredViewportPosition(
        aAnchorElement, goog.positioning.Corner.BOTTOM_RIGHT));
    this.setVisible(aShow);
    this.positionArrow(
        rflect.cal.ui.ScreenManagerPopup.ARROW_CONFIGURATION.TOP,
        aAnchorElement);
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


/**
 * @enum {number}
 */
rflect.cal.ui.EventDialog.CONFIGURATION = {
  NEW_EVENT: 1,
  FIELD_RIGHT: 2,
  FIELD_LEFT: 3
}