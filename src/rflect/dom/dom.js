/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Utilities for manipulating dom.
 */

goog.provide('rflect.dom');

goog.require('goog.array');
goog.require('goog.dom');


/**
 * @param {...Element|string} var_args Some elements or nodes (select, input,
 * textarea).
 * @return {Element} Control wrapped in div.control-wrapper, to be fluid in
 * width.
 */
rflect.dom.wrapControl = function(aControl, var_args) {
  if (!var_args)
    return goog.dom.createDom('div', 'control-wrapper', aControl);

  var elems = goog.array.slice(arguments, 0);
  return goog.dom.createDom.apply(null, ['div', 'control-wrapper']
      .concat(elems));
}


/**
 * Wraps select in container to make it look consistent across browsers.
 * @link {http://jsbin.com/juvixufu/347/edit}
 * @param {Element} aSelect Select to wrap.
 * @return {Element} Select wrapped.
 */
rflect.dom.wrapSelect = function(aSelect) {
  return goog.dom.createDom('div', ['button', 'dropdown'], aSelect);
}
