
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export const UserHistories = ({userHistories, onSelectUS}) => {

    return (
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
    )
}
