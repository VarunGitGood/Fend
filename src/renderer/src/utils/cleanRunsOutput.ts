export const cleanRunsOutput = (output: string): string => {
  output = output.replaceAll('"', '`')
  return output
}
