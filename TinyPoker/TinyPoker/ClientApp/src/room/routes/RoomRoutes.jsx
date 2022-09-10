import { Route, Routes } from "react-router-dom";
import { RoomPage, RoomsPage, NewRoomPage } from "../";

export const RoomRoutes = () => {
  return (
    <Routes>
        <Route path="/:id" element={ <RoomPage /> } />
        <Route path="/new" element={ <NewRoomPage /> } />
        <Route path="/*" element={ <RoomsPage /> } />
    </Routes>
  )
}
