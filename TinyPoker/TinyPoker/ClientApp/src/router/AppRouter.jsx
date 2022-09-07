import { Route, Routes } from 'react-router-dom';
import { Welcome } from '../home';
import { RoomsPage } from '../room';

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="rooms" element={ <RoomsPage /> } />
        <Route path="*" element={ <Welcome /> } />
    </Routes>
  )
}
