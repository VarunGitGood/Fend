import { Badge, Box, Button, Chip, Flex, Group, Modal, Table, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { CopyBlock } from 'react-code-blocks'
import classes from './index.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
interface Log {
  limit?: number
  title: string
}
let data = [
  {
    status: 'Success',
    scriptName: 'Custom-Script',
    timeStamp: 'Jan 4, 2022',
    appliedGroup: 'Web Servers',
    module: ['SSH', 'UFW', 'APP Armor']
  },
  {
    status: 'Failed',
    scriptName: 'Custom-Script',
    timeStamp: 'Jan 4, 2022',
    appliedGroup: 'Web Servers',
    module: ['SSH', 'UFW', 'APP Armor']
  },
  {
    status: 'Success',
    scriptName: 'Custom-Script',
    timeStamp: 'Jan 4, 2022',
    appliedGroup: 'Web Servers',
    module: ['SSH', 'UFW', 'APP Armor']
  },
  {
    status: 'Failed',
    scriptName: 'Custom-Script',
    timeStamp: 'Jan 4, 2022',
    appliedGroup: 'Web Servers',
    module: ['SSH', 'UFW', 'APP Armor']
  },
  {
    status: 'Success',
    scriptName: 'Custom-Script',
    timeStamp: 'Jan 4, 2022',
    appliedGroup: 'Web Servers',
    module: ['SSH', 'UFW', 'APP Armor']
  },
  {
    status: 'Success',
    scriptName: 'Custom-Script',
    timeStamp: 'Jan 4, 2022',
    appliedGroup: 'Web Servers',
    module: ['SSH', 'UFW', 'APP Armor']
  },
  {
    status: 'Failed',
    scriptName: 'Custom-Script',
    timeStamp: 'Jan 4, 2022',
    appliedGroup: 'Web Servers',
    module: ['SSH', 'UFW', 'APP Armor']
  },
  {
    status: 'Success',
    scriptName: 'Custom-Script',
    timeStamp: 'Jan 4, 2022',
    appliedGroup: 'Web Servers',
    module: ['SSH', 'UFW', 'APP Armor']
  },
  {
    status: 'Failed',
    scriptName: 'Custom-Script',
    timeStamp: 'Jan 4, 2022',
    appliedGroup: 'Web Servers',
    module: ['SSH', 'UFW', 'APP Armor']
  },
  {
    status: 'Success',
    scriptName: 'Custom-Script',
    timeStamp: 'Jan 4, 2022',
    appliedGroup: 'Web Servers',
    module: ['SSH', 'UFW', 'APP Armor']
  }
]

export default function LogsTable({ limit, title }: Log): JSX.Element {
  const [opened, { open, close }] = useDisclosure(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isLogsPage = location.pathname === '/logs'
  data = limit ? data.slice(0, limit) : data

  const rows = data.map((row, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        {row.status === 'Success' ? (
          <Badge variant="light">Success</Badge>
        ) : (
          <Badge color="red" variant="light">
            Failed
          </Badge>
        )}
      </Table.Td>
      <Table.Td>{row.scriptName}</Table.Td>
      <Table.Td>{row.timeStamp}</Table.Td>
      <Table.Td>{row.appliedGroup}</Table.Td>
      <Table.Td>
        <Group gap="0.5rem">
          {row.module.map((module, idx) => (
            <Chip key={idx}>{module}</Chip>
          ))}
        </Group>
      </Table.Td>
      <Table.Td>
        <Button variant="outline" color="blue" size="xs" onClick={open}>
          View Log
        </Button>
      </Table.Td>
    </Table.Tr>
  ))
  const logdata = String.raw`2023-12-13 02:03:49,124 p=63874 u=arminpatel n=ansible | [WARNING]: TASK: ufw : Allow sshd port from administrator networks: The loop variable 'item' is
already in use. You should set the 'loop_var' value in the 'loop_control' option for the task to
something else to avoid variable collisions and unexpected behavior.

2023-12-13 02:03:58,240 p=63874 u=arminpatel n=ansible | [WARNING]: TASK: ufw : Allow outgoing specified ports: The loop variable 'item' is already in use.
You should set the 'loop_var' value in the 'loop_control' option for the task to something else to

2023-12-13 02:03:49,124 p=63874 u=arminpatel n=ansible | [WARNING]: TASK: ufw : Allow sshd port from administrator networks: The loop variable 'item' is
already in use. You should set the 'loop_var' value in the 'loop_control' option for the task to
something else to avoid variable collisions and unexpected behavior.

2023-12-13 02:03:58,240 p=63874 u=arminpatel n=ansible | [WARNING]: TASK: ufw : Allow outgoing specified ports: The loop variable 'item' is already in use.
You should set the 'loop_var' value in the 'loop_control' option for the task to something else to

2023-12-13 02:03:49,124 p=63874 u=arminpatel n=ansible | [WARNING]: TASK: ufw : Allow sshd port from administrator networks: The loop variable 'item' is
already in use. You should set the 'loop_var' value in the 'loop_control' option for the task to
something else to avoid variable collisions and unexpected behavior.

2023-12-13 02:03:58,240 p=63874 u=arminpatel n=ansible | [WARNING]: TASK: ufw : Allow outgoing specified ports: The loop variable 'item' is already in use.
You should set the 'loop_var' value in the 'loop_control' option for the task to something else to

2023-12-13 02:03:49,124 p=63874 u=arminpatel n=ansible | [WARNING]: TASK: ufw : Allow sshd port from administrator networks: The loop variable 'item' is
already in use. You should set the 'loop_var' value in the 'loop_control' option for the task to
something else to avoid variable collisions and unexpected behavior.

2023-12-13 02:03:58,240 p=63874 u=arminpatel n=ansible | [WARNING]: TASK: ufw : Allow outgoing specified ports: The loop variable 'item' is already in use.
You should set the 'loop_var' value in the 'loop_control' option for the task to something else to

2023-12-13 02:03:49,124 p=63874 u=arminpatel n=ansible | [WARNING]: TASK: ufw : Allow sshd port from administrator networks: The loop variable 'item' is
already in use. You should set the 'loop_var' value in the 'loop_control' option for the task to
something else to avoid variable collisions and unexpected behavior.

2023-12-13 02:03:58,240 p=63874 u=arminpatel n=ansible | [WARNING]: TASK: ufw : Allow outgoing specified ports: The loop variable 'item' is already in use.
You should set the 'loop_var' value in the 'loop_control' option for the task to something else to

2023-12-13 02:03:49,124 p=63874 u=arminpatel n=ansible | [WARNING]: TASK: ufw : Allow sshd port from administrator networks: The loop variable 'item' is
already in use. You should set the 'loop_var' value in the 'loop_control' option for the task to
something else to avoid variable collisions and unexpected behavior.

2023-12-13 02:03:58,240 p=63874 u=arminpatel n=ansible | [WARNING]: TASK: ufw : Allow outgoing specified ports: The loop variable 'item' is already in use.
You should set the 'loop_var' value in the 'loop_control' option for the task to something else to

`
  return (
    <Box>
      <Modal opened={opened} onClose={close} title="Log" size="calc(100vw - 3rem)" centered>
        <CopyBlock
          text={logdata}
          language="powershell"
          showLineNumbers={false}
          wrapLongLines={true}
        />
      </Modal>
      <Box p="md">
        <Flex justify="space-between" align="center" mt={isLogsPage ? '0' : '2rem'}>
          <Text
            fz={isLogsPage ? '2.25rem' : '1.25rem'}
            fw="600"
            lh={isLogsPage ? '2.75rem' : '1.75rem'}
          >
            {title}
          </Text>
          {!isLogsPage && (
            <Button bg="#005FB8" onClick={() => navigate('/logs')}>
              See all Logs
            </Button>
          )}
        </Flex>
        <Table.ScrollContainer minWidth={800} mt="2rem">
          <Table verticalSpacing="0.75rem" horizontalSpacing="1.5rem" className={classes.table}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Status</Table.Th>
                <Table.Th>Script Name</Table.Th>
                <Table.Th>Time Stamp</Table.Th>
                <Table.Th>Applied Group</Table.Th>
                <Table.Th>Module</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Box>
    </Box>
  )
}
