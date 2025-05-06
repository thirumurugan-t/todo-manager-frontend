import React, { useContext, useEffect, useState } from 'react';
import { Mycontext } from './TodoApp';
import '../styles/Todoitem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { format } from 'date-fns';

const Item = ({ todos, setTodos }) => {
  const { EditTodo, filterType } = useContext(Mycontext);
  const [error, setError] = useState(null);

 
  const filteredTodos = todos.filter((todo) => {
    if (!todo.deadline) return false;

    try {
      const formattedDeadline = format(new Date(todo.deadline), 'dd MMM yyyy');
      const todayFormatted = format(new Date(), 'dd MMM yyyy');

      switch (filterType) {
        case 0:
          return formattedDeadline === todayFormatted; // Today
        case 1:
          return formattedDeadline > todayFormatted;   // Pending
        case 2:
          return formattedDeadline < todayFormatted;   // Overdue
        default:
          return true;
      }
    } catch (err) {
      console.error('Invalid date:', todo.deadline);
      return false;
    }
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/todos`);
      setTodos(response.data);
      setError(null);
    } catch (error) {
      setError('Error fetching todos. Please try again later.');
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deletetodo = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/todos/${id}`);
      fetchData();
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error('Delete failed:', err);
    }
  };

  const changecheckbox = async (id, checked) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/todos/change-checkbox?id=${id}&checked=${!checked}`);
      fetchData();
    } catch (err) {
      setError('Failed to update checkbox. Please try again.');
      console.error('Checkbox update failed:', err);
    }
  };

  return (
    <div className="tasks">
      {error && <div className="error-message">{error}</div>}

      {filteredTodos.length === 0 ? (
        <p className="no-todos">No todos available for this filter.</p>
      ) : (
        filteredTodos.map((todo) => (
          <div
            className="taskinside"
            key={todo.id}
            style={{ textDecoration: todo.checked ? 'line-through' : 'none' }}
          >
            <div className="task">
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => changecheckbox(todo.id, todo.checked)}
              />
              <p>{todo.title}</p>
              <p>{format(new Date(todo.deadline), 'dd MMM yyyy')}</p>
              <p>{todo.priority}</p>
              <p>{todo.comments}</p>
              <div className="buttons">
              <FontAwesomeIcon
                icon={faEdit}
                className="editicon"
                onClick={() => EditTodo(todo.id)}
              />
              <FontAwesomeIcon
                icon={faTrash}
                className="trashicon"
                onClick={() => deletetodo(todo.id)}
              />
            </div>
            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default Item;
