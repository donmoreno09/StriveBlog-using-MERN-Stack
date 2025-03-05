import {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import PostCard from '../components/PostCard';

const Home = () => {
    const [posts, setPosts] = useState([]); 

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/posts');
                setPosts(response.data); 
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

    return (
        <Container className="mt-5">
            <Row>
                {posts.map(post => ( 
                    <Col key={post.id} md={4}>
                        <PostCard post={post}/>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Home;