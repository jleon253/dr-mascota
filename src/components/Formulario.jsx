import React, { Fragment, useState } from 'react'
import shortid from 'shortid'
import PropTypes from 'prop-types'

const Formulario = ({ crearCita }) => {
	// State de citas
	const [cita, actualizarCita] = useState({
		mascota: '',
		propietario: '',
		fecha: '',
		hora: '',
		sintomas: '',
	})

	const [error, actualizarError] = useState(false)

	// Función ejecutada cuando se teclee en los input's del Form
	const actualizarState = (event) => {
		actualizarCita({
			...cita, // Ayuda a persistir los demas valores del objeto
			[event.target.name]: event.target.value, // Nombre de la propiedad : Valor ingresado en el input
		})
	}

	// Extraer valores
	const { mascota, propietario, fecha, hora, sintomas } = cita

	// Agregar la cita
	const agregarCita = (event) => {
		event.preventDefault() // Previene la acción del Submit de JS (Refrescar y enviar por URL los parametros)
		// Validar
		if (
			mascota.trim() === '' ||
			propietario.trim() === '' ||
			fecha.trim() === '' ||
			hora.trim() === '' ||
			sintomas.trim() === ''
		) {
			actualizarError(true)
			document.getElementById('myForm').classList.add('was-validated')
			return
		}
		actualizarError(false)
		document.getElementById('myForm').classList.remove('was-validated')
		//Generar ID
		cita.id = shortid.generate() // Genera id aleatorio, gracias a 'shortid' (by npm)
		// Agregar Cita
		crearCita(cita)
		// Reiniciar Form
		actualizarCita({
			mascota: '',
			propietario: '',
			fecha: '',
			hora: '',
			sintomas: '',
    })
    setTimeout(() => {
      window.location.href = `#${cita.id}`;
      document.getElementById(`${cita.id}`).classList.add('nuevaCita');
    }, 200);
	}

  const fechaActual = () => {
    const year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  }

  const horaDefault = () => {
    if(cita.fecha) {
      if(cita.fecha === fechaActual()) {
        return `${new Date().getHours()}:${new Date().getMinutes()}`;
      } else {
        return `08:00`;
      }
    }
    return;
  }

	return (
		<Fragment>
			<h3 className="font-weight-bold text-success text-center">Crea una cita nueva:</h3>
			<hr />
			{error ? (
				<div className='alert alert-danger' role='alert'>
					Todos los campos son obligatorios
				</div>
			) : null}
			<form id='myForm' onSubmit={agregarCita} noValidate>
				<div className='form-group'>
					<label>Nombre mascota:</label>
					<input
						type='text'
						name='mascota'
						value={mascota}
						className='form-control'
						placeholder='firulais'
						onChange={actualizarState}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Nombre propietario:</label>
					<input
						type='text'
						name='propietario'
						value={propietario}
						className='form-control'
						placeholder='Jhon Doe'
						onChange={actualizarState}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Fecha:</label>
					<input
						type='date'
						name='fecha'
            value={fecha}
            min={fechaActual()}
						className='form-control'
						onChange={actualizarState}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Hora:</label>
					<input
						type='time'
						name='hora'
            value={hora}
            min={horaDefault()}
            max="21:00"
						className='form-control'
						onChange={actualizarState}
						required
					/>
				</div>
				<div className='form-group'>
					<label>Sintomas:</label>
					<textarea
						name='sintomas'
						value={sintomas}
						className='form-control'
						onChange={actualizarState}
						required
					></textarea>
				</div>
				<button
					type='submit'
					className='btn btn-success btn-block text-uppercase font-weight-bold'
				>
					Agrega esta cita
				</button>
			</form>
		</Fragment>
	)
}

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default Formulario
