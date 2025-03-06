import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { DashPpic } from './ppicpurch/DashPpic';
import { DashFg } from './ppicpurch/FgDashboard/DashFg';
import { DashPurch } from './ppicpurch/pruchasingDash/DashPurch';
import { DashHrga } from './hrdga/DashHrga';
import { DashMantc } from './mtc/DashMantc';
import { DashProd } from './produksi/DashProd';
import { DashQaqc } from './qaqc/DashQaqc';
import { DashRnd } from './rnd/DashRnd';
import { DashSsd } from './ssd/DashSsd';
import { DashWip } from './ppicpurch/DashWip';
import { DashSsm } from './ssm/DashSsm';

export const DashDev = () => {
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
        <Tab eventKey="hrga" title="HR-GA">
            <DashHrga />
        </Tab>
        <Tab eventKey="mtc" title="Maintenance">
            <DashMantc />
        </Tab>
        <Tab eventKey="ppic" title="PPIC">
            <DashPpic />
        </Tab>
        <Tab eventKey="produksi" title="Produksi">
            <DashProd />
        </Tab>
        <Tab eventKey="purchasing" title="Purchasing">
            <DashPurch />
        </Tab>
        <Tab eventKey="qaqc" title="QAQC">
        <DashQaqc />
        </Tab>
        <Tab eventKey="rnd" title="RnD">
        <DashRnd />
        </Tab>
        <Tab eventKey="ssd" title="SSD">
        <DashSsd />
        </Tab>
        <Tab eventKey="wip" title="WIP">
            <DashWip />
        </Tab>
        <Tab eventKey="ssm" title="SSM">
            <DashSsm />
        </Tab>
    </Tabs>
    );
}
