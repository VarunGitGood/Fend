import { useDisclosure } from '@mantine/hooks'
import { Box, Accordion, Modal, TextInput, Flex, Grid, Center, Text, Button } from '@mantine/core'
import { IconX } from '@tabler/icons-react'

interface GroupDetail {
  name: string
  details: {
    ipaddress: string
    alias?: string
  }[]
}

interface AccordionLabelProps {
  name: string
}

const group_details: GroupDetail[] = [
  {
    name: 'Web Server',
    details: [
      {
        ipaddress: '192.168.1.100',
        alias: 'Server 1'
      },
      {
        ipaddress: '192.168.1.101',
        alias: 'Server 2'
      },
      {
        ipaddress: '192.168.1.102',
        alias: 'Server 3'
      }
    ]
  },
  {
    name: 'Work Station',
    details: []
  }
]

function AccordionLabel({ name }: AccordionLabelProps): JSX.Element {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add New Host" centered>
        <TextInput type="text" label="IP Address" radius={0} />
        <TextInput mt="md" label="Alias Name(Optional)" radius={0} />

        <Flex mt="2rem" w="100%" gap="1rem">
          <Button w="50%" variant="filled">
            Add
          </Button>
          <Button w="50%" variant="outline" onClick={close}>
            Cancel
          </Button>
        </Flex>
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

  const items = group_details.map((item) => (
    <Accordion.Item key={item.name} value={item.name} mb="4rem">
      <Accordion.Control bg="#D9D9D9">
        <AccordionLabel name={item.name} />
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
      <Box px="3rem" py="md">
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
