import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import TodoBoard from "../components/TodoBoard";
import api from "../utils/api";

const TodoPage = () => {

  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState();

  const getTasks = async() => {
    const response = await api.get('/tasks');
    setTodoList(response.data.data);
  };

  const addTask = async() => {
    try
    {
      const response = await api.post('/tasks', {task: todoValue, isComplete: false});

      if(await response.status === 200)
      {
        console.log('addTask 성공');
        setTodoValue('');
        getTasks();
      }else
      {
        console.log('addTask 실패');
        throw new Error('task can not be added');
      }
    }
    catch(err)
    {
      console.log("error", err);
    }
  };

  const updateTask = async(id, bool) => {
    console.log('updateTask run');
    try
    {
      const response = await api.put(`/tasks/${id}`, {isComplete: !bool});

      if(await response.status === 200)
      {
        console.log('updateTask 성공');
        getTasks();
      }else
      {
        console.log('updateTask 실패');
        throw new Error('task can not be updated');
      }
    }
    catch(err)
    {
      console.log("error", err);
    }
  };

  const deleteTask = async(id) => {
    try
    {
      const response = await api.delete(`/tasks/${id}`);

      if(await response.status === 200)
      {
        console.log('deleteTask 성공');
        getTasks();
      }else
      {
        console.log('deleteTask 실패');
        throw new Error('task can not be deleted');
      }
    }
    catch(err)
    {
      console.log("error", err);
    }
  }

  useEffect(()=>{
    getTasks();
  }, []);

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(event)=> setTodoValue(event.currentTarget.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>추가</button>
        </Col>
      </Row>

      <TodoBoard todoList={todoList} updateTask={updateTask} deleteTask={deleteTask}/>
    </Container>
  );
};

export default TodoPage;
