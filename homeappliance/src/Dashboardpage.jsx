// DashboardPage.jsx
import React, { useState } from 'react';
import './CSS/userdashboard.css';

function DashboardPage() {
  // State to track active view (Today, Upcoming, etc.)
  const [activeView, setActiveView] = useState('Today');
  const [calendarView, setCalendarView] = useState('Day');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Sample task data for Today view
  const todayTasks = [
    { id: 1, title: 'Research content ideas', list: null, date: null, bookmarks: 0, personal: false },
    { id: 2, title: 'Create a database of guest authors', list: null, date: null, bookmarks: 0, personal: false },
    { id: 3, title: 'Renew driver\'s license', list: null, date: '22-05-22', bookmarks: 1, personal: true },
    { id: 4, title: 'Consult accountant', list: 'List 1', date: null, bookmarks: 2, personal: false },
    { id: 5, title: 'Print business card', list: null, date: null, bookmarks: 0, personal: false }
  ];

  // Sample task data for Tomorrow section (part of Upcoming view)
  const tomorrowTasks = [
    { id: 6, title: 'Create job posting for SEO specialist', list: null, date: null, bookmarks: 0, personal: false },
    { id: 7, title: 'Request design assets for landing page', list: null, date: null, bookmarks: 0, personal: false }
  ];

  // Sample task data for This Week section (part of Upcoming view)
  const thisWeekTasks = [
    { id: 8, title: 'Research content ideas', list: null, date: null, bookmarks: 0, personal: false },
    { id: 9, title: 'Create a database of guest authors', list: null, date: null, bookmarks: 0, personal: false },
    { id: 10, title: 'Renew driver\'s license', list: null, date: null, bookmarks: 0, personal: true },
    { id: 11, title: 'Consult accountant', list: null, date: null, bookmarks: 0, personal: false },
    { id: 12, title: 'Print business card', list: null, date: null, bookmarks: 0, personal: false }
  ];

  // Sample calendar events
  const calendarEvents = [
    { id: 1, title: 'Session 1: Marketing Sprint', time: '09:00', duration: 180, type: 'blue', day: 'MON' },
    { id: 2, title: 'Session 2: Marketing Sprint', time: '09:00', duration: 180, type: 'blue', day: 'THU' },
    { id: 3, title: 'Sales Catchup', time: '10:00', duration: 60, type: 'blue', day: 'MON' },
    { id: 4, title: 'Sales Catchup', time: '10:00', duration: 60, type: 'blue', day: 'THU' },
    { id: 5, title: 'Coaching Session', time: '11:00', duration: 60, type: 'yellow', day: 'TUE' },
    { id: 6, title: 'Brainstorming for SEO specialist', time: '12:00', duration: 120, type: 'blue', day: 'WED' },
    { id: 7, title: 'Business lunch w/ Aaron', time: '12:00', duration: 120, type: 'yellow', day: 'THU' },
    { id: 8, title: "Review driver's license", time: '01:00', duration: 120, type: 'pink', day: 'MON' },
  ];

  // Generate time slots from 9 AM to 6 PM
  const timeSlots = Array.from({ length: 10 }, (_, i) => {
    const hour = i + 9;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay() || 7; // Convert Sunday (0) to 7 for our Monday start
    
    const days = [];
    // Add empty slots for days before the first of the month
    for (let i = 1; i < startingDay; i++) {
      const prevMonthLastDay = new Date(year, month, 0);
      const day = prevMonthLastDay.getDate() - (startingDay - i - 1);
      days.push({ day, currentMonth: false });
    }
    
    // Add current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, currentMonth: true });
    }
    
    // Add empty slots for days after the last day of the month
    const remainingSlots = 42 - days.length; // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingSlots; i++) {
      days.push({ day: i, currentMonth: false });
    }
    
    return days;
  };

  const formatDate = (date) => {
    if (calendarView === 'Week') {
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay() + 1);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      const startMonth = startOfWeek.toLocaleString('default', { month: 'long' });
      const endMonth = endOfWeek.toLocaleString('default', { month: 'long' });
      const startDay = startOfWeek.getDate();
      const endDay = endOfWeek.getDate();
      const year = startOfWeek.getFullYear();

      if (startMonth === endMonth) {
        return `${startDay}-${endDay} ${startMonth} ${year}`;
      }
      return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`;
    } else {
      return date.toLocaleString('default', { month: 'long', year: 'numeric' });
    }
  };

  // Calculate event position and height based on time and duration
  const getEventStyle = (time, duration) => {
    const [hours, minutes] = time.split(':').map(Number);
    const top = (hours - 9) * 4 + (minutes / 15); // 4rem per hour
    const height = (duration / 60) * 4; // 4rem per hour
    return {
      top: `${top}rem`,
      height: `${height}rem`
    };
  };

  // Helper function to render task items
  const renderTaskItem = (task) => (
    <div className="task-item" key={task.id} data-testid="task-item">
      <div className="task-main">
        <div className="task-title">{task.title}</div>
        <div className="task-chevron">›</div>
      </div>
      
      <div className="task-details">
        {task.date && (
          <div className="task-date">
            <span className="calendar-icon">📅</span>
            <span>{task.date}</span>
          </div>
        )}
        
        {task.list && (
          <div className="task-list">
            <span className="list-badge list1">{task.list}</span>
          </div>
        )}
        
        {task.bookmarks > 0 && (
          <div className="task-bookmarks">
            <span>{task.bookmarks} Bookmark{task.bookmarks > 1 ? 's' : ''}</span>
          </div>
        )}
        
        {task.personal && (
          <div className="task-personal">
            <span className="personal-badge">Personal</span>
          </div>
        )}
      </div>
    </div>
  );

  // Sample sticky notes data
  const stickyNotes = [
    {
      id: 1,
      title: 'Social Media',
      content: [
        'Plan social content',
        'Build content calendar',
        'Plan promotion and distribution'
      ],
      color: 'yellow'
    },
    {
      id: 2,
      title: 'Content Strategy',
      content: [
        'Would need time to get insights (goals, personas, budget, audits), but after, it would be good to focus on assembling my team (start with SEO specialist, then perhaps an email marketer?). Also need to brainstorm on tooling...'
      ],
      color: 'blue'
    },
    {
      id: 3,
      title: 'Email A/B Tests',
      content: [
        'Subject lines',
        'Sender',
        'CTA',
        'Sending times'
      ],
      color: 'pink'
    },
    {
      id: 4,
      title: 'Banner Ads',
      content: [
        'Notes from the workshop:',
        'Sizing matters',
        'Choose distinctive imagery',
        'The landing page must match the display ad'
      ],
      color: 'yellow'
    }
  ];

  // Sample work tasks
  const workTasks = [
    { 
      id: 1, 
      title: 'Research content ideas',
      list: 'Work',
      date: null,
      bookmarks: 0
    },
    { 
      id: 2, 
      title: 'Create a database of guest authors',
      list: 'Work',
      date: null,
      bookmarks: 0
    },
    { 
      id: 3, 
      title: 'Create job posting for SEO specialist',
      list: 'Work',
      date: '21-05-22',
      bookmarks: 1,
      tags: ['Sidekicks', 'Work']
    },
    { 
      id: 4, 
      title: 'Request design assets for landing page',
      list: 'Work',
      date: null,
      bookmarks: 0
    },
    { 
      id: 5, 
      title: 'Prepare collaboration proposals for Sales catchup',
      list: 'Work',
      date: null,
      bookmarks: 0
    },
    { 
      id: 6, 
      title: 'Adopt a link tracker tool',
      list: 'Work',
      date: null,
      bookmarks: 0
    }
  ];

  return (
    <div className="dashboard-container" data-testid="dashboard-container">
      {/* Left Sidebar */}
      <div className="sidebar" data-testid="sidebar">
        <div className="sidebar-header">
          <h2>Menu</h2>
          <div className="menu-icon">
            <div className="menu-line"></div>
            <div className="menu-line"></div>
            <div className="menu-line"></div>
          </div>
        </div>

        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search" data-testid="search-input" />
        </div>

        <div className="sidebar-section">
          <h3>TASKS</h3>
          <ul className="sidebar-list">
            <li 
              className={`sidebar-item ${activeView === 'Upcoming' ? 'active' : ''}`} 
              onClick={() => setActiveView('Upcoming')}
              data-testid="upcoming-nav"
            >
              <span className="icon">⚡</span>
              <span>Upcoming</span>
              <span className="count">12</span>
            </li>
            <li 
              className={`sidebar-item ${activeView === 'Today' ? 'active' : ''}`}
              onClick={() => setActiveView('Today')} 
              data-testid="today-nav"
            >
              <span className="icon">☑️</span>
              <span>Today</span>
              <span className="count">5</span>
            </li>
            <li 
              className={`sidebar-item ${activeView === 'Calendar' ? 'active' : ''}`}
              onClick={() => setActiveView('Calendar')}
              data-testid="calendar-nav"
            >
              <span className="icon">📅</span>
              <span>Calendar</span>
            </li>
            <li 
              className={`sidebar-item ${activeView === 'StickyWall' ? 'active' : ''}`}
              onClick={() => setActiveView('StickyWall')}
              data-testid="sticky-wall-nav"
            >
              <span className="icon">📌</span>
              <span>Sticky Wall</span>
            </li>
          </ul>
        </div>

        <div className="sidebar-section">
          <h3>LISTS</h3>
          <ul className="sidebar-list">
            <li className="sidebar-item">
              <span className="list-color personal" data-testid="list-color-personal"></span>
              <span>Personal</span>
              <span className="count">3</span>
            </li>
            <li 
              className={`sidebar-item ${activeView === 'Work' ? 'active' : ''}`}
              onClick={() => setActiveView('Work')}
            >
              <span className="list-color work" data-testid="list-color-work"></span>
              <span>Work</span>
              <span className="count">6</span>
            </li>
            <li className="sidebar-item">
              <span className="list-color list1" data-testid="list-color-list1"></span>
              <span>List 1</span>
              <span className="count">2</span>
            </li>
            <li className="sidebar-item add-new">
              <span className="icon">+</span>
              <span>Add New List</span>
            </li>
          </ul>
        </div>

        <div className="sidebar-section">
          <h3>TAGS</h3>
          <div className="tags-container">
            <span className="tag">Tag 1</span>
            <span className="tag">Tag 2</span>
            <span className="tag add-tag">+ Add Tag</span>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-item">
            <span className="icon">⚙️</span>
            <span>Settings</span>
          </div>
          <div className="sidebar-item">
            <span className="icon">↪️</span>
            <span>Sign out</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content" data-testid="main-content">
        {/* Work View */}
        {activeView === 'Work' && (
          <>
            <div className="main-header">
              <h1>Work <span className="task-count">6</span></h1>
            </div>

            <div className="add-task">
              <span className="add-icon">+</span>
              <span>Add New Task</span>
            </div>

            <div className="tasks-list">
              {workTasks.map(task => (
                <div className="task-item" key={task.id}>
                  <div className="task-main">
                    <div className="task-title">{task.title}</div>
                    <div className="task-chevron">›</div>
                  </div>
                  <div className="task-details">
                    {task.date && (
                      <div className="task-date">
                        <span className="calendar-icon">📅</span>
                        <span>{task.date}</span>
                      </div>
                    )}
                    {task.tags && task.tags.map((tag, index) => (
                      <div key={index} className="task-tag">{tag}</div>
                    ))}
                    {task.bookmarks > 0 && (
                      <div className="task-bookmarks">
                        <span>{task.bookmarks} Bookmark{task.bookmarks > 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Today View */}
        {activeView === 'Today' && (
          <>
            <div className="main-header">
              <h1>Today <span className="task-count">5</span></h1>
            </div>

            <div className="add-task">
              <span className="add-icon">+</span>
              <span>Add New Task</span>
            </div>

            <div className="tasks-list" data-testid="today-tasks-list">
              {todayTasks.map(task => renderTaskItem(task))}
            </div>
          </>
        )}

        {/* Upcoming View */}
        {activeView === 'Upcoming' && (
          <>
            <div className="main-header">
              <h1>Upcoming <span className="task-count">12</span></h1>
            </div>

            {/* Today Section */}
            <div className="section" data-testid="upcoming-today-section">
              <h2 className="section-title">Today</h2>
              
              <div className="add-task">
                <span className="add-icon">+</span>
                <span>Add New Task</span>
              </div>
              
              <div className="tasks-list">
                {todayTasks.map(task => renderTaskItem(task))}
              </div>
            </div>

            {/* Tomorrow Section */}
            <div className="section" data-testid="upcoming-tomorrow-section">
              <h2 className="section-title">Tomorrow</h2>
              
              <div className="add-task">
                <span className="add-icon">+</span>
                <span>Add New Task</span>
              </div>
              
              <div className="tasks-list">
                {tomorrowTasks.map(task => renderTaskItem(task))}
              </div>
            </div>

            {/* This Week Section */}
            <div className="section" data-testid="upcoming-thisweek-section">
              <h2 className="section-title">This Week</h2>
              
              <div className="add-task">
                <span className="add-icon">+</span>
                <span>Add New Task</span>
              </div>
              
              <div className="tasks-list">
                {thisWeekTasks.map(task => renderTaskItem(task))}
              </div>
            </div>
          </>
        )}

        {/* Calendar View */}
        {activeView === 'Calendar' && (
          <div className="calendar-view">
            <div className="calendar-header">
              <div className="calendar-date">{formatDate(currentDate)}</div>
              <div className="calendar-nav">
                <div className="view-options">
                  <button 
                    className={`view-option ${calendarView === 'Day' ? 'active' : ''}`}
                    onClick={() => setCalendarView('Day')}
                  >
                    Day
                  </button>
                  <button 
                    className={`view-option ${calendarView === 'Week' ? 'active' : ''}`}
                    onClick={() => setCalendarView('Week')}
                  >
                    Week
                  </button>
                  <button 
                    className={`view-option ${calendarView === 'Month' ? 'active' : ''}`}
                    onClick={() => setCalendarView('Month')}
                  >
                    Month
                  </button>
                </div>
                <button className="calendar-nav-button" onClick={() => setCurrentDate(prev => {
                  const newDate = new Date(prev);
                  newDate.setDate(prev.getDate() - 1);
                  return newDate;
                })}>
                  ←
                </button>
                <button className="calendar-nav-button" onClick={() => setCurrentDate(prev => {
                  const newDate = new Date(prev);
                  newDate.setDate(prev.getDate() + 1);
                  return newDate;
                })}>
                  →
                </button>
                <button className="add-event-button">
                  Add Event
                </button>
              </div>
            </div>

            <div className="calendar-grid">
              {calendarView === 'Week' ? (
                <div className="week-view">
                  <div className="week-header">
                    {weekDays.map(day => (
                      <div key={day} className="day-header">{day}</div>
                    ))}
                  </div>
                  <div className="week-body">
                    <div className="time-labels">
                      {timeSlots.map(time => (
                        <div key={time} className="time-label">{time}</div>
                      ))}
                    </div>
                    <div className="week-grid">
                      {weekDays.map(day => (
                        <div key={day} className="day-column">
                          {timeSlots.map(time => (
                            <div key={`${day}-${time}`} className="time-cell" />
                          ))}
                          {calendarEvents
                            .filter(event => event.day === day)
                            .map(event => (
                              <div
                                key={event.id}
                                className={`event ${event.type}`}
                                style={getEventStyle(event.time, event.duration)}
                              >
                                {event.title}
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : calendarView === 'Month' ? (
                <div className="month-view">
                  <div className="month-header">
                    {weekDays.map(day => (
                      <div key={day} className="month-day-header">{day}</div>
                    ))}
                  </div>
                  <div className="month-grid">
                    {getDaysInMonth(currentDate).map((day, index) => (
                      <div 
                        key={index} 
                        className={`month-day ${!day.currentMonth ? 'other-month' : ''}`}
                      >
                        <div className="day-number">{day.day}</div>
                        <div className="day-events">
                          {calendarEvents
                            .filter(event => {
                              const eventDate = new Date(currentDate);
                              eventDate.setDate(day.day);
                              return event.day === weekDays[index % 7];
                            })
                            .slice(0, 3) // Show max 3 events per day
                            .map(event => (
                              <div 
                                key={event.id} 
                                className={`month-event ${event.type}`}
                                title={`${event.title} - ${event.time}`}
                              >
                                {event.title}
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="time-slots">
                  {timeSlots.map(time => (
                    <div key={time} className="time-slot">
                      <div className="time-label">{time}</div>
                      <div className="events-container">
                        {calendarEvents
                          .filter(event => event.time.startsWith(time.split(':')[0]))
                          .map(event => (
                            <div
                              key={event.id}
                              className={`event ${event.type}`}
                              style={getEventStyle(event.time, event.duration)}
                            >
                              {event.title}
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sticky Wall View */}
        {activeView === 'StickyWall' && (
          <>
            <div className="main-header">
              <h1>Sticky Wall</h1>
            </div>
            <div className="sticky-wall">
              {stickyNotes.map(note => (
                <div key={note.id} className={`sticky-note ${note.color}`}>
                  <div className="sticky-note-title">{note.title}</div>
                  <div className="sticky-note-content">
                    <ul className="sticky-note-list">
                      {note.content.map((item, index) => (
                        <li key={index} className="sticky-note-item">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              <div className="add-note">
                <span className="add-note-icon">+</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;