/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Rflect date utilities.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


goog.provide('rflect.date');
goog.provide('rflect.date.Date');

goog.require('goog.date.Date');
goog.require('goog.date.DateTime');
goog.require('goog.date.Interval');
goog.require('goog.i18n.DateTimeSymbols');


/**
 * @typedef {(Date|goog.date.Date|rflect.date.Date)}
 */
goog.date.DateLike;


/**
 * Move to the next or last dayOfWeek based on the orient value.
 * @param aDate {goog.date.DateLike} Date to shift.
 * @param aDay {number} The dayOfWeek to move to (0 is Monday).
 * @param opt_orient {number=} Forward (+1) or Back (-1). Defaults to +1.
 * @return {rflect.date.Date} Shifted date.
 */
rflect.date.moveToDayOfWeek = function(aDate, aDay, opt_orient) {
  // Locale-dependent first day of week.
  var day = (goog.i18n.DateTimeSymbols.FIRSTDAYOFWEEK + aDay + 1) % 7;
  var diff = (day - aDate.getDay() + 7 * (opt_orient || +1)) % 7;
  var date = aDate.clone();
  date.add(new goog.date.Interval(0, 0, (diff === 0) ? diff += 7 *
      (opt_orient || +1) : diff));
  return date;
};


/**
 * Move to the next or last dayOfWeek based on the orient value,
 * if not already staying in this week day.
 * @param aDate {goog.date.DateLike} Date to shift.
 * @param aDay {number} The dayOfWeek to move to (0 is Monday).
 * @param opt_orient {number} Forward (+1) or Back (-1). Defaults to +1.
 * @return {rflect.date.Date} Shifted date.
 */
rflect.date.moveToDayOfWeekIfNeeded = function(aDate, aDay, opt_orient) {
  if (aDate.getWeekday() != aDay) {
    return rflect.date.moveToDayOfWeek(aDate, aDay, opt_orient);
  }
  return aDate;
};



/**
 * Returns minimal or maximal day number in this day and month depending on
 * direction of search.
 * @param {number} aYear Year.
 * @param {number} aMonth Month.
 * @param {number} aDirection Direction in which we should move: 1 is forward,
 * -1 is backward.
 * @return {number} Maximal or minimal day in this year and month.
 * @private
 */
rflect.date.getDayLimit_ = function(aYear, aMonth, aDirection) {
  return aDirection > 0 ? goog.date.getNumberOfDaysInMonth(aYear, aMonth) : 1;
};


/**
 * Returns day standing some number of days from current.
 * @param {goog.date.DateLike} aGivenDate Current date.
 * @param {number} aNumberOfDays Number of days from given.
 * @param {number} aDirection Direction in which we should move: 1 is forward,
 * -1 is backward.
 * @return {rflect.date.Date} Next date.
 */
rflect.date.getDayFromGiven =
    function(aGivenDate, aNumberOfDays, aDirection) {
  var date = null;
  var year = aGivenDate.getFullYear();
  var month = aGivenDate.getMonth();
  var day = aGivenDate.getDate();
  var dayOfWeek = aDirection > 0 ?
      (aGivenDate.getDay() + aNumberOfDays) % 7 :
      (aGivenDate.getDay() + 1 - aNumberOfDays) % 7;

  var monthLimit = aDirection > 0 ? 11 : 0;
  var nextBeginingMonth = aDirection > 0 ? 0 : 11;

  for (var counter = 0; counter < aNumberOfDays; counter++) {
    if (day == rflect.date.getDayLimit_(year, month, aDirection)) {
      if (month == monthLimit) {
        year += aDirection;
        month = nextBeginingMonth;
        // Reverse limit in next month.
        day = rflect.date.getDayLimit_(year, month, aDirection > 0 ? -1 :
            1);
      } else {
        month += aDirection;
        day = rflect.date.getDayLimit_(year, month, aDirection > 0 ? -1 :
            1);
      }
    } else {
      day += aDirection;
    }
  }

  date = new rflect.date.Date(year, month, day);
  date.day = dayOfWeek;
  return date;
};


/**
 * @param {goog.date.DateLike} aGivenDate Current date.
 * @return {rflect.date.Date} Tomorrow date.
 */
rflect.date.getTomorrow = function(aGivenDate){
  return rflect.date.getDayFromGiven(aGivenDate, 1, 1);
}


/**
 * @param {goog.date.DateLike} aGivenDate Current date.
 * @return {rflect.date.Date} Yesterday date.
 */
rflect.date.getYesterday = function(aGivenDate){
  return rflect.date.getDayFromGiven(aGivenDate, 1, -1);
}


/**
 * @param {rflect.date.Date} aDateA First date to compare.
 * @param {rflect.date.Date} aDateB First date to compare.
 * @return {number|undefined} 1 if first arg is greater, 0 if equals, -1
 * otherwise.
 */
rflect.date.compareByWeekAndYear = function(aDateA, aDateB){
  return aDateA.getYear() == aDateB.getYear() ? (aDateA.week == aDateB.week
      ? 0 : (aDateA.week > aDateB.week ? 1 : -1)) : (aDateA.getYear() >
      aDateB.getYear() ? 1 : -1)
}


/**
 * Class that simulates Date, could be used instead it in simple calculations
 * for performance reasons (Firefox 2 has slow Date object).
 * @param {number|goog.date.DateLike=} opt_year Four digit year or a date-like
 * object. If not set, the created object will contain the date determined by
 * goog.now().
 * @param {number=} opt_month Month, 0 = Jan, 11 = Dec.
 * @param {number=} opt_date Date of month, 1 - 31.
 * @param {number=} opt_hours Hours, 0 - 24.
 * @param {number=} opt_minutes Minutes, 0 - 59.
 * @param {number=} opt_seconds Seconds, 0 - 61.
 * @param {number=} opt_milliseconds Milliseconds, 0 - 999.
 * @constructor
 * @extends {goog.date.DateTime}
 */
rflect.date.Date = function(opt_year, opt_month, opt_date, opt_hours,
    opt_minutes, opt_seconds, opt_milliseconds) {
  if (goog.isNumber(opt_year)) {
    this.setYear(opt_year || 0);
    this.setMonth(opt_month || 0);
    this.setDate(opt_date || 0);
    this.setHours(opt_hours || 0);
    this.setMinutes(opt_minutes || 0);
    this.setSeconds(opt_seconds || 0);
    this.setMilliseconds(opt_milliseconds || 0);
  } else {
    var date;
    if (goog.isObject(opt_year))
      date = new Date(opt_year);
    else
      date = new Date(goog.now());
    this.setYear(date.getFullYear());
    this.setMonth(date.getMonth());
    this.setDate(date.getDate());
    this.day = date.getDay();
    this.setHours(date.getHours());
    this.setMinutes(date.getMinutes());
    this.setSeconds(date.getSeconds());
    this.setMilliseconds(date.getMilliseconds());
  }
};
goog.inherits(rflect.date.Date, goog.date.DateTime);


/**
 * Four digit year.
 * @type {number}
 * @private
 */
rflect.date.Date.prototype.year_ = 0;


/**
 * Month.
 * @type {goog.date.month}
 * @private
 */
rflect.date.Date.prototype.month_ = goog.date.month.JAN;


/**
 * Week.
 * @type {number}
 */
rflect.date.Date.prototype.week = 0;


/**
 * Day of month.
 * @type {number}
 * @private
 */
rflect.date.Date.prototype.dayOfMonth_ = 0;


/**
 * Day of week in US style (0 - Sun, 6 - Sat).
 * @type {goog.date.weekDay}
 */
rflect.date.Date.prototype.day = 0;


/**
 * The number of milliseconds since 1 January 1970 00:00:00.
 * @type {number}
 */
rflect.date.Date.prototype.time = 0;


/**
 * Hours.
 * @type {number}
 * @private
 */
rflect.date.Date.prototype.hours_ = 0;


/**
 * Minutes.
 * @type {number}
 * @private
 */
rflect.date.Date.prototype.minutes_ = 0;


/**
 * Seconds.
 * @type {number}
 * @private
 */
rflect.date.Date.prototype.seconds_ = 0;


/**
 * Milliseconds.
 * @type {number}
 * @private
 */
rflect.date.Date.prototype.milliseconds_ = 0;


/**
 * @param {number} year Four digit year.
 */
rflect.date.Date.prototype.setFullYear = function(year) {
  this.year_ = year;
};


/**
 * @param {number} year Four digit year.
 */
rflect.date.Date.prototype.setYear = function(year) {
  this.year_ = year;
};


/**
 * @param {goog.date.month} month The month, where 0 = Jan, 11 = Dec.
 */
rflect.date.Date.prototype.setMonth = function(month) {
  this.month_ = month;
};


/**
 * @param {number} date The day part.
 */
rflect.date.Date.prototype.setDate = function(date) {
  this.dayOfMonth_ = date;
};


/**
 * @return {number} Four digit year.
 */
rflect.date.Date.prototype.getFullYear = function() {
  return this.year_;
};


/**
 * @return {number} Four digit year.
 */
rflect.date.Date.prototype.getYear = function() {
  return this.year_;
};


/**
 * @return {goog.date.month} The month, where 0 = Jan, 11 = Dec.
 */
rflect.date.Date.prototype.getMonth = function() {
  return this.month_;
};


/**
 * @return {number} Day.
 */
rflect.date.Date.prototype.getDate = function() {
  return this.dayOfMonth_;
};


/**
 * @return {number} Day of week, US style - 0 - Sun, 6 - Sat.
 */
rflect.date.Date.prototype.getDay = function() {
  return this.day;
};


/**
 * @return {number} The number of milliseconds since 1 January 1970 00:00:00.
 */
rflect.date.Date.prototype.getTime = function() {
  return this.time;
};


/**
 * Returns the hours part of the datetime.
 *
 * @return {number} An integer between 0 and 23, representing the hour.
 */
rflect.date.Date.prototype.getHours = function() {
  return this.hours_;
};


/**
 * Returns the minutes part of the datetime.
 *
 * @return {number} An integer between 0 and 59, representing the minutes.
 */
rflect.date.Date.prototype.getMinutes = function() {
  return this.minutes_;
};


/**
 * Returns the seconds part of the datetime.
 *
 * @return {number} An integer between 0 and 59, representing the seconds.
 */
rflect.date.Date.prototype.getSeconds = function() {
  return this.seconds_;
};


/**
 * Returns the milliseconds part of the datetime.
 *
 * @return {number} An integer between 0 and 999, representing the milliseconds.
 */
rflect.date.Date.prototype.getMilliseconds = function() {
  return this.milliseconds_;
};


/**
 * Sets the hours part of the datetime.
 *
 * @param {number} aHours An integer between 0 and 23, representing the hour.
 */
rflect.date.Date.prototype.setHours = function(aHours) {
  this.hours_ = aHours;
};


/**
 * Sets the minutes part of the datetime.
 *
 * @param {number} aMinutes Integer between 0 and 59, representing the minutes.
 */
rflect.date.Date.prototype.setMinutes = function(aMinutes) {
  this.minutes_ = aMinutes;
};


/**
 * Sets the seconds part of the datetime.
 *
 * @param {number} aSeconds Integer between 0 and 59, representing the seconds.
 */
rflect.date.Date.prototype.setSeconds = function(aSeconds) {
  this.seconds_ = aSeconds;
};


/**
 * Sets the seconds part of the datetime.
 *
 * @param {number} aMs Integer between 0 and 999, representing the milliseconds.
 */
rflect.date.Date.prototype.setMilliseconds = function(aMs) {
  this.milliseconds_ = aMs;
};


/**
 * @return {number} Value of wrapped date.
 */
rflect.date.Date.prototype.valueOf = function() {
  return +[this.year_, this.month_, this.dayOfMonth_, this.hours_,
      this.minutes_, this.seconds_, this.milliseconds_].join('');
};