import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import { DashFg } from './FgDashboard/DashFg';
import { DashPpic } from './DashPpic';
import { DashPurch } from './pruchasingDash/DashPurch';
import { DashWip } from './DashWip';

export const DashMngr = () => {
    const [key, setKey] = useState('fg');
    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="p-2"
        >
            <Tab eventKey="fg" title="FG">
                <DashFg />
            </Tab>
            <Tab eventKey="ppic" title="PPIC">
                <DashPpic />
            </Tab>
            <Tab eventKey="purchasing" title="Purchasing">
                <DashPurch />
            </Tab>
            <Tab eventKey="wip" title="WIP">
                <DashWip />
            </Tab>
        </Tabs>
    )
}
