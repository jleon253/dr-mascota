import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import './Cita.css'

const Cita = ({ cita, eliminarCita }) => {
	return (
		<Fragment>
			<div id={ cita.id } className='card mb-2'>
				<h5 className='card-header'><b>Mascota:</b> <span className="font-weight-normal">{ cita.mascota }</span></h5>
				<div className='card-body'>
					<p className='card-text'> <b>Fecha:</b> { cita.fecha }</p>
					<p className='card-text'> <b>Hora:</b> { cita.hora } </p>
					<p className='card-text'> <b>Propietario:</b> { cita.propietario } </p>
					<p className='card-text'> <b>Sintomas:</b> { cita.sintomas } </p>
					<button className='btn btn-danger d-block mx-auto text-uppercase' onClick={() => eliminarCita(cita.id)}>
						Quita esta cita
					</button>
				</div>
			</div>
		</Fragment>
	)
}

Cita.propTypes = {
  cita: PropTypes.object.isRequired,
  eliminarCita: PropTypes.func.isRequired
}

export default Cita
