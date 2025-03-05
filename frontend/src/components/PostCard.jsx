import {Card, Button, Badge} from 'react-bootstrap';

const PostCard = ({post}) => {
    const authorName = post.author ? `${post.author.firstName} ${post.author.lastName}` : 'Author Sconosciuto';

    return (
        <Card className='mb-4'>
            <Card.Body>
                <Card.Title> {post.title} </Card.Title>
                <Card.Text> {post.content} </Card.Text>
                <Button variant="primary">Leggi</Button>
                <Badge bg="secondary" className="ms-2">{authorName}</Badge>
            </Card.Body>
        </Card>
    );
}

export default PostCard;