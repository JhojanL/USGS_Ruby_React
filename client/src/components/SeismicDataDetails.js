import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, ListGroup, Button, Alert } from 'react-bootstrap';

export default function SeismicDetailView(props) {
  const { id } = useParams();
  const feature = props.data.find(feature => feature.id === Number(id));
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  React.useEffect(() => {
    fetch(`http://127.0.0.1:3000/api/features/${id}/comments`)
      .then(response => response.json())
      .then(data => setComments(data));
  }, [id]);

  function handleSubmit() {
    fetch(`http://127.0.0.1:3000/api/features/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ body: comment })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to save comment');
      }
      return response.json();
    })
    .then(data => {
      setComments(prevComments => [...prevComments, data]);
      setComment('');
      setSuccess('Comment submitted successfully.');
    })
    .catch(error => {
      console.error('Error:', error);
      setError('Please do not submit comments without text.');
    });
  }

  if (!feature) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" onClose={() => setSuccess(null)} dismissible>
          {success}
        </Alert>
      )}
      <Card className="mt-3">
      <Card.Header>{feature.feature_attributes.title}</Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
          <ListGroup.Item><strong>Place:</strong> {feature.feature_attributes.place}</ListGroup.Item>
          <ListGroup.Item><strong>Time:</strong> {new Date(feature.feature_attributes.time).toLocaleString()}</ListGroup.Item>
          <ListGroup.Item><strong>Magnitude:</strong> {feature.feature_attributes.magnitude}</ListGroup.Item>
          <ListGroup.Item><strong>Mag Type:</strong> {feature.feature_attributes.mag_type}</ListGroup.Item>
          <ListGroup.Item><strong>Tsunami:</strong> {feature.feature_attributes.tsunami ? 'Si' : 'No'}</ListGroup.Item>
          <ListGroup.Item><strong>Longitude:</strong> {feature.feature_attributes.coordinates.longitude}</ListGroup.Item>
          <ListGroup.Item><strong>Latitude:</strong> {feature.feature_attributes.coordinates.latitude}</ListGroup.Item>
        </ListGroup>
          <Button variant="light" href={feature.links.external_url} className="mt-3">Link to USGS</Button>
        </Card.Body>
      </Card>
      {/* Comments section */}
      <Card className="mt-3">
        <Card.Header>Leave a comment</Card.Header>
        <Card.Body>
          <Card.Text>
            <textarea className="form-control" rows="3" value={comment} onChange={e => setComment(e.target.value)}></textarea>
          </Card.Text>
          <Button variant="primary" onClick={handleSubmit}>Submit</Button>
        </Card.Body>
      </Card>
      <Card className="mt-3">
        <Card.Header>Comments</Card.Header>
        <ListGroup variant="flush">
          {comments.map((comment, index) => (
            <ListGroup.Item key={index}>
              {comment.body}
              <br />
              <small className="text-muted">Anonymous</small>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
}