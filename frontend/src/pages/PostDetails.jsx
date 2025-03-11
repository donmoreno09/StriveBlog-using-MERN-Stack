import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const PostDetails = () => {
    const[post, setPost] = useState({});
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3001/posts/${id}`);
                setPost(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching post: ', error);
                setError('Errore nel caricamento del post');
                setPost({});
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    return (
        <Container className="mt-5">
            {loading && <p>Caricamento in corso</p>}
            {error && <p className="text-danger"> {error} </p>}
            {post && post._id && (
                <Row>
                    <Col md={8}>
                        <h1> {post.title} </h1>
                        <p> {post.content} </p>
                    </Col>
                    <Col md={4}>
                        <img src={post.cover}  alt={post.title} className="img-fluid" />
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default PostDetails;