import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useUiStore } from '../../hooks';

import { NewUserHistoryModal } from './NewUserHistoryModal';



export const UserHistories = ({userHistories, onSelectUS}) => {

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
                                onClick={() => onSelectUS(us)}
                                >{us.title}</li>
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
