import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useRoomStore } from '../../hooks';

const schema = yup.object().shape({
  name: yup.string()
          .required('Ingrese el nombre de una sala')
          .min(2, 'Ingrese al menos 2 caracteres')
});

export const NewRoomPage = () => {
  const navigate = useNavigate();
  const { createRoom } = useRoomStore();

  return (
    <main className="container d-flex justify-content-center align-items-center" style={{minHeight: '80vh'}}>

      <div className="card mx-auto" style={{'width':'250px'}}>
        <h5 className="card-header text-center">Crear nueva Sala</h5>
        <div className="card-body">

          <Formik
            initialValues={{ name: '' }}
            validationSchema={ schema }
            onSubmit={(values, { setSubmitting }) => {
              console.log(JSON.stringify(values, null, 2))

              setTimeout(async() => {
                debugger;
                const newRoom = await createRoom(values);
                navigate(`/rooms/${newRoom.roomId}`);
              }, 100);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Ingresa el nombre de una sala</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control mb-2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <span className="text-danger">
                    { errors.name && touched.name && errors.name }
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary">Crear</button>
                  <NavLink
                        className="btn btn-secondary"
                        to="/">
                        Cancelar
                    </NavLink>
                </div>
              </form>
            )}
          </Formik>

        </div>
    </div>
    </main>
  )
}
