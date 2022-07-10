import { styled } from "@mui/material"

export const Item = styled("div")(({ theme }) => ({
  display: "flex",
  margin: `${theme.spacing(1)} 0`,
  ...theme.typography.body2,
  "& > span": {
    flex: 1
  },
  "& > span:last-child": {
    textAlign: "right"
  }
}))
