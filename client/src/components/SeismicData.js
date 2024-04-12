import React from 'react'
import { Link } from 'react-router-dom';

export default function SeismicDataView(props) {
  return (
    <div>
      <h2>Seismic Data</h2>
      {/* mag_type filter */}
        <select>
            <option value="all">All</option>
            <option value="ml">ml</option>
            <option value="md">md</option>
            <option value="mb">mb</option>
            <option value="mwb">mwb</option>
            <option value="mwr">mwr</option>
            <option value="mww">mww</option>
        </select>
      <ul>
        {props.data && props.data.map((feature, index) => (
          <li key={index}>
            <Link to={`/details/${feature.id}`}>{feature.feature_attributes.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
