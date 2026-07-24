// src/pages/teacher/Schedule.jsx
import { useState } from 'react';
import { FiCalendar, FiClock, FiTag, FiPlus, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import styles from './Schedule.module.css';

const SEED_SCHEDULE = [
  { id: 'sc1', title: 'Live Lecture — Physics Mechanics', time: '10:00 AM - 11:30 AM', day: 'Monday', category: 'class' },
  { id: 'sc2', title: 'Evaluation — Math Quiz Submissions', time: '02:00 PM - 03:00 PM', day: 'Tuesday', category: 'grading' },
  { id: 'sc3', title: 'Live Q&A — Chemistry Periodic Table', time: '04:00 PM - 05:00 PM', day: 'Wednesday', category: 'class' },
  { id: 'sc4', title: 'Office Hours — Individual Student Doubts', time: '11:00 AM - 12:00 PM', day: 'Thursday', category: 'meeting' },
];

export default function TeacherSchedule() {
  const [schedule, setSchedule] = useState(SEED_SCHEDULE);
  const [showAdd, setShowAdd] = useState(false);
  const [task, setTask] = useState({ title: '', day: 'Monday', time: '', category: 'class' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!task.title || !task.time) return;

    const added = {
      id: Math.random().toString(),
      title: task.title,
      time: task.time,
      day: task.day,
      category: task.category
    };

    setSchedule(p => [...p, added]);
    toast.success('Schedule task added successfully!');
    setShowAdd(false);
    setTask({ title: '', day: 'Monday', time: '', category: 'class' });
  };

  const handleDelete = (id) => {
    setSchedule(p => p.filter(item => item.id !== id));
    toast.success('Schedule task deleted successfully!');
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1><FiCalendar /> Educator Work Schedule</h1>
          <p className={styles.subtitle}>Plan your interactive lecture timings, office hours, and homework grading deadlines.</p>
        </div>
        <button className={styles.addBtn} onClick={() => setShowAdd(!showAdd)} id="toggle-schedule-form-btn">
          <FiPlus /> {showAdd ? 'Cancel' : 'Add Schedule Item'}
        </button>
      </div>

      <div className={styles.container}>
        {showAdd && (
          <div className={styles.formCard}>
            <h3>Add Schedule Task</h3>
            <form onSubmit={handleAdd}>
              <div className={styles.formGroup}>
                <label>Task / Subject Title</label>
                <input
                  type="text"
                  placeholder="e.g. Physics CQ Assessment Review"
                  value={task.title}
                  onChange={e => setTask(p => ({ ...p, title: e.target.value }))}
                  required
                  id="schedule-title-input"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Day</label>
                <select value={task.day} onChange={e => setTask(p => ({ ...p, day: e.target.value }))} id="schedule-day-select">
                  {daysOfWeek.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Time Slot</label>
                <input
                  type="text"
                  placeholder="e.g. 10:00 AM - 11:30 AM"
                  value={task.time}
                  onChange={e => setTask(p => ({ ...p, time: e.target.value }))}
                  required
                  id="schedule-time-input"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Category</label>
                <select value={task.category} onChange={e => setTask(p => ({ ...p, category: e.target.value }))} id="schedule-cat-select">
                  <option value="class">Live Class Lecture</option>
                  <option value="grading">Grading / Review</option>
                  <option value="meeting">Office Hour Meeting</option>
                </select>
              </div>

              <button type="submit" className={styles.saveBtn} id="save-schedule-item-btn">
                Add Task
              </button>
            </form>
          </div>
        )}

        <div className={styles.calendarCard}>
          <h2>Weekly Planner List</h2>
          <div className={styles.weeksList}>
            {daysOfWeek.map(day => {
              const dayTasks = schedule.filter(item => item.day === day);
              return (
                <div key={day} className={styles.dayGroup}>
                  <h4 className={styles.dayTitle}>{day}</h4>
                  <div className={styles.tasksList}>
                    {dayTasks.length === 0 ? (
                      <p className={styles.emptyDay}>No classes or reminders scheduled.</p>
                    ) : (
                      dayTasks.map(item => (
                        <div key={item.id} className={`${styles.taskCard} ${styles[item.category]}`}>
                          <div className={styles.taskInfo}>
                            <span className={styles.categoryBadge}>{item.category}</span>
                            <h5>{item.title}</h5>
                            <span className={styles.timeVal}><FiClock /> {item.time}</span>
                          </div>
                          <button className={styles.deleteBtn} onClick={() => handleDelete(item.id)} id={`delete-schedule-${item.id}`}>
                            <FiTrash2 />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
