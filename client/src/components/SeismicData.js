import React from 'react'

export default function SeismicData(props) {
  return (
    <div>
        <h2>Seismic Data</h2>
        <ul>
            {props.data && props.data.map((feature, index) => (
            <li key={index}>
                <h3>{feature.feature_attributes.title}</h3>
                <p>{feature.feature_attributes.place}</p>
                <p>{new Date(feature.feature_attributes.time).toLocaleString()}</p>
                <p>{feature.feature_attributes.magnitude}</p>
                <a href={feature.links.external_url}>Link to USGS</a>
            </li>
            ))}
        </ul>
    </div>
  )
}
