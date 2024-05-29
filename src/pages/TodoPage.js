import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import TodoBoard from "../components/TodoBoard";
import api from "../utils/api";

const TodoPage = ({setUser}) => {

  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState();

  const navigate = useNavigate();

  const getTasks = async() => {
    const response = await api.get('/tasks');
    console.log("taskList: " , response.data.data)
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

  const logOut = () => {
    sessionStorage.clear();
    setUser(undefined);
    navigate('/login');
  };

  useEffect(()=>{
    getTasks();
  }, []);

  return (
    <Container>
      <Row >
        <Col xs={1}>
          Test용 버튼
        </Col>
        <Col xs={1}>
          <p className="login-click" onClick={()=>navigate('/register')}>회원 가입</p>
        </Col>
        <Col xs={1}>
          <p className="login-click" onClick={()=>navigate('/login')}>로그인</p>
        </Col>
        <Col xs={8}/>
        <Col xs={1}>
          <p className="login-click" onClick={()=>logOut()}>로그아웃</p>
        </Col>
      </Row>
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
