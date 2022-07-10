import { Box, styled } from "@mui/material"

export const RoundedBox = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  margin: `${theme.spacing(2)} auto`,
  padding: theme.spacing(2),
  minWidth: theme.spacing(40),
  maxWidth: theme.spacing(70),
  width: "100%",
  ...theme.typography.body2
}))
