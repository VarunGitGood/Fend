import { useDisclosure } from '@mantine/hooks'
import {
  Box,
  Modal,
  Flex,
  Group,
  Table,
  TextInput,
  Checkbox,
  Image,
  Text,
  Button
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useLocation, useNavigate } from 'react-router-dom'
import notFoundImg from '../../assets/notFound.jpg'
import { useGroupStore } from '@renderer/store/useGroupStore'
import classes from './index.module.css'
// import toast, { Toaster } from 'react-hot-toast'

import { saveDataToStore } from '@renderer/utils/storage'
import { useScriptStore, MyScriptItem } from '@renderer/store/useScriptStore'
import { Run, useRunsStore } from '@renderer/store/useRunsStore'
const ipcRenderer = (window as any).ipcRenderer
interface GroupBarProps {
  name: string
  onAddHost: (
    groupName: string,
    details: { ipaddress: string; alias: string; lastModified: string }
  ) => void
}

function formatLastModified(dateString: string): string {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }

  return new Intl.DateTimeFormat('en-US', options).format(date)
}

function GroupBar({ name, onAddHost }: GroupBarProps): JSX.Element {
  const [opened, { open, close }] = useDisclosure(false)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const isCustom = queryParams.get('custom') === 'true'
  const { groupDetails, setGroupDetails } = useGroupStore()

  const form = useForm({
    initialValues: {
      ipaddress: '',
      alias: ''
    },

    validate: {
      ipaddress: (value) => {
        return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
          value
        )
          ? null
          : 'Invalid IP Address'
      },
      alias: (value) => {
        return value.trim() === '' ? 'Alias Name is required' : null
      }
    },

    transformValues: (values) => {
      return {
        ipaddress: values.ipaddress.trim(),
        alias: values.alias.trim()
      }
    }
  })

  const handleAddHost = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const validationErrors = form.validate()

    if (!validationErrors.hasErrors) {
      onAddHost(name, {
        ipaddress: form.values.ipaddress,
        alias: form.values.alias,
        lastModified: formatLastModified(new Date().toISOString())
      })
      form.reset()
      close()
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add New Host" centered>
        <form onSubmit={handleAddHost}>
          <TextInput
            data-autofocus
            type="text"
            label="IP Address"
            radius={0}
            {...form.getInputProps('ipaddress')}
          />
          <TextInput mt="md" label="Alias Name" radius={0} {...form.getInputProps('alias')} />

          <Flex mt="2rem" w="100%" gap="1rem">
            <Button type="submit" variant="filled" w="50%">
              Add
            </Button>
            <Button variant="outline" onClick={close} w="50%">
              Cancel
            </Button>
          </Flex>
        </form>
      </Modal>
      <Flex justify="space-between" align="center" className={classes.groupBar}>
        <Flex align="center" gap={isCustom ? '1rem' : '0'}>
          {isCustom && (
            <Checkbox
              checked={groupDetails.find((item) => item.name === name)?.isSelected || false}
              onChange={(event) => {
                const newGroupDetails = groupDetails.map((item) => {
                  if (item.name === name) {
                    return {
                      ...item,
                      isSelected: event.currentTarget.checked
                    }
                  }
                  return item
                })
                setGroupDetails(newGroupDetails)
              }}
            />
          )}
          <Text fz="1.125rem" fw={600} lh="1.75rem">
            {name}
          </Text>
        </Flex>
        <Button
          variant="outline"
          onClick={(e) => {
            e.stopPropagation()
            open()
          }}
        >
          + Add New Host
        </Button>
      </Flex>
    </>
  )
}

function Groups(): JSX.Element {
  const navigate = useNavigate()
  const [opened, { open, close }] = useDisclosure(false)
  const [openedModal, { open: openM, close: closeM }] = useDisclosure(false)
  const { groupDetails, setGroupDetails } = useGroupStore()
  const { myScripts } = useScriptStore()
  const { runs, setRuns } = useRunsStore()
  console.log(runs, 'runs')
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const isCustom = queryParams.get('custom') === 'true'
  const scriptName = queryParams.get('scriptName') || ''
  const form = useForm({
    initialValues: {
      groupName: ''
    },

    validate: {
      groupName: (value) => {
        return value.trim() === '' ? 'Group Name is required' : null
      }
    },

    transformValues: (values) => {
      return {
        groupName: values.groupName.trim()
      }
    }
  })

  const handleAddGroup = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const validationErrors = form.validate()

    if (!validationErrors.hasErrors) {
      setGroupDetails([
        ...groupDetails,
        {
          name: form.values.groupName,
          details: []
        }
      ])
      form.reset()
      close()
    }
  }

  const handleCheckedGroups = (): void => {
    const selectedGroups = new Map<string, any>()
    groupDetails.forEach((group) => {
      if (group.isSelected) {
        selectedGroups.set(group.name, {
          hosts: Object.fromEntries(
            group.details.map((detail) => {
              return [detail.alias, { ansible_host: detail.ipaddress, ansible_user: 'ubuntu' }]
            })
          )
        })
      }
    })
    const obj = {
      all: {
        children: Object.fromEntries(
          [...selectedGroups.entries()].map(([groupName, groupData]) => {
            return [groupName, groupData]
          })
        )
      }
    }
    const script: MyScriptItem = myScripts.find((s) => s.scriptName === scriptName) || {
      scriptName: '',
      myConfig: [],
      ansibleConfig: {}
    }

    const data = {
      scriptName,
      script: script.ansibleConfig
    }
    ipcRenderer.send('generate-script', data)
    ipcRenderer.on('generate-script-success', (_event, arg) => {
      console.log(arg)
    })
    ipcRenderer.on('generate-script-error', (_event, arg) => {
      console.error(arg)
    })
    ipcRenderer.send('add-group', obj)
    ipcRenderer.on('add-group-log', (_event, arg) => {
      console.log(arg)
    })
    ipcRenderer.on('add-group-success', (_event, arg) => {
      console.log(arg)
    })
    ipcRenderer.on('add-group-error', (_event, arg) => {
      console.error(arg)
    })
    const runsScriptDetails = {
      scriptName,
      groupName: 'test'
    }
    ipcRenderer.send('run-script', runsScriptDetails)
    const newRuns: Run[] = [
      ...runs,
      {
        status: 'running',
        scriptName: scriptName,
        groupNames: [...selectedGroups.keys()],
        modules:
          myScripts.find((s) => s.scriptName === scriptName)?.myConfig.map((item) => item.module) ||
          [],
        timeStamp: formatLastModified(new Date().toISOString())
      }
    ]
    setRuns(newRuns)
    saveDataToStore('runs', newRuns)
    // after we have sent the script to the main process, we need to update the status of the run to running and close the modal
    // ipcRenderer.on('run-script-error', (_event, arg) => {
    //   console.error(arg)
    //   // find by scriptName and update status to error
    //   const updatedRuns: Run[] = runs.map((run: Run) => {
    //     if (run.scriptName === scriptName) {
    //       return {
    //         ...run,
    //         status: 'error',
    //         scriptError: arg
    //       }
    //     }
    //     return run
    //   })
    //   console.log(updatedRuns, 'updatedRuns')
    // })
    // ipcRenderer.on('run-script-success', (_event, arg) => {
    //   // find by scriptName and update status to success
    //   const updatedRuns: Run[] = runs.map((run: Run) => {
    //     if (run.scriptName === scriptName) {
    //       return {
    //         ...run,
    //         status: 'success',
    //         scriptOutput: arg
    //       }
    //     }
    //     return run
    //   })
    //   setRuns(updatedRuns)
    // })
  }

  const handleAddHost = (
    groupName: string,
    details: { ipaddress: string; alias: string; lastModified: string }
  ): void => {
    const newGroupDetails = groupDetails.map((item) => {
      if (item.name === groupName) {
        return {
          ...item,
          details: [...item.details, details]
        }
      }

      return item
    })

    setGroupDetails(newGroupDetails)
    saveDataToStore('groupDetails', newGroupDetails)
  }

  const handleRemoveHost = (groupName: string, ipaddress: string): void => {
    const newGroupDetails = groupDetails.map((item) => {
      if (item.name === groupName) {
        return {
          ...item,
          details: item.details.filter((detail) => detail.ipaddress !== ipaddress)
        }
      }

      return item
    })

    setGroupDetails(newGroupDetails)
    saveDataToStore('groupDetails', newGroupDetails)
  }

  const items = groupDetails.map((group) => {
    const { name, details } = group
    const rows =
      details.length > 0 ? (
        details.map((detail) => (
          <Table.Tr key={detail.ipaddress}>
            <Table.Td>{detail.alias}</Table.Td>
            <Table.Td>{detail.ipaddress}</Table.Td>
            <Table.Td>{detail.lastModified}</Table.Td>
            <Table.Td>
              <Button
                variant="subtle"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveHost(name, detail.ipaddress)
                }}
              >
                Remove
              </Button>
            </Table.Td>
          </Table.Tr>
        ))
      ) : (
        <Table.Tr key={`no-details-${name}`}>
          <Table.Td colSpan={4} py="2rem" style={{ textAlign: 'center' }}>
            No details available
          </Table.Td>
        </Table.Tr>
      )

    return (
      <Box key={name} mt="2rem">
        <GroupBar name={name} onAddHost={handleAddHost} />
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="0.75rem" horizontalSpacing="1.5rem" className={classes.table}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Host Name</Table.Th>
                <Table.Th>IP address</Table.Th>
                <Table.Th>Last Modified</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Box>
    )
  })

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add New Group" centered>
        <form onSubmit={handleAddGroup}>
          <TextInput
            type="text"
            label="Group Name"
            radius={0}
            {...form.getInputProps('groupName')}
          />

          <Flex mt="2rem" w="100%" gap="1rem">
            <Button type="submit" w="50%" variant="filled">
              Add
            </Button>
            <Button w="50%" variant="outline" onClick={close}>
              Cancel
            </Button>
          </Flex>
        </form>
      </Modal>
      <Modal opened={openedModal} onClose={closeM} title="Run Script" centered>
        <Text fz="1rem" fw={600} mb="1rem">
          Are you sure you want to run the script?
        </Text>
        <Flex justify="flex-end" gap={15}>
          <Button size="md" variant="outline" onClick={closeM}>
            Cancel
          </Button>
          <Button
            size="md"
            onClick={() => {
              handleCheckedGroups()
              closeM()
              navigate('/')
            }}
          >
            Confirm
          </Button>
        </Flex>
      </Modal>
      <Box p="md">
        <Flex justify="space-between" align="center">
          <Text fz="2.25rem" fw="600" lh="2.75rem">
            Groups
          </Text>
          <Button bg="#005FB8" size="md" onClick={open}>
            + Add New Group
          </Button>
        </Flex>

        {groupDetails.length === 0 ? (
          <Group justify="center" align="center" mt="3rem">
            <Image src={notFoundImg} alt="No Groups Found" width={600} height={600} />
          </Group>
        ) : (
          <Box mt="3rem">{items}</Box>
        )}
        {isCustom && (
          <Flex justify="flex-end" gap={15} my={24}>
            <Button size="md" variant="subtle" onClick={() => navigate('/custom-script')}>
              Back
            </Button>
            <Button size="md" onClick={openM}>
              Run Script
            </Button>
            {/* <button onClick={testScript}>Test</button> */}
          </Flex>
        )}
      </Box>
    </>
  )
}

export default Groups
