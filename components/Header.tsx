import { styled, Typography } from "@mui/material"

const HeaderDiv = styled("div")(({ theme }) => ({
  margin: `0 auto`,
  padding: `${theme.spacing(3)} ${theme.spacing(2)}`,
  minWidth: theme.spacing(40),
  maxWidth: theme.spacing(70),
  width: "100%",
  "& > h1": {
    ...theme.typography.h4,
    marginBottom: theme.spacing(2),
    fontWeight: theme.typography.fontWeightMedium
  }
}))

export const Header = () => {
  return (
    <HeaderDiv>
      <Typography variant="h1">Claim Görli ETH</Typography>
      <Typography variant="body2">
        <b>Görli ETH has no monetary value.</b> It means you can’t sell or exchange it for any goods or services. The
        only utility it has is testing your decentralized application (DApp).
      </Typography>
    </HeaderDiv>
  )
}
