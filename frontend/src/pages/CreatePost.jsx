import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const CreatePost = () => {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        content: "",
        readTime: {
            value: "1",  // Set default value
            unit: "minuti"
        }
    });
    
    const [coverImage, setCoverImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5000000) { // 5MB limit
                setError("L'immagine non può superare i 5MB");
                return;
            }
            setCoverImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (!user?._id) {
                setError("Devi essere autenticato per creare un post!");
                return;
            }

            const formDataToSend = new FormData();
            formDataToSend.append("title", formData.title.trim());
            formDataToSend.append("category", formData.category.trim());
            formDataToSend.append("cover", coverImage);
            formDataToSend.append("content", formData.content.trim());
            formDataToSend.append("author", user._id);
            
            // Parse readTime value as number and send as JSON string
            const readTimeValue = parseInt(formData.readTime.value);
            if (isNaN(readTimeValue) || readTimeValue < 1) {
                setError("Il tempo di lettura deve essere un numero valido");
                return;
            }

            formDataToSend.append("readTime", JSON.stringify({
                value: readTimeValue.toString(),
                unit: formData.readTime.unit
            }));

            await axios.post("http://localhost:3001/posts", formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            navigate("/");
        } catch (error) {
            console.error('Error details:', error);
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else if (error.response) {
                setError('Errore del server: ' + error.response.status);
            } else if (error.request) {
                setError('Errore di connessione al server');
            } else {
                setError('Si è verificato un errore durante la creazione del post');
            }
        } finally {
            setLoading(false);
        }
    };

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
                            <Form.Label>Cover Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                            />
                            {previewUrl && (
                                <img 
                                    src={previewUrl} 
                                    alt="Preview" 
                                    className="mt-2" 
                                    style={{
                                        maxWidth: '100%',
                                        height: 'auto',
                                        maxHeight: '200px',
                                        objectFit: 'cover'
                                    }}
                                />
                            )}
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
                                        min="1"
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
                            <Button 
                                variant="primary" 
                                type="submit"
                                disabled={loading || !coverImage || !formData.title || !formData.content}
                            >
                                {loading ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className="me-2"
                                        />
                                        Creazione in corso...
                                    </>
                                ) : (
                                    'Create Post'
                                )}
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CreatePost;
