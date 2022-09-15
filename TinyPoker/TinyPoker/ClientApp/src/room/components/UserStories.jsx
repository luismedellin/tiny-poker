import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useUiStore } from '../../hooks';

import { NewUserStoryModal } from './NewUserStoryModal';

export const UserStories = ({userStories, onSelectUS, deleteUserStory}) => {
    const { openModal } = useUiStore();

    const abrirModal = () => {
        openModal();
    }    

    return (
        <div>

            <button className="btn btn-primary"
                onClick={ () => abrirModal() }>
                <i className="fa-solid fa-plus"></i> Agregar
            </button>

            <NewUserStoryModal userStories={ userStories } />

            <Tabs>
                <TabList>
                    <Tab>Active Stories</Tab>
                    {/* <Tab>Completed Stories</Tab>
                    <Tab>All Stories</Tab> */}
                </TabList>

                <TabPanel>
                    <ul>
                    {
                        userStories.map(us=> (
                            <li key={us.userStoryId}
                                className="d-flex justify-content-between mb-2 pe-2 "
                                onClick={() => onSelectUS(us)}
                                >
                            <span className="w-75">{us.title}</span>
                            <button 
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => deleteUserStory(us.userStoryId)}
                                >
                                <i className="fa fa-trash" aria-hidden="true"></i>
                            </button>
                            </li>
                        ))
                    }
                    </ul>
                </TabPanel>
                {/* <TabPanel>
                    <p>abc</p>
                </TabPanel>
                <TabPanel>
                    <p>abd</p>
                </TabPanel> */}

            </Tabs>

        </div>
    )
}
