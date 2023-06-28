import { Box } from '@mui/material'
import { styled } from '@mui/system'

const WidgetWrapper = styled(Box)(({ theme }) => ({
  paddingTop:"1.5rem",
  paddingBottom:"0.75rem",
  paddingInline: '1.5rem',
  backgroundColor: theme.palette.background.alt,
  borderRadius: '0.75rem',
}))
export default WidgetWrapper
