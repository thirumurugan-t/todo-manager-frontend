import React, { useContext } from 'react';
import '../styles/Todoform.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Mycontext } from './TodoApp';
import axios from 'axios';

function Todoform({ show, setopenform, todovalues, settodovalues }) {
  const { setTodos } = useContext(Mycontext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!todovalues.title || !todovalues.priority || !todovalues.deadline) {
      alert('Please fill in Title, Priority, and Deadline!');
      return;
    }
    if(todovalues.id){
      try {
        await axios.put(`${process.env.REACT_APP_API_URL}/todos/updatetodo`, todovalues);
        setopenform(false); 
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/todos`);
        setTodos(response.data);
  
        settodovalues({
          checked: false,
          title: '',
          priority: '',
          deadline: '',
          comments: '',
        });
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    }
    else{
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/todos/posttodo`, todovalues);
      setopenform(false); 
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/todos`);
      setTodos(response.data);
  
      settodovalues({
        checked: false,
        title: '',
        priority: '',
        deadline: '',
        comments: '',
      });
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };
}

 

  return (
    <div className={`overlay ${show ? '' : 'hide'}`}>
      <div className="insideform">
        <FontAwesomeIcon
          icon={faXmark}
          className="xmark"
          onClick={() => setopenform(false)}
          role="button"
          aria-label="Close form"
        />

        <form>
          <div className="title">
            <label htmlFor="task-title">
              <h3>Title</h3>
            </label>
            <input
              id="task-title"
              aria-label="Task title"
              placeholder="Add a task to the title"
              className="input"
              type="text"
              name='title'
              value={todovalues.title}
              onChange={(e) => settodovalues({ ...todovalues, title: e.target.value })}
              required
            />
          </div>

          <div className="select">
            <span>
              <label htmlFor="priority">
                <h3>Priority</h3>
              </label>
              <select
                id="priority"
                aria-label="Select priority"
                className="input2"
                value={todovalues.priority}
                name='priority'
                onChange={(e) => settodovalues({ ...todovalues, priority: e.target.value })}
                required
              >
                <option value="">Select...</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </span>

            <span>
              <label htmlFor="deadline">
                <h3>Deadline</h3>
              </label>
              <input
                type="date"
                id="deadline"
                aria-label="Select deadline"
                name='deadline'
                className="input2"
                value={todovalues.deadline}
                onChange={(e) => settodovalues({ ...todovalues, deadline: e.target.value })}
                required
              />
            </span>
          </div>

          <div className="comments">
            <label htmlFor="comments">
              <h3>Comments</h3>
            </label>
            <textarea
              id="comments"
              aria-label="Additional comments"
              className="textarea"
              name='comments'
              value={todovalues.comments}
              onChange={(e) => settodovalues({ ...todovalues, comments: e.target.value })}
              placeholder="Optional"
            />
          </div>

          <div className="button">
            <button type="submit" className="buttonz" onClick={handleSubmit}>
              {todovalues.id? 'Save Changes' : 'Add Task'}
            </button>
            <button
              type="button"
              className="buttonz"
              onClick={() => setopenform(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Todoform;
