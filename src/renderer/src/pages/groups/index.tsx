import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Box, Accordion, Modal, TextInput, Flex, Grid, Center, Text, Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconX } from '@tabler/icons-react'
import { GroupDetail, useGroupStore } from '@renderer/store/useGroupStore'
interface AccordionLabelProps {
  name: string
  onAddHost: (groupName: string, details: { ipaddress: string; alias?: string }) => void
}

function AccordionLabel({ name, onAddHost }: AccordionLabelProps): JSX.Element {
  const [opened, { open, close }] = useDisclosure(false)

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
        alias: form.values.alias
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
          <TextInput
            mt="md"
            label="Alias Name(Optional)"
            radius={0}
            {...form.getInputProps('alias')}
          />

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
      <Flex justify="space-between" align="center">
        <Text fz="1.25rem" fw="400">
          {name}
        </Text>
        <span
          style={{
            cursor: 'pointer',
            fontSize: '1rem',
            color: '#666666',
            marginLeft: '1rem'
          }}
          onClick={(e) => {
            e.stopPropagation()
            open()
          }}
        >
          + Add New Host
        </span>
      </Flex>
    </>
  )
}

function Groups(): JSX.Element {
  const [opened, { open, close }] = useDisclosure(false)

  const { groupDetails, setGroupDetails } = useGroupStore()

  const handleAddHost = (
    groupName: string,
    details: { ipaddress: string; alias?: string }
  ): void => {
    setGroupDetails((prevGroupDetails) => {
      const groupIndex = prevGroupDetails.findIndex((group) => group.name === groupName)
      if (groupIndex !== -1) {
        const updatedDetails = [...prevGroupDetails]
        updatedDetails[groupIndex].details.push(details)
        return updatedDetails
      }
      return prevGroupDetails
    })
  }

  const handleRemoveHost = (groupName: string, ipaddress: string): void => {
    setGroupDetails((prevGroupDetails) => {
      return prevGroupDetails.map((group) => {
        if (group.name === groupName) {
          const updatedDetails = group.details.filter((detail) => detail.ipaddress !== ipaddress)
          return { ...group, details: updatedDetails }
        }
        return group
      })
    })
  }

  const items = groupDetails.map((item) => (
    <Accordion.Item key={item.name} value={item.name} mb="4rem">
      <Accordion.Control bg="#D9D9D9">
        <AccordionLabel name={item.name} onAddHost={handleAddHost} />
      </Accordion.Control>
      <Accordion.Panel>
        {item.details.length > 0 ? (
          <Grid py="1rem">
            {item.details.map((detail) => (
              <Grid.Col span={4} key={detail.ipaddress}>
                <Flex
                  justify="space-around"
                  align="center"
                  p="0.75rem"
                  style={{ border: '1px solid #000000', borderRadius: '1rem' }}
                >
                  <Text fz="1rem" fw={400}>
                    {detail.alias ? detail.ipaddress + ' (' + detail.alias + ')' : detail.ipaddress}
                  </Text>
                  <Center
                    p="2px"
                    style={{ borderRadius: '50%', border: '1px solid #000000', cursor: 'pointer' }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveHost(item.name, detail.ipaddress)
                    }}
                  >
                    <IconX size={16} strokeWidth={2} color={'black'} />
                  </Center>
                </Flex>
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <Flex justify="center" align="center" h="5rem">
            <Text fz="1rem" ta="center">
              No details available for this group
            </Text>
          </Flex>
        )}
      </Accordion.Panel>
    </Accordion.Item>
  ))

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add New Group" centered>
        <TextInput type="text" label="Group Name" radius={0} />

        <Flex mt="2rem" w="100%" gap="1rem">
          <Button w="50%" variant="filled">
            Add
          </Button>
          <Button w="50%" variant="outline" onClick={close}>
            Cancel
          </Button>
        </Flex>
      </Modal>
      <Box p="md">
        <Flex justify="space-between" align="center">
          <Text fz="2.25rem" fw={400}>
            Groups
          </Text>
          <Button variant="outline" radius="1rem" onClick={open}>
            + Add New Group
          </Button>
        </Flex>

        <Box mt="5rem">
          <Accordion chevron multiple defaultValue={['Web Server']}>
            {items}
          </Accordion>
        </Box>
      </Box>
    </>
  )
}

export default Groups
