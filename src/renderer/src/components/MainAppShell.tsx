import { ReactNode } from 'react'
import { AppShell, Flex, Stack, Text, Image } from '@mantine/core'
import dashboardIcon from '../assets/dashboardIcon.svg'
import iconImg from '../assets/icon.svg'
import settingIcon from '../assets/settingIcon.svg'

interface MainAppShellProps {
  children: ReactNode
}

function MainAppShell({ children }: MainAppShellProps): JSX.Element {
  const navigationItems: { icon: string; text: string }[] = [
    { icon: dashboardIcon, text: 'DASHBOARD' },
    { icon: iconImg, text: 'GROUPS' },
    { icon: iconImg, text: 'HISTORY' },
    { icon: iconImg, text: 'SYSTEM INFORMATION' },
    { icon: iconImg, text: 'RAISE TICKET' }
  ]

  return (
    <AppShell navbar={{ width: 300, breakpoint: 'sm' }} padding="md">
      <AppShell.Navbar p="md">
        <Stack justify="center" gap="2rem" pt="8rem">
          {navigationItems.map((item, index) => (
            <Flex
              key={index}
              justify="flex-start"
              align="center"
              gap="1rem"
              style={{ cursor: 'pointer' }}
            >
              <Image src={item.icon} width="2.75rem" />
              <Text>{item.text}</Text>
            </Flex>
          ))}
        </Stack>
        <Stack pos="absolute" bottom="3rem" gap="1rem">
          <Flex
            key="settings"
            w="275px"
            justify="flex-start"
            align="center"
            gap="1rem"
            style={{
              background: '#D9D9D9',
              padding: '0.5rem 1rem',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              cursor: 'pointer'
            }}
          >
            <Image src={settingIcon} width="2.75rem" />
            <Text>SETTINGS</Text>
          </Flex>
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}

export default MainAppShell
