import React from 'react';
import { Link } from 'react-router-dom';

export default function SeismicDataView(props) {
  function handleMagTypeChange(event) {
    const value = event.target.value;
    if (event.target.checked) {
      props.setSelectedMagTypes(prevMagTypes => {
        const newMagTypes = [...prevMagTypes, value];
        localStorage.setItem('selectedMagTypes', JSON.stringify(newMagTypes));
        return newMagTypes;
      });
    } else {
      props.setSelectedMagTypes(prevMagTypes => {
        const newMagTypes = prevMagTypes.filter(magType => magType !== value);
        localStorage.setItem('selectedMagTypes', JSON.stringify(newMagTypes));
        return newMagTypes;
      });
    }
  }

  function handlePageChange(event) {
    props.setCurrentPage(Number(event.target.value));
  }

  return (
    <div>
      <h2>Seismic Data</h2>
      {/* mag_type filter */}
      <div onChange={handleMagTypeChange}>
        <label>
          <input type="checkbox" value="md" checked={JSON.parse(localStorage.getItem('selectedMagTypes') || '[]').includes('md')} /> md
        </label>
        <label>
          <input type="checkbox" value="ml" checked={JSON.parse(localStorage.getItem('selectedMagTypes') || '[]').includes('ml')} /> ml
        </label>
        <label>
          <input type="checkbox" value="ms" checked={JSON.parse(localStorage.getItem('selectedMagTypes') || '[]').includes('ms')} /> ms
        </label>
        <label>
          <input type="checkbox" value="mw" checked={JSON.parse(localStorage.getItem('selectedMagTypes') || '[]').includes('mw')} /> mw
        </label>
        <label>
          <input type="checkbox" value="me" checked={JSON.parse(localStorage.getItem('selectedMagTypes') || '[]').includes('me')} /> me
        </label>
        <label>
          <input type="checkbox" value="mi" checked={JSON.parse(localStorage.getItem('selectedMagTypes') || '[]').includes('mi')} /> mi
        </label>
        <label>
          <input type="checkbox" value="mb" checked={JSON.parse(localStorage.getItem('selectedMagTypes') || '[]').includes('mb')} /> mb
        </label>
        <label>
          <input type="checkbox" value="mlg" checked={JSON.parse(localStorage.getItem('selectedMagTypes') || '[]').includes('mlg')} /> mlg
        </label>
      </div>
      {/* page selector */}
      <select onChange={handlePageChange}>
        <option value={1}>Page 1</option>
        <option value={2}>Page 2</option>
        <option value={3}>Page 3</option>
        {/* Add more options as needed */}
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
