import React, { useCallback, useState, useEffect } from 'react'

import NavbarLayout from '@theme/Navbar/Layout'
import NavbarContent from '@theme/Navbar/Content'

import clsx from 'clsx'
import SearchBar from '@theme/SearchBar'
import Toggle from '@theme/Toggle'

import { useColorMode, useThemeConfig } from '@docusaurus/theme-common'
import ColorModeToggle from '@theme/ColorModeToggle'

import {
  useHideableNavbar,
  useLockBodyScroll,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal'

import NavbarMobileSidebar from '@theme/Navbar/MobileSidebar'
import { useWindowSize } from '@docusaurus/theme-common'
import NavbarItem from '@theme/NavbarItem'
import Logo from '@theme/Logo'

import IconMenu from '@theme/Icon/Menu'

import styles from './styles.module.css' // retrocompatible with v1

const DefaultNavItemPosition = 'right' // If split links by left/right
// if position is unspecified, fallback to right (as v1)

function splitNavItemsByPosition(items) {
  const leftItems = items.filter(
    (item) => (item.position ?? DefaultNavItemPosition) === 'left',
  )
  const rightItems = items.filter(
    (item) => (item.position ?? DefaultNavItemPosition) === 'right',
  )
  return {
    leftItems,
    rightItems,
  }
}
export default function Navbar() {
  const {
    navbar: { items, hideOnScroll, style },
    colorMode: { disableSwitch: disableColorModeSwitch },
  } = useThemeConfig()
  const mobileSidebar = useNavbarMobileSidebar()
  const [sidebarShown, setSidebarShown] = useState(false)
  const { colorMode, setColorMode } = useColorMode()
  const { isDarkTheme } = colorMode === 'dark'
  const setDarkTheme = () => {
    colorMode = 'dark'
  }
  const setLightTheme = () => {
    colorMode = 'light'
  }
  const switchTheme = () => {
    colorMode === 'light' ? setColorMode('dark') : setColorMode('light')
  }
  const { navbarRef, isNavbarVisible } = useHideableNavbar(hideOnScroll)
  useLockBodyScroll(sidebarShown)

  const showSidebar = useCallback(() => {
    setSidebarShown(true)
  }, [setSidebarShown])

  const hideSidebar = useCallback(() => {
    setSidebarShown(false)
  }, [setSidebarShown])

  const onToggleChange = useCallback(
    (e) => (e.target.checked ? setDarkTheme() : setLightTheme()),
    [setLightTheme, setDarkTheme],
  )

  const hasSearchNavbarItem = items.some((item) => item.type === 'search')
  const { leftItems, rightItems } = splitNavItemsByPosition(items)
  console.log(mobileSidebar)
  return (
    <nav
      ref={navbarRef}
      className={clsx(
        'navbar',
        'navbar--fixed-top',
        'shadow-none',
        'border-b',
        {
          'navbar--dark ': style === 'dark',
          'navbar--primary': style === 'primary',
          '!border-b-darkmode-divider bg-darkmode-background': isDarkTheme,
          'navbar-sidebar--show': sidebarShown,
          // 'navbar-sidebar--show': mobileSidebar.shown,
          [styles.navbarHideable]: hideOnScroll,
          [styles.navbarHidden]: hideOnScroll && !isNavbarVisible,
        },
      )}
    >
      {/* styles.navbar */}
      <div className="navbar__inner">
        <div className="navbar__items">
          {items != null && items.length !== 0 && (
            <button
              aria-label="Navigation bar toggle"
              className="navbar__toggle clean-btn"
              type="button"
              tabIndex={0}
              onClick={showSidebar}
              onKeyDown={showSidebar}
            >
              <IconMenu />
            </button>
          )}
          <Logo
            className="relative navbar__brand top-[2px] lg:top-0"
            imageClassName="navbar__logo"
            titleClassName="navbar__title"
          />
          {leftItems.map((item, i) => (
            <NavbarItem {...item} key={i} />
          ))}
        </div>
        {/* This block err */}
        <div className="navbar__items navbar__items--right">
          {rightItems.map((item, i) => (
            <NavbarItem {...item} key={i} />
          ))}
          {/*NE FONCTIONNE PAS
          {!disableColorModeSwitch && (
            <Toggle
              className={styles.displayOnlyInLargeViewport}
              checked={isDarkTheme}
              onChange={onToggleChange}
            />
          )}
          NE FONCTIONNE PAS*/}
          {/**/}
          <ColorModeToggle
            className={styles.displayOnlyInLargeViewport}
            checked={isDarkTheme}
            onChange={switchTheme}
          />
          {/**/}
          {/*<ColorModeToggle />*/}
          {!hasSearchNavbarItem && <SearchBar />}
        </div>
        {/* End of block */}
      </div>
      {/* Backdrop */}
      <div
        role="presentation"
        className="navbar-sidebar__backdrop"
        onClick={hideSidebar}
      />
      <div className="navbar-sidebar">
        <div
          className={clsx('border-b', 'shadow-none', 'navbar-sidebar__brand', {
            '!border-b-darkmode-divider bg-darkmode-background': isDarkTheme,
          })}
        >
          <Logo
            className="navbar__brand relative top-[2px]"
            imageClassName="navbar__logo"
            titleClassName="navbar__title"
            onClick={hideSidebar}
          />
          {/*
          {!disableColorModeSwitch && sidebarShown && (
            <Toggle checked={isDarkTheme} onChange={onToggleChange} />
          )}
          */}
        </div>
        <div className="navbar-sidebar__items">
          <div className="menu">
            <ul className="menu__list">
              {items.map((item, i) => (
                <NavbarItem
                  mobile
                  {...item} // TODO fix typing
                  onClick={hideSidebar}
                  key={i}
                />
              ))}
            </ul>
          </div>
        </div>
        {/* New mobile sidebar */}
      </div>
      {/* <div onClick={hideSidebar}> */}
      {/* <NavbarMobileSidebar /> */}
      {/* </div> */}
    </nav>
  )
}
