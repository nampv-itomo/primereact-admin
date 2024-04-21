/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { AppTopbarRef } from '@/types';
import { LayoutContext } from './context/layoutcontext';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';

import i18n from '@/app/i18n';


const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const flag = useRef<Menu>(null);

    const flagItems: MenuItem[] = [
        {
            label: 'Việt Nam',
            icon: 'fi fi-vn',
            command: () => {
                changeLanguageAction('vn')
            },
            template: (item, option) => {
                return (
                    <div className='flex align-items-center gap-2 cursor-pointer hover:surface-100 py-2' onClick={(event) => {changeLanguageAction('vn'); flag.current?.toggle(event)}}>
                        <img src='/demo/images/flag/vietnam.png' width={'24px'} className='ml-3'></img> <span className="">Vietnam</span>
                    </div>
                )
            }
        },
        {
            label: 'Nhật Bản',
            icon: 'pi pi-image',
            command: () => {
                changeLanguageAction('jp')
            },
            template: (item, option) => {
                return (
                    <div className='flex align-items-center gap-2 cursor-pointer hover:surface-100 py-2' onClick={(event) => {changeLanguageAction('jp'); flag.current?.toggle(event)}}>
                        <img src='/demo/images/flag/japan.png' width={'24px'} className='ml-3'></img> <span className="">Japan</span>
                    </div>
                )
            }
        },
        {
            label: 'Tieng Anh',
            icon: 'pi pi-image',
            command: () => {
                changeLanguageAction('en')
            },
            template: (item, option) => {
                return (
                    <div className='flex align-items-center gap-2 cursor-pointer hover:surface-100 py-2' onClick={(event) => {changeLanguageAction('en'); flag.current?.toggle(event)}}>
                        <img src='/demo/images/flag/united-kingdom.png' width={'24px'} className='ml-3'></img> <span className="">UK</span>
                    </div>
                )
            }
        }
    ];

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    // language
    const [selectedLang, setSelectedLang] = useState<string>('');
    const [flagSrc, setFlagSrc] = useState<string>('')

    useEffect(() => {
        const currentLanguage = localStorage.getItem('I18N_LANGUAGE');
        if(currentLanguage) {
            setSelectedLang(currentLanguage);
        }
    }, []);

    useEffect(() => {
        if(selectedLang) {
            if(selectedLang == 'vn') {
                setFlagSrc('/demo/images/flag/vietnam.png') 
            } else if(selectedLang == 'jp') {
                setFlagSrc('/demo/images/flag/japan.png') 
            } else {
                setFlagSrc('/demo/images/flag/united-kingdom.png') 
            }
        }
    }, [selectedLang]);

    const changeLanguageAction = (lang: any) => {
        //set language as i18n
        i18n.changeLanguage(lang);
        localStorage.setItem('I18N_LANGUAGE', lang);
        setSelectedLang(lang);
    };

    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">
                <img src={`/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`} width="47.22px" height={'35px'} alt="logo" />
                <span>ITOMO</span>
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <div className='"p-link layout-topbar-button'>
                    <Menu model={flagItems} popup ref={flag} id="popup_menu_right" popupAlignment="right" className="mt-4 max-h-15rem overflow-y-auto" />
                    <Avatar image={flagSrc} onClick={(event) => flag.current?.toggle(event)} aria-controls="popup_menu_right" aria-haspopup style={{ height: '1.5rem', width: '1.5rem', borderRadius: '5px' }} />
                    <span>Language</span>
                </div>

                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-calendar"></i>
                    <span>Calendar</span>
                </button>
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-user"></i>
                    <span>Profile</span>
                </button>
                <Link href="/documentation">
                    <button type="button" className="p-link layout-topbar-button">
                        <i className="pi pi-cog"></i>
                        <span>Settings</span>
                    </button>
                </Link>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
