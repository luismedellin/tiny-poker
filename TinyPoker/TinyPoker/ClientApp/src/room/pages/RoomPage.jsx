import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'react-tabs/style/react-tabs.css';

import { useRoomStore, useUserStore, useChatRoomStore } from '../../hooks';
import { UserStories, RoomUsers } from '../';

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

export const RoomPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [ cards, setCards ] = useState([...defaultCards])

    const { room, currentUserStory, getRoom, setUserStory, deleteUserStory, removeUserStory } = useRoomStore();
    const { users, joinRoom, sendMessage } = useChatRoomStore();
    const { user } = useUserStore();
    const { messages } = useChatRoomStore();

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
        if (room.roomId) joinRoom(user.userId, user.name, room.roomId);
    }, [room]);

    useEffect(() => {
        if (!messages.length) return;
        const deleteMessages = messages.find(m=> m.messageType === "deleteUserStory" && user.userId !== m.user);
        
        if (deleteMessages){
            removeUserStory(JSON.parse(deleteMessages.message));
        }

    }, [messages])

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

    const selectUserStory = (userStory) => {
        setUserStory(userStory);
    }

    const onDeleteUserStory = (userStoryId) => {
        Swal.fire({
            title: 'Está seguro de borrar esta historia de usuario?',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
          }).then((result) => {
            if (result.isConfirmed) {
                deleteUserStory(room.roomId, userStoryId);
            }
          });
    }

    if (!room.roomId) return <p>Loading...</p>

    return (
        <main className="container animate__animated animate__fadeIn">
            <div>
                <h1>{room.name}</h1>
            </div>

            <div className="d-flex">
            <div>
                <h2>{currentUserStory?.title}</h2>
                <div className="poker-cards d-flex flex-wrap" disabled={!currentUserStory}>
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
                    <UserStories
                        userStories={ room.userStories }
                        deleteUserStory = { onDeleteUserStory }
                        onSelectUS = { selectUserStory }
                        />
                </div>
            </div>

            <RoomUsers users= {users} sendMessage={sendMessage} />

            </div>

        </main>
    )
}
