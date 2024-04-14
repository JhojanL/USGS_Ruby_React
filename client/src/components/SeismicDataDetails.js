import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';

export default function SeismicDetailView(props) {
  const { id } = useParams();
  const feature = props.data.find(feature => feature.id === Number(id));

  if (!feature) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>{feature.feature_attributes.title}</Card.Title>
          <ListGroup variant="flush">
          <ListGroup.Item><strong>Place:</strong> {feature.feature_attributes.place}</ListGroup.Item>
          <ListGroup.Item><strong>Time:</strong> {new Date(feature.feature_attributes.time).toLocaleString()}</ListGroup.Item>
          <ListGroup.Item><strong>Magnitude:</strong> {feature.feature_attributes.magnitude}</ListGroup.Item>
          <ListGroup.Item><strong>Mag Type:</strong> {feature.feature_attributes.mag_type}</ListGroup.Item>
          <ListGroup.Item><strong>Tsunami:</strong> {feature.feature_attributes.tsunami ? 'Si' : 'No'}</ListGroup.Item>
          <ListGroup.Item><strong>Longitude:</strong> {feature.feature_attributes.coordinates.longitude}</ListGroup.Item>
          <ListGroup.Item><strong>Latitude:</strong> {feature.feature_attributes.coordinates.latitude}</ListGroup.Item>
        </ListGroup>
          <Button variant="primary" href={feature.links.external_url} className="mt-3">Link to USGS</Button>
        </Card.Body>
      </Card>
      {/* Implementa la sección de comentarios aquí */}
    </Container>
  );
}