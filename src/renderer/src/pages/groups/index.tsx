import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import {
  Box,
  Table,
  Modal,
  Flex,
  Group,
  TextInput,
  Checkbox,
  Image,
  Text,
  Button
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useLocation } from 'react-router-dom'
import notFoundImg from '../../assets/notFound.jpg'
import { useGroupStore } from '@renderer/store/useGroupStore'
import classes from './index.module.css'
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
    day: 'numeric'
  }

  return new Intl.DateTimeFormat('en-US', options).format(date)
}

function GroupBar({ name, onAddHost }: GroupBarProps): JSX.Element {
  const [opened, { open, close }] = useDisclosure(false)
  const [checked, setChecked] = useState(false)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const isCustom = queryParams.get('custom') === 'true'

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
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
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
  const [opened, { open, close }] = useDisclosure(false)
  const { groupDetails, setGroupDetails } = useGroupStore()

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
              <span
                style={{ color: '#005FB8', cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveHost(name, detail.ipaddress)
                }}
              >
                Remove
              </span>
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
      </Box>
    </>
  )
}

export default Groups
