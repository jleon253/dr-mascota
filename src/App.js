import React, { Fragment, useState, useEffect } from 'react'
import Formulario from './components/Formulario'
import Cita from './components/Cita'
import './App.css'

function App() {
	let citasIniciales = JSON.parse(localStorage.getItem('citas'))
	if (!citasIniciales) {
		citasIniciales = []
	}

	const [citas, guardarCitas] = useState(citasIniciales)

	useEffect(() => {
		if (citasIniciales) {
			localStorage.setItem('citas', JSON.stringify(citas))
		} else {
			localStorage.setItem('citas', JSON.stringify([]))
		}
	}, [citas, citasIniciales])

	const crearCita = (cita) => guardarCitas([cita, ...citas]) // Agregando y teniendo en cuenta los anteriores

	const eliminarCita = (idCitaEliminar) => {
		const citasActuales = citas.filter((cita) => cita.id !== idCitaEliminar)
		guardarCitas(citasActuales)
	}

	const tituloCitas = citas.length === 0 ? 'No tienes citas' : 'Tu lista de citas'

	return (
		<Fragment>
			<nav className='navbar navbar-dark bg-success'>
				<span className='navbar-brand mb-0 h1'>
					<i className='material-icons mr-2'>pets</i>
					Dr. Mascota - Cita médica
				</span>
			</nav>
			<div className='container-fluid my-5 px-5'>
				<div className='row'>
					<div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-5'>
						<Formulario crearCita={crearCita} />
					</div>
					<div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3'>
						<h3 className="font-weight-bold text-info text-center">{tituloCitas}</h3>
						<hr />
						{citas.map((cita) => {
							return (
								<Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
							)
						})}
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default App
