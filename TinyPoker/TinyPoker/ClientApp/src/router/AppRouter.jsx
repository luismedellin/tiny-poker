import { Route, Routes } from 'react-router-dom';
import { Welcome } from '../home';
import { useUserStore } from '../hooks';
import { RoomRoutes } from '../room';

export const AppRouter = () => {

  const { user } = useUserStore();

  return (
    <Routes>
        {
          user.name && <Route path="/rooms/*" element={ <RoomRoutes /> } />
        }
        
        <Route path="*" element={ <Welcome /> } />
    </Routes>
  )
}
