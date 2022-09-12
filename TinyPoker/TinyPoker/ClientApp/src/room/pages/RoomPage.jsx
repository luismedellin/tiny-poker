import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'react-tabs/style/react-tabs.css';

import { useRoomStore, useUserStore } from '../../hooks';
import { UserHistories } from '../components/UserHistories';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const defaultCards = [
    {
        value: "0",
        isActive: false
    },
    {
        value: "1/2",
        isActive: false
    },
    {
        value: "1",
        isActive: false
    },
    {
        value: "2",
        isActive: false
    },
    {
        value: "3",
        isActive: false
    },
    {
        value: "5",
        isActive: false
    },
    {
        value: "8",
        isActive: false
    },
    {
        value: "13",
        isActive: false
    },
    {
        value: "20",
        isActive: false
    },
    {
        value: "40",
        isActive: false
    },
    {
        value: "100",
        isActive: false
    },
    {
        value: "?",
        isActive: false
    },
    {
        value: "c",
        isActive: false
    },
];

// const users = [
//     {"userId":"75357383-a70c-4632-ba15-7700e89bfa85","name":"Luis"},
//     {"userId":"e6cc6bee-2ec8-47dd-ae4d-544fcb50d461","name":"Mary"}
// ];

export const RoomPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [ cards, setCards ] = useState([...defaultCards])

    const { room, currentUserHistory, getRoom, setUserHistory } = useRoomStore();
    const { user } = useUserStore();
    const [ connection, setConnection ] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchRoom = async() => {
            await getRoom(id);
        }

        fetchRoom().catch(e => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La sala no existe'
            });

            setTimeout(()=> {
                navigate(`/`);
            }, 5000);
        })
    }, [])

    useEffect(() => {

        const joinRoom = async(user, userName, room) => {
            try {
                const connection = new HubConnectionBuilder()
                  .withUrl("https://localhost:7298/chat")
                  .configureLogging(LogLevel.Information)
                  .build();
          
                connection.on("ReceiveMessage", (user, message) => {
                  // setMessages(messages => [...messages, { user, message }]);
                  console.log(user, message)
                });
          
                connection.on("UsersInRoom", (users) => {
                  setUsers(users);
                });
          
                connection.onclose(e => {
                  setConnection();
                  // setMessages([]);
                  setUsers([]);
                });
          
                if (!connection.connection._connectionStarted) await connection.start();
                await connection.invoke("JoinRoom", { user, userName, room });
                setConnection(connection);
              } catch (e) {
                console.log(e);
              }
        }

        if (room.roomId) joinRoom(user.userId, user.name, room.roomId);
    }, [room]);

    const sendMessage = async (message) => {
        const chatMessage = {
            user: user.userId,
            message: message
        };

        try {
            await connection.invoke("SendMessage", message);
        } catch (e) {
            console.log(e);
        }
    }

    const closeConnection = async () => {
        try {
          await connection.stop();
        } catch (e) {
          console.log(e);
        }
      }

    const selectedCard = (index) => {
        const newCards = defaultCards.map((card, i)=> {
            if(i !== index) return card;

            return {
                ...card,
                isActive: !card.isActive
            };
        });
        
        setCards(newCards);
    }

    const selectUserHistory = (userHistory) => {
        setUserHistory(userHistory);
    }

    if (!room.roomId) return <p>Loading...</p>

    return (
        <main className="container animate__animated animate__fadeIn">
            <div>
                <h1>{room.name}</h1>
            </div>

            <div className="d-flex">
            <div>
                <h2>{currentUserHistory?.title}</h2>
                <div className="poker-cards d-flex flex-wrap" disabled={!currentUserHistory}>
                {
                    cards && cards.map((card, index) => (
                        <div
                            key={card.value} 
                            className={`card poker-card col-3 ${card.isActive ? "active" : ""}`}
                            onClick={ e => selectedCard(index) }
                            >
                            { card.value }
                        </div>
                    ))
                }
                </div>

                <div>
                    <UserHistories
                        userHistories={ room.userHistories }
                        onSelectUS = { selectUserHistory }
                        />
                </div>
            </div>

            <div className="card" style={{width: "20rem"}}>
                <h5 className="card-header text-center bg-primary text-white">Users</h5>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        Players:
                    </li>
                    {
                        users.map(user => (
                            <li key={user.user} className="list-group-item"
                                onClick={()=>sendMessage('hola')}>
                                {user.userName} <span className="badge bg-primary rounded-pill mb-2">14</span>
                            </li>
                        ))
                    }
                </ul>
            </div>

            </div>

        </main>
    )
}
