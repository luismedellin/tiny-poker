import { useRoomStore } from "../../hooks"

export const RoomsPage = () => {
  const { counter, addCounter } = useRoomStore();

  return (
    <div>
      <h1>Counter: { counter }</h1>
      <button
        className="btn btn-primary"
        onClick={ addCounter }
      >
        +1
      </button>
    </div>
  )
}
