/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Implementation of UI component, that can be built with string
 * builder.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('rflect.ui.Component');

goog.require('goog.array');
goog.require('goog.string.StringBuffer');
goog.require('goog.ui.Component');



/**
 * UI component class. Main difference with parent class is that it may use
 * string buffer to build html body.
 *
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {goog.ui.Component}
 */
rflect.ui.Component = function(opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);

};
goog.inherits(rflect.ui.Component, goog.ui.Component);


/**
 * @param {Array.<number>|undefined} aContainer Array to test index presence in.
 * @param {number} aIndex Index to test.
 * @return {boolean} Whether index is within array of indexes to be excluded
 * from update.
 */
rflect.ui.Component.indexIsInExclusions = function(aContainer, aIndex) {
  return !!aContainer &&
      !!aContainer.length &&
      goog.array.contains(aContainer, aIndex)
}


/**
 * Creates component on an empty div element.
 */
rflect.ui.Component.prototype.createDom = function() {
  this.decorateInternal(this.getDomHelper().createDom('div'));
};


/**
 * Decorates an existing html div element as a component.
 * @param {Element} aElement The div element to decorate.
 * @param {boolean=} opt_doNotBuildBody Whether to build body or not.
 */
rflect.ui.Component.prototype.decorateInternal = function(aElement,
                                                           opt_doNotBuildBody) {
  // Set this.element_.
  rflect.ui.Component.superClass_.decorateInternal.call(this, aElement);
  // Build body.
  if (!opt_doNotBuildBody) {
    this.getElement().innerHTML = this.build();
  }
};


/**
 * Builds body of component. We could use either given string buffer and append
 * parts to it, or use one that belongs to this particular component and, in
 * that case, return ready string.
 * @param {goog.string.StringBuffer=} aSb String buffer to append HTML parts
 * to.
 * @return {string|undefined} HTML of component or none.
 */
rflect.ui.Component.prototype.build = function(aSb) {
  var sb = aSb || new goog.string.StringBuffer();
  this.buildInternal(sb);
  if (!aSb) {
    return sb.toString();
  }
};


/**
 * Builds body of component.
 * @param {goog.string.StringBuffer} aSb String buffer to append HTML parts
 * to. Must be overridden.
 * @protected
 */
rflect.ui.Component.prototype.buildInternal = function(aSb) {
  goog.abstractMethod();
};


/**
 * Updates component before redraw. This is used when some part of
 * component's update logic need to be separated from redraw. Propagates to
 * component's children by default. For custom behavior, should be overridden by
 * subclasses.
 * @param {Array.<number>=} opt_exclusions Index(es) of component's children which
 * should be excluded from update.
 */
rflect.ui.Component.prototype.updateBeforeRedraw =
    function(opt_exclusions) {
  this.forEachChild(function(aChild, aIndex) {
    if (aChild.updateBeforeRedraw &&
        !rflect.ui.Component.indexIsInExclusions(opt_exclusions, aIndex))
      aChild.updateBeforeRedraw();
  });
};


/**
 * Updates body of component by redraw. This is a second and final part of
 * component update sequence.
 * @param {Array.<number>=} opt_exclusions Index(es) of component's children which
 * should be excluded from update.
 * @see {rflect.cal.ui.MainBody#updateBeforeRedraw}.
 */
rflect.ui.Component.prototype.updateByRedraw =
    function(opt_exclusions) {
  // Propagate call to child components that have a DOM, if any.
  this.forEachChild(function(aChild, aIndex) {
    if (aChild.updateByRedraw && aChild.isInDocument() && aChild.getElement() &&
        !rflect.ui.Component.indexIsInExclusions(opt_exclusions, aIndex)) {
      aChild.updateByRedraw();
    }
  });
};


/**
 * Updates component in whole update sequence.
 * @param {Array.<number>=} opt_exclusions Index(es) of component's children which
 * should be excluded from update.
 * @see {rflect.cal.ui.MainBody#updateBeforeRedraw}.
 */
rflect.ui.Component.prototype.update =
    function(opt_exclusions) {
  this.updateBeforeRedraw(opt_exclusions);
  this.updateByRedraw(opt_exclusions);
};


/**
 * Disposes of component.
 * @override
 * @protected
 */
rflect.ui.Component.prototype.disposeInternal = function() {
  rflect.ui.Component.superClass_.disposeInternal.call(this);
};
