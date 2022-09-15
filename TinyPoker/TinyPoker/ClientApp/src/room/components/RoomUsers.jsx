import { useUserStore } from '../../hooks';

export const RoomUsers = ({users, sendMessage}) => {

    const { user } = useUserStore();
    
    return (
        <div className="card" style={{width: "20rem"}}>
            <h5 className="card-header text-center bg-primary text-white">{user.name} - Users</h5>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    Players:
                </li>
                {
                    users.map(user => (
                        <li key={user.user} className="list-group-item"
                            onClick={()=> sendMessage(user.userId, 'hola')}>
                            {user.userName} 
                            {/* <span className="badge bg-primary rounded-pill mb-2">14</span> */}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
