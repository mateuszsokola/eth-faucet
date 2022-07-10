import { Typography, Link as MuiLink } from "@mui/material"
import Link from "next/link"
import { RoundedBox } from "./RoundedBox"

export const OpenSourceMemo = () => (
  <RoundedBox>
    <b>Would you like to build similar app?</b> Feel free to browse code or watch the entire tutorial on YouTube:
    <ul>
      <li>
        <Link href="https://github.com/mateuszsokola/eth-faucet" passHref>
          <MuiLink target="_blank" rel="noopener referrer">
            Source Code (Github)
          </MuiLink>
        </Link>
      </li>
      <li>
        <Link href="https://www.youtube.com/channel/UCJV16_5c4A0amyBZSI4yP6A" passHref>
          <MuiLink target="_blank" rel="noopener referrer">
            Tutorial (YouTube video)
          </MuiLink>
        </Link>
      </li>
    </ul>
  </RoundedBox>
)
