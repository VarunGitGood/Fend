import { Box, Checkbox, Flex, Text } from '@mantine/core'
import { useScriptStore } from '@renderer/store/useScriptStore'
import { useParams } from 'react-router-dom'

function Chip({ children }: { children: string }): JSX.Element {
  return (
    <Box bg="#F6F6F6" p="0.125rem 0.5rem" style={{ display: 'inline-block', borderRadius: '1rem' }}>
      <Text fz="0.75rem" fw={500} c="#475467">
        {children}
      </Text>
    </Box>
  )
}

export default function SingleScript(): JSX.Element {
  const { scriptName } = useParams()
  const { myScripts } = useScriptStore()
  const script = myScripts.find((s) => s.scriptName === scriptName)

  //groupby module for adv
  const modules = script?.advancedConfig.reduce((r, a) => {
    r[a.module] = [...(r[a.module] || []), a]
    return r
  }, {})

  console.log(modules, 'group by modules')

  return (
    <Box p="md">
      <Text fz="2.25rem" fw="600" lh="2.75rem" mb="lg">
        {scriptName}
      </Text>
      <Text fz="1.125rem" fw="600" lh="1.75rem">
        Description
      </Text>
      <Text fz="1rem" fw="400" lh="1.75rem" mb="md">
        {script?.scriptDescription}
      </Text>
      <Text fz="1.125rem" fw="600" lh="1.75rem">
        Modules
      </Text>
      <Box mt="0.5rem">
        {script?.myConfig &&
          script?.myConfig.map((config) => (
            <Chip key={config.module}>{config.module.toUpperCase()}</Chip>
          ))}
      </Box>
      {modules && (
        <>
          <Text fz="1.125rem" fw="600" lh="1.75rem" mt="2rem">
            Advanced Modules
          </Text>
          <Box mt="0.5rem">
            {Object.entries(modules).map(([key, value]) => (
              <Box key={key}>
                <Text fz="1.1rem" fw="600" lh="1.75rem" mb="md">
                  {key.toUpperCase()}
                </Text>
                <Box mb="xl">
                  {value.map((advConfig, idx) => (
                    <Box key={idx} mb={10}>
                      {advConfig.tag === 'checkbox' && (
                        <Checkbox
                          key={advConfig.label}
                          checked={advConfig.current}
                          label={advConfig.label}
                          readOnly
                          my={20}
                        />
                      )}
                      {advConfig.tag === 'list' && (
                        <>
                          <Text mb={10}>{advConfig.label}</Text>
                          <Flex gap={10} wrap="wrap">
                            {advConfig.current.map((item, idx) => (
                              <Chip key={idx}>{item}</Chip>
                            ))}
                          </Flex>
                        </>
                      )}
                      {advConfig.tag === 'number' && (
                        <Box>
                          <Text mb={10}>{advConfig.label}</Text>
                          <Text>{advConfig.current}</Text>
                        </Box>
                      )}
                      {advConfig.tag === 'text' && (
                        <Flex gap={10}>
                          <Text mb={10}>{advConfig.label}:</Text>
                          <Text c="gray">{advConfig.current}</Text>
                        </Flex>
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  )
}
