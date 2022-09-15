import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useUiStore } from '../../hooks';

import { NewUserHistoryModal } from './NewUserHistoryModal';



export const UserHistories = ({userHistories, onSelectUS, deleteUserHistory}) => {
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

            <NewUserHistoryModal userHistories={ userHistories } />

            <Tabs>
                <TabList>
                    <Tab>Active Stories</Tab>
                    {/* <Tab>Completed Stories</Tab>
                    <Tab>All Stories</Tab> */}
                </TabList>

                <TabPanel>
                    <ul>
                    {
                        userHistories.map(us=> (
                            <li key={us.userHistoryId}
                                className="d-flex justify-content-between mb-2 pe-2 "
                                onClick={() => onSelectUS(us)}
                                >
                            <span className="w-75">{us.title}</span>
                            <button 
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => deleteUserHistory(us.userHistoryId)}
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
