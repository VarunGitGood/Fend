import { ReactNode } from 'react'
import { AppShell, Group, Image } from '@mantine/core'
import logo from '../../assets/logo.svg'
import classes from './index.module.css'
import {
  IconDashboard,
  IconUsersGroup,
  IconFileTypeDoc,
  IconHistory,
  IconDeviceLaptop
} from '@tabler/icons-react'
import { useNavigate, useLocation } from 'react-router-dom'

interface MainAppShellProps {
  children: ReactNode
}

const data = [
  { link: '/', label: 'Dashboard', icon: IconDashboard },
  { link: '/groups', label: 'Groups', icon: IconUsersGroup },
  { link: '/myScript', label: 'My Scripts', icon: IconFileTypeDoc },
  { link: '/logs', label: 'Logs', icon: IconHistory },
  { link: '/sysinfo', label: 'System Information', icon: IconDeviceLaptop }
]

function MainAppShell({ children }: MainAppShellProps): JSX.Element {
  const navigate = useNavigate()
  const location = useLocation()

  const links = data.map((item) => (
    <a
      className={[classes.link, location.pathname === item.link ? classes.highlight : ''].join(' ')}
      key={item.label}
      onClick={(event) => {
        event.preventDefault()
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
              <Image src={logo} width={150} height={150} />
            </Group>
            {links}
          </div>
        </nav>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}

export default MainAppShell
