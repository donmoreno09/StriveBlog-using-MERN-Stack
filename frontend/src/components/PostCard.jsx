import {Card, Button, Badge} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PostCard = ({post}) => {
    const authorName = post.author ? `${post.author.firstName} ${post.author.lastName}` : 'Author Sconosciuto';
    const readTimeText = post.readTime ? `${post.readTime.value} ${post.readTime.unit}` : 'Tempo di lettura non disponibile';
    const navigate = useNavigate();


    return (
        <Card className='mb-4 h-100 shadow-sm' onClick={() => navigate(`/posts/${post._id}`)} style={{cursor:'pointer'}}>
                <Card.Img variant='top' src={post.cover} style={{maxHeight:"200px", objectFit:"cover"}} />
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <Badge bg="secondary">{post.category}</Badge>
                    <small className="text-muted">{readTimeText}</small>
                </div>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content?.substring(0,30)}...</Card.Text>
                <Badge bg="secondary" className="ms-2">{authorName}</Badge>
            </Card.Body>
        </Card>
    );
}

export default PostCard;