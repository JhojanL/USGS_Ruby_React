import React from 'react';
import { useParams } from 'react-router-dom';

export default function SeismicDetailView(props) {
  const { id } = useParams();
  const feature = props.data.find(feature => feature.id === Number(id));

  if (!feature) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{feature.feature_attributes.title}</h2>
        <p>{feature.feature_attributes.place}</p>
        <p>{new Date(feature.feature_attributes.time).toLocaleString()}</p>
        <p>{feature.feature_attributes.magnitude}</p>
        <a href={feature.links.external_url}>Link to USGS</a>
      {/* Implementa la sección de comentarios aquí */}
    </div>
  );
}