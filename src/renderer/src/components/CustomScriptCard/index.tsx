import { Box, Button, Group, Paper, Stack, Text } from '@mantine/core'
import classes from './styles.module.css'
function Chip({ children }: { children: string }): JSX.Element {
  return (
    <Box bg="#F6F6F6" p="0.125rem 0.5rem" style={{ display: 'inline-block', borderRadius: '1rem' }}>
      <Text fz="0.75rem" fw={500} c="#475467">
        {children}
      </Text>
    </Box>
  )
}
export default function CustomScriptCard(): JSX.Element {
  return (
    <>
      <Paper className={classes.card} p="xl">
        <Stack justify="flex-start" gap="0.75rem">
          <Text c="#101828" fz="1.125rem" fw={600} lh="1.50rem">
            Script Name
          </Text>
          <Text c="#475467" fz="1rem" fw={400} lh="1.25rem">
            Short description - where we can use this (Recommended target)
          </Text>
          <Group gap="0.5rem">
            <Chip>SSH</Chip>
            <Chip>UFW</Chip>
            <Chip>APP Armor</Chip>
          </Group>
          <Button
            className={classes.btn}
            c="rgba(0, 0, 0, 0.90)"
            variant="outline"
            size="md"
            mt="0.5rem"
            fullWidth
          >
            Use Script
          </Button>
        </Stack>
      </Paper>
    </>
  )
}
