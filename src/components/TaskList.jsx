import PropTypes from 'prop-types';
import Task from './Task.jsx';
import './TaskList.css';

const TaskList = ({ tasks, onTaskClickCallback, onTaskDeleteCallback }) => {
  const getTaskListJSX = () => {
    return tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          isComplete={task.isComplete}
          toggleTask={onTaskClickCallback}
          deleteTask={onTaskDeleteCallback}
        />
      ));
    };
  return <ul className="tasks__list no-bullet">{getTaskListJSX()}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onTaskClickCallback: PropTypes.func.isRequired,
  onTaskDeleteCallback: PropTypes.func.isRequired,
};

export default TaskList;
