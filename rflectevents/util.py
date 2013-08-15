from rflectevents.models import Event
from base64 import urlsafe_b64encode
import os
import json

def generateEventId():
  id = __generateUniqueIdImpl()

  while Event.objects.filter(id = id).count() != 0:
    id = __generateUniqueIdImpl()

  return id

def generateCalendarId():
  id = __generateUniqueIdImpl()

  while Calendar.objects.filter(id = id).count() != 0:
    id = __generateUniqueIdImpl()

  return id

def __generateUniqueIdImpl():
  #TODO(alexk): change this to 30
  return urlsafe_b64encode(os.urandom(30))


def serializeEvents(events):

  response = []
  for event in events:
    eventList = []
    eventList.append(event.id)
    eventList.append(event.start)
    eventList.append(event.end)
    eventList.append(event.name)
    eventList.append(event.description)
    eventList.append(event.allDay)
    eventList.append(event.calendar.id)

    response.append(eventList)

  responseJSON = json.dumps(response)
  return responseJSON


def serializeCalendars(calendars):

  response = []

  for cal in calendars:
    calendarList = []

    calendarList.append(cal.id)
    calendarList.append(cal.name)
    calendarList.append(cal.visible)
    calendarList.append(cal.colorCodeIndex)
    calendarList.append(cal.readOnly)

    response.append(calendarList)

  responseJSON = json.dumps(response)
  return responseJSON
