import { Link as MuiLink } from "@mui/material"
import Link from "next/link"
import { RoundedBox } from "./RoundedBox"

export const OpenSourceMemo = () => (
  <RoundedBox>
    <b>Would you like to build similar app?</b> Feel free to browse the&nbsp;
    <Link href="https://github.com/mateuszsokola/eth-faucet" passHref>
      <MuiLink target="_blank" rel="noopener referrer">
        source code on Github
      </MuiLink>
    </Link>
  </RoundedBox>
)
