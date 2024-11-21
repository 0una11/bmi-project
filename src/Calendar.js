// Calendar.js
import React, { useState } from 'react';
import './Calendar.css';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {
  const [events, setEvents] = useState({});
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [eventTitle, setEventTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedDateEvents, setSelectedDateEvents] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const getDateRange = (start, end) => {
    const dateArray = [];
    let currentDate = new Date(start);
    while (currentDate <= new Date(end)) {
      dateArray.push(
        `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`
      );
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  };

  const handleAddEvent = () => {
    if (eventTitle.trim() === '' || !startDate || !endDate || !startTime || !endTime) {
      alert('Please fill out all event fields!');
      return;
    }

    if (new Date(`${startDate}T${startTime}`) > new Date(`${endDate}T${endTime}`)) {
      alert('End time cannot be earlier than start time!');
      return;
    }

    const newEvent = {
      title: eventTitle,
      startDate,
      endDate,
      startTime,
      endTime,
    };

    const datesInRange = getDateRange(startDate, endDate);

    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents };
      datesInRange.forEach((date) => {
        updatedEvents[date] = [...(updatedEvents[date] || []), newEvent];
      });
      return updatedEvents;
    });

    resetForm();
  };

  const handleDeleteEvent = (dateString, index) => {
    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents };
      updatedEvents[dateString].splice(index, 1);
      if (updatedEvents[dateString].length === 0) {
        delete updatedEvents[dateString];
      }
      return updatedEvents;
    });
  };

  const handleEditEvent = (dateString, index) => {
    const eventToEdit = events[dateString][index];
    setEventTitle(eventToEdit.title);
    setStartDate(eventToEdit.startDate);
    setEndDate(eventToEdit.endDate);
    setStartTime(eventToEdit.startTime);
    setEndTime(eventToEdit.endTime);
    setEditMode(true);
    setEditIndex(index);
  };

  const handleUpdateEvent = () => {
    const updatedEvent = {
      title: eventTitle,
      startDate,
      endDate,
      startTime,
      endTime,
    };

    const datesInRange = getDateRange(startDate, endDate);

    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents };

      // Remove the event from the original date range
      const originalDateRange = getDateRange(events[startDate][editIndex].startDate, events[startDate][editIndex].endDate);
      originalDateRange.forEach((date) => {
        updatedEvents[date] = updatedEvents[date].filter((_, idx) => idx !== editIndex);
        if (updatedEvents[date].length === 0) {
          delete updatedEvents[date];
        }
      });

      // Add the event with the updated date range
      datesInRange.forEach((date) => {
        updatedEvents[date] = [...(updatedEvents[date] || []), updatedEvent];
      });

      return updatedEvents;
    });

    resetForm();
  };

  const resetForm = () => {
    setEventTitle('');
    setStartDate('');
    setEndDate('');
    setStartTime('');
    setEndTime('');
    setEditMode(false);
    setEditIndex(null);
  };

  const handleDateClick = (date) => {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    setStartDate(dateString);
    setEndDate(dateString);
    setSelectedDateEvents(events[dateString] || null);
  };

  const handleYearChange = (e) => setYear(parseInt(e.target.value));
  const handleMonthChange = (e) => setMonth(parseInt(e.target.value));

  return (
    <div className='calendar-container'>
      <h2>Calendar</h2>
      <div className='date-selector'>
        <select value={year} onChange={handleYearChange}>
          {Array.from({ length: 21 }, (_, i) => {
            const y = new Date().getFullYear() - 10 + i;
            return <option key={y} value={y}>{y}</option>;
          })}
        </select>
        <select value={month} onChange={handleMonthChange}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
          ))}
        </select>
      </div>

      <div className='calendar-weekdays'>
        {daysOfWeek.map((day, index) => (
          <div key={index} className='weekday'>{day}</div>
        ))}
      </div>

      <div className='calendar-grid'>
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className='calendar-day empty'></div>
        ))}

        {[...Array(daysInMonth)].map((_, i) => {
          const date = i + 1;
          const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
          return (
            <div
              key={date}
              className='calendar-day'
              onClick={() => handleDateClick(date)}
            >
              <span>{date}</span>
              {events[dateString] && (
                <div className='event-indicator'>
                  {events[dateString].map((event, idx) => (
                    <span key={idx} className='event-dot'>•</span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedDateEvents && (
        <div className='event-details'>
          <h3>Events on {selectedDateEvents[0].startDate}</h3>
          <ul>
            {selectedDateEvents.map((event, index) => (
              <li key={index}>
                <strong>{event.title}</strong><br />
                {event.startDate} {event.startTime} - {event.endDate} {event.endTime}
                <button onClick={() => handleEditEvent(event.startDate, index)}>Edit</button>
                <button onClick={() => handleDeleteEvent(event.startDate, index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className='add-event-form'>
        <h3>{editMode ? 'Edit Event' : 'Add New Event'}</h3>
        <input
          type='text'
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          placeholder='Event Title'
        />
        <div className='date-time-inputs'>
          <label>Start Date:</label>
          <input
            type='date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label>Start Time:</label>
          <input
            type='time'
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <label>End Date:</label>
          <input
            type='date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <label>End Time:</label>
          <input
            type='time'
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <button onClick={editMode ? handleUpdateEvent : handleAddEvent}>
          {editMode ? 'Update Event' : 'Add Event'}
        </button>
      </div>
    </div>
  );
};

export default Calendar;
