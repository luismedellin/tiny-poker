import { NavLink } from "react-router-dom"

export const JoinRoom = () => {
  return (
    <div className="card mx-auto" style={{'width':'250px'}}>
        <h5 className="card-header text-center">Rooms</h5>
        <div className="card-body">
            <h5 className="card-title">Unete a una sala</h5>
            <p className="card-text">Ingresa el código de la sala para unirte</p>
            <input className="form-control mb-2" />
            <div className="d-flex justify-content-between">
                <button className="btn btn-primary">Unirse</button>
                <NavLink
                    className="btn btn-secondary"
                    to="rooms/new">
                    Crear una sala
                </NavLink>
            </div>
        </div>
    </div>
  )
}
