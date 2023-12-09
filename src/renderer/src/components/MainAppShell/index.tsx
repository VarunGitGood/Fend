import { ReactNode, useState } from 'react'
import { AppShell, Group, Code } from '@mantine/core'
import classes from './MainAppShell.module.css'

import {
  IconDashboard,
  IconSettings,
  IconUsersGroup,
  IconFileTypeDoc,
  IconHistory,
  IconDeviceLaptop
} from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

interface MainAppShellProps {
  children: ReactNode
}
const data = [
  { link: '/', label: 'Dashboard', icon: IconDashboard },
  { link: '/groups', label: 'Groups', icon: IconUsersGroup },
  { link: '/logs', label: 'Logs', icon: IconHistory },
  { link: '/sysinfo', label: 'System Information', icon: IconDeviceLaptop }
]
function MainAppShell({ children }: MainAppShellProps): JSX.Element {
  const [active, setActive] = useState('Dashboard')
  const navigate = useNavigate()

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      key={item.label}
      onClick={(event) => {
        event.preventDefault()
        setActive(item.label)
        navigate(item.link)
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ))

  return (
    <AppShell navbar={{ width: 300, breakpoint: 'sm' }} padding="md">
      <AppShell.Navbar p="md">
        <nav className={classes.navbar}>
          <div className={classes.navbarMain}>
            <Group className={classes.header} justify="space-between">
              <h1>Logo</h1>
              <Code fw={700}>v0.0.1</Code>
            </Group>
            {links}
          </div>

          <div className={classes.footer}>
            <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
              <IconSettings className={classes.linkIcon} stroke={1.5} />
              <span>Settings</span>
            </a>

            <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
              <IconFileTypeDoc className={classes.linkIcon} stroke={1.5} />
              <span>Documentation</span>
            </a>
          </div>
        </nav>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}

export default MainAppShell
