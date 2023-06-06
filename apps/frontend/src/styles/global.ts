import reset from '@/styles/reset'
import { css } from '@emotion/react'

const global = css`
    ${reset}

    * {
        box-sizing: border-box;
    }

    html,
    body,
    #root {
        width: 100%;
        height: 100%;
    }
`

export default global
