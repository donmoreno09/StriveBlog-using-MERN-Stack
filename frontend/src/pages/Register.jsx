import {useState} from 'react';
import {Form, Button, Container, Row, Col, Alert} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName:'',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/users/register', formData);
            login(response.data);
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.message || 'Errore durante la registrazione');
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={6}>
                <h2>Register</h2>
                {error && <Alert variant='danger'> {error}</Alert>}
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;