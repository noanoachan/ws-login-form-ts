import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/Login.css';

/**
 * @brief     ログインフォーム画面
 * @returns   コンポーネント
 */
const LoginForm: React.FC = () => {
  const [userInfo, setUserInfo] = useState<{username: string; password: string;}>( {
    username: '',
    password: ''
  });

  /**
   * @brief     'username'及び 'passwprd'変更ハンドラ
   * @param {*} e イベント
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo( {
      ...userInfo,
      [name]: value
    });
  };


  /**
   * @brief     ログインボタン押下ハンドラ
   * @param {*} e イベント
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /**
     * --------------------------------------------------------------------------------------------------------------
     * Encryption of user information
     * --------------------------------------------------------------------------------------------------------------
     */
    const encryptedUserInfo: {
      username: string | undefined;
      password: string | undefined;
    } = {
      username: undefined,
      password: undefined
    }

    const encryptionUserKey: string | undefined = process.env.REACT_APP_ENCRYPTION_USER;
    const encryptionPassKey: string | undefined = process.env.REACT_APP_ENCRYPTION_PASS;

    encryptedUserInfo.username = CryptoJS.AES.encrypt(userInfo.username, (encryptionUserKey as string)).toString();
    encryptedUserInfo.password = CryptoJS.AES.encrypt(userInfo.password, (encryptionPassKey as string)).toString();
    /**
     * --------------------------------------------------------------------------------------------------------------
     */

    axios.post('http://localhost:5000/api/auth/login', encryptedUserInfo, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        if (res.data.status === 200) {
          // OK
        }
        else {
          // NG
        }
        console.log(`${res.status}: ${res.headers}`)
      })
      .catch((err) => {
        console.error(`[Error] ${err}`);
      });
  };
  

  return (
    <Container fluid className="d-flex vh-100">
      <Row className="m-auto align-self-center w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <div className="p-4 shadow rounded">
            <h3 className="text-center mb-4">ログイン認証画面</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicUsername" className="mb-3 mt-5">
                <Form.Control 
                  type="text" 
                  name="username" 
                  placeholder="username"
                  value={userInfo.username}
                  onChange={handleChange} 
                  required 
                  autoComplete="username" 
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="mb-3 mt-4">
                <Form.Control 
                  type="password" 
                  name="password"
                  placeholder="password" 
                  value={userInfo.password}
                  onChange={handleChange} 
                  required 
                  autoComplete="current-password" 
                />
              </Form.Group>
              <Button variant="skeleton" type="submit" className="btn btn-outline-info w-100 mt-4">
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
