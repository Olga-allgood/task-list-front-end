import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ onSubmitTask }) => {
  const [title, setTitle] = useState('');

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title) return;

    const newTaskData = {
      title,
    };

    onSubmitTask(newTaskData);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="new-task-form">
      <label htmlFor="title">New Task:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={handleChange}
        // placeholder="Enter task title"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

NewTaskForm.propTypes = {
  onSubmitTask: PropTypes.func.isRequired,
};

export default NewTaskForm;