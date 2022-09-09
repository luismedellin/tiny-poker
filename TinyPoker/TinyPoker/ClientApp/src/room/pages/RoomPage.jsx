import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'react-tabs/style/react-tabs.css';

import { useRoomStore } from '../../hooks';
import { UserHistories } from '../components/UserHistories';

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

const users = [
    {"userId":"75357383-a70c-4632-ba15-7700e89bfa85","name":"Luis"},
    {"userId":"e6cc6bee-2ec8-47dd-ae4d-544fcb50d461","name":"Mary"}
];

export const RoomPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [ cards, setCards ] = useState([...defaultCards])

    const { room, currentUserHistory, getRoom, setUserHistory } = useRoomStore();

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
                            <li key={user.userId} className="list-group-item">
                                {user.name} <span className="badge bg-primary rounded-pill mb-2">14</span>
                            </li>
                        ))
                    }
                </ul>
            </div>

            </div>

        </main>
    )
}
