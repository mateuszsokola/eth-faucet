import { Alert as MuiAlert, AlertProps, styled } from "@mui/material"

const StyledAlert = styled(MuiAlert)(({ theme }) => ({
  marginTop: theme.spacing(2)
}))

export const Alert = ({ children, severity }: AlertProps) => <StyledAlert severity={severity}>{children}</StyledAlert>
