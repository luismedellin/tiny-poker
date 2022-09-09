import { NavLink, useNavigate } from 'react-router-dom';
import { Formik } from "formik";
import * as yup from 'yup';

const schema = yup.object().shape({
  roomId: yup.string()
          .required('Ingrese el nombre de una sala')
          .min(2, 'Ingrese al menos 2 caracteres')
});

export const JoinRoom = () => {
  const navigate = useNavigate();
  
  return (
    <Formik
            initialValues={{ roomId: 'abc1' }}
            validationSchema={ schema }
            onSubmit={async(values) => {
              navigate(`/rooms/${values.roomId}`);
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
                <div className="card mx-auto" style={{'width':'250px'}}>
                    <h5 className="card-header text-center">Rooms</h5>
                    <div className="card-body">
                        <h5 className="card-title">Unete a una sala</h5>

                        <div className=" mb-2">
                          <label htmlFor="roomId" className="form-label">Ingresa el código de la sala para unirte</label>
                          <input
                            type="text"
                            name="roomId"
                            className="form-control mb-2"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.roomId}
                          />
                          <span className="text-danger">
                            { errors.roomId && touched.roomId && errors.roomId }
                          </span>
                        </div>

                        <div className="d-flex justify-content-between">
                            <button 
                              className="btn btn-primary"
                              type="submit">Unirse</button>
                            <NavLink
                                className="btn btn-secondary"
                                to="rooms/new">
                                Crear una sala
                            </NavLink>
                        </div>
                    </div>
                </div>
              </form>
            )}
          </Formik>
  )
}
