/* eslint-disable no-console */
import { h, FunctionComponent } from 'preact'; 
import { useEffect, useState, useRef } from 'preact/hooks';
import register from 'preact-custom-element';
import classNames from 'classnames';
import "./styles.scss"
import { FC, ReactChildren } from 'react';

type MenuItem = {
    id?: string,
    label: string 
}

interface Props {
    data: MenuItem[]
    activemenuitem: string,
}
const Sidebar: FunctionComponent<Props> = ({ data, activemenuitem}) => {
    return (
        <div className='sidebar'>
            <h2>Wow  im sidebar!</h2>
        </div>
    );
}

register(Sidebar, 'x-sidebar', ['data', 'activemenuitem']);

export default Sidebar;
