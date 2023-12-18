import { Badge, Box, Button, Flex, Group, Modal, Table, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { CopyBlock } from 'react-code-blocks'
import classes from './index.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRunsStore } from '@renderer/store/useRunsStore'
interface Log {
  limit?: number
  title: string
}
function Chip({ children }: { children: string }): JSX.Element {
  return (
    <Box bg="#F6F6F6" p="0.125rem 0.5rem" style={{ display: 'inline-block', borderRadius: '1rem' }}>
      <Text fz="0.75rem" fw={500} c="#475467">
        {children}
      </Text>
    </Box>
  )
}
export default function LogsTable({ limit, title }: Log): JSX.Element {
  const [opened, { open, close }] = useDisclosure(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { runs } = useRunsStore()
  const isLogsPage = location.pathname === '/logs'

  const rows = (limit ? runs.reverse().slice(0, 10) : runs).map((row, index) => (
    <>
      <Modal opened={opened} onClose={close} title="Log" size="calc(100vw - 3rem)" centered>
        <CopyBlock
          text={
            runs.find((run) => run.scriptName === row.scriptName)?.scriptOutput ||
            'No output available'
          }
          language="powershell"
          showLineNumbers={false}
          wrapLongLines={true}
        />
      </Modal>
      <Table.Tr key={index}>
        <Table.Td>
          {row.status === 'success' && (
            <Badge color="green" variant="light">
              Success
            </Badge>
          )}
          {row.status === 'running' && (
            <Badge color="blue" variant="light">
              Running
            </Badge>
          )}
          {row.status === 'error' && (
            <Badge color="red" variant="light">
              Failed
            </Badge>
          )}
        </Table.Td>
        <Table.Td>{row.scriptName}</Table.Td>
        <Table.Td>{row.timeStamp}</Table.Td>
        <Table.Td>
          <Group gap="0.5rem">
            {row.groupNames.map((group, idx) => (
              <Chip key={idx}>{group}</Chip>
            ))}
          </Group>
        </Table.Td>
        <Table.Td>
          <Group gap="0.5rem" maw="25rem">
            {row.modules.map((module, idx) => (
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
    </>
  ))
  return (
    <Box>
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
                <Table.Th>Time</Table.Th>
                <Table.Th>Applied Group</Table.Th>
                <Table.Th>Module</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rows.length == 0 ? (
                <Text ta="center" my="lg">
                  No Runs Available
                </Text>
              ) : (
                rows
              )}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Box>
    </Box>
  )
}
