/*
 * Copyright (c) 2015. Rflect, Alex K.
 */

/**
 * @fileoverview Size methods helper class, configuration key is combination of
 * mainbody expanded state, screen size category and current view.
 * @author alexeykofficial@gmail.com (Alex K.)
 * @suppress {accessControls}
 */

goog.provide('rflect.cal.ui.MainBodyAdaptiveSizeHelper');

goog.require('rflect.cal.ui.AdaptiveSizeHelper');
goog.require('rflect.cal.Navigator.SIZE_CATEGORY');



/**
 * Size adapter main class.
 * @unrestricted
 */
class MainBodyAdaptiveSizeHelper extends rflect.cal.ui.AdaptiveSizeHelper {
  /**
   * @param {rflect.cal.ViewManager} aViewManager
   * @param {rflect.cal.ui.MainBody} aMainBody
   * @param {rflect.cal.ContainerSizeMonitor} aContainerSizeMonitor
   */
  constructor(aViewManager, aMainBody, aContainerSizeMonitor) {

    super();

    /**
     * @type {rflect.cal.ViewManager}
     * @private
     */
    this.viewManager_ = aViewManager;

    /**
     * @type {rflect.cal.ui.MainBody}
     * @private
     */
    this.mainBody_ = aMainBody;

    /**
     * @type {rflect.cal.ContainerSizeMonitor}
     * @private
     */
    this.containerSizeMonitor_ = aContainerSizeMonitor;

  };


  /**
   * @return {string}
   */
  getConfigurationKey() {
    var sizeCategory = this.containerSizeMonitor_.getSizeCategory();
    return this.viewManager_.currentView + '-' +
        sizeCategory +
        //If size category assumes external side pane, it doesn't really matter
        //whether mainbody is expanded or not.
        (sizeCategory <= rflect.cal.Navigator.SIZE_CATEGORY.IPAD_PORTRAIT ? '' :
            '-' + String(this.mainBody_.isExpanded()));

  }


  /**
   * @return {goog.math.Size}
   */
  getStaticSizeForView() {
    var configurationKey = this.getConfigurationKey();
    if (goog.DEBUG)
      console.log('configurationKey: ', configurationKey);
    return this.getStaticSize(configurationKey);
  };


  /**
   * @param {goog.math.Size} aSize
   */
  setStaticSizeForView(aSize) {
    this.setStaticSize(this.getConfigurationKey(), aSize);
  };


  /**
   * @return {boolean}
   */
  getSizeWasAdaptedForView() {
    return this.getSizeWasAdapted(this.getConfigurationKey());
  };


  /**
   * @param {boolean} aWasAdapted
   */
  setSizeWasAdaptedForView(aWasAdapted) {
    this.setSizeWasAdapted(this.getConfigurationKey(), aWasAdapted);
  };
}


/**
 * @typedef {MainBodyAdaptiveSizeHelper}
 */
rflect.cal.ui.MainBodyAdaptiveSizeHelper = MainBodyAdaptiveSizeHelper;