import { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { useUserStore } from '../../hooks';
import { JoinRoom } from '../../ui';

export const Welcome = () => {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    if (!user.name) {
      Swal.fire({
        title: 'Ingresa tu nombre',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: (userName) => {
          const user = {
            'userId': uuidv4(),
            'name': userName
          };
  
          setUser(user);
        }
      });
    }
  }, [])

  return (
    <main className="container">
      <div className="col-12">
        <h1 className="text-center">Bienvenido {user.name}</h1>
      </div>

      <JoinRoom />

    </main>
  )
}
