/* eslint-disable no-console */
import { h, FunctionComponent } from 'preact'; 
import { useEffect, useState, useRef } from 'preact/hooks';
import register from 'preact-custom-element';
import classNames from 'classnames';
import s from "./styles.scss"
import { FC, ReactChildren } from 'react';
import LogoIcon from "./LogoIcon";

type MenuItem = {
    id?: string,
    label: string 
}

interface Props {
    data: MenuItem[]
    activemenuitem: string,
}


const Logo = () => {
    return (
        <div className={s.logo}><LogoIcon/></div>
    )
}
const Sidebar: FunctionComponent<Props> = ({ data, activemenuitem}) => {
    return (
        <div className={s.sidebar}>
            <Logo/>
            <h2>Wow  im sidebar!</h2>
        </div>
    );
}

register(Sidebar, 'x-sidebar', ['data', 'activemenuitem']);

export default Sidebar;
