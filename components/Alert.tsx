import { Alert as MuiAlert, styled } from "@mui/material"

const StyledAlert = styled(MuiAlert)(({ theme }) => ({
  marginTop: theme.spacing(2)
}))

export const Alert = ({ children }: { children: any }) => <StyledAlert severity="error">{children}</StyledAlert>
