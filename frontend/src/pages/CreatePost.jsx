import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';
import {Form, Button, Container, Row, Col, Alert} from 'react-bootstrap';
import axios from 'axios';

const CreatePost = () => {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        cover: "",
        content: "",
        readTime: {
            value: "",
            unit: "minuti"
        }
    });
    const [error, setError] = useState("");
    const {user} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if(!user || !user._id){
                setError("Devi essere autenticato per creare un post!");
                return;
            }

            const postData = {
                ...formData,
                author: user._id,
                readTime: {
                    ...formData.readTime,
                    value: parseInt(formData.readTime.value)
                }
            };

            await axios.post("http://localhost:3001/posts", postData);
            navigate("/");
        } catch (error) {
            console.error('Error details:', {
                message: error.message,
                response: error.response,
                status: error.response?.status
            });
            
            // Gestione più robusta dell'errore
            if (error.response) {
                // Errore del server con risposta
                setError(error.response.data.message || 'Errore del server');
            } else if (error.request) {
                // Errore di rete - nessuna risposta ricevuta
                setError('Errore di connessione al server');
            } else {
                // Altro tipo di errore
                setError('Si è verificato un errore');
            }
        }
    }
    

    return (
        <Container className="mt-4">
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <h2 className="text-center mb-4">Create New Post</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    title: e.target.value
                                })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    category: e.target.value
                                })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Cover Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="cover"
                                value={formData.cover}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    cover: e.target.value
                                })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                name="content"
                                value={formData.content}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    content: e.target.value
                                })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Read Time</Form.Label>
                            <Row>
                                <Col md={6}>
                                    <Form.Control
                                        type="number"
                                        name="readTimeValue"
                                        value={formData.readTime.value}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            readTime: {
                                                ...formData.readTime,
                                                value: e.target.value
                                            }
                                        })}
                                        required
                                    />
                                </Col>
                                <Col md={6}>
                                    <Form.Select
                                        name="readTimeUnit"
                                        value={formData.readTime.unit}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            readTime: {
                                                ...formData.readTime,
                                                unit: e.target.value
                                            }
                                        })}
                                    >
                                        <option value="minuti">Minuti</option>
                                        <option value="ore">Ore</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit">
                                Create Post
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default CreatePost;
