import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../../stateManager/actions/profileAction';
import { connect } from 'react-redux';

const Education = ({ education, deleteEducation }) => {
  const createRow = () => {
    return education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td className='hide-sm'>{edu.degree}</td>
        <td className='hide-sm'>
          <Moment format='D MMM YYYY' date={edu.from} /> -{' '}
          {edu.to ? <Moment format='D MMM YYYY' date={edu.to} /> : 'Current'}
        </td>
        <td>
          <button
            onClick={() => deleteEducation(edu._id)}
            className='btn btn-danger'
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };
  return (
    <>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{createRow()}</tbody>
      </table>
    </>
  );
};

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
