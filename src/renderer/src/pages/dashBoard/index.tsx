import MainAppShell from '@renderer/components/MainAppShell'
import { Box, Flex, Text, Skeleton } from '@mantine/core'
import { Link } from 'react-router-dom'

function Dashboard(): JSX.Element {
  return (
    <>
      <Box p="md">
        <Text fz="2.25rem" fw="400">
          Dashboard
        </Text>

        <Flex justify="center" align="center" pt="4rem" gap="1rem">
          <Link
            to="/pre-defined-scripts"
            style={{
              width: '50%',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <Flex
              bg="#D9D9D9"
              justify="center"
              align="center"
              h="7rem"
              style={{ cursor: 'pointer' }}
            >
              <Text fz="1.625rem" fw={400} ta="center">
                Use Pre-Defined Scripts
              </Text>
            </Flex>
          </Link>
          <Link
            to="/custom-script"
            style={{
              width: '50%',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <Flex
              bg="#D9D9D9"
              justify="center"
              align="center"
              h="7rem"
              style={{ cursor: 'pointer' }}
            >
              <Text fz="1.625rem" fw={400} ta="center">
                Build Custom Script
              </Text>
            </Flex>
          </Link>
        </Flex>

        <Box pt="7rem">
          <Text fz="1.25rem" fw="400">
            Last Executed Scripts
          </Text>

          <Box pt="2rem">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} h={56} mt="sm" animate={false} />
              ))}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Dashboard
