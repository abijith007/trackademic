import React, { useState } from 'react';
import NavBar from '../common-components/NavBar/NavBar';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { XCircleFill } from 'react-bootstrap-icons';
import loginService from '../../services/loginService';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const [email, setEmail] = useState('');
  const [showLoginError, setShowLoginError] = useState(false)
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {    
    event.preventDefault();
    const email = event.target[0].value.trim();
    const password = event.target[1].value.trim();    
    const loginSuccess = await loginService(email, password, dispatch);      
    setShowLoginError(!loginSuccess);    
    if (loginSuccess) {
      navigate('/dashboard');
    }
  };
  

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <>
      <NavBar />
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "90vh" }}>
        <Row style={{ width: '40%' }}>
          <Col className="my-auto mx-auto">
            {showLoginError&&<h6 className='text-danger text-center mb-2'><XCircleFill size={20} className="me-2 my-auto"/>Username or Password is incorrect</h6>}
            <Card style={{ width: '100%' }}>
              <Card.Body>
                <h2 className="text-center mb-4">Login</h2>
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100 mb-1">
                    Login
                  </Button>
                  <Button onClick={goToSignup} variant="secondary" className="w-100">
                    Signup
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>       
      </Container>      
    </>
  );
}

export default Login;
