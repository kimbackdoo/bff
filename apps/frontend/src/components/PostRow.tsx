import { graphql } from '@/__generated__'
import { Post } from '@/__generated__/graphql'
import { useGraphQLMutation } from '@/queries/config'
import { css } from '@emotion/react'
import { MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
    post: Post
}

const document = graphql(`
    mutation PostMutation($id: Int!) {
        deletePost(id: $id) {
            code
            success
            message
        }
    }
`)

export default function PostRow({ post }: Props) {
    const { id, userId, title, body } = post

    const navigate = useNavigate()
    const { mutate } = useGraphQLMutation(document)
    const [isHover, setIsHover] = useState(false)

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        mutate(
            { id: +id },
            {
                onSuccess: () => window.alert(`${id} 게시글이 삭제되었습니다.`),
            }
        )
    }

    return (
        <tr
            css={[trCss, isHover && hoverCss]}
            onClick={() => navigate(`/posts/${id}`)}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <td>{userId}</td>
            <td>{title}</td>
            <td>{body}</td>
            {isHover && (
                <td>
                    <button css={buttonCss} type="button" onClick={handleClick}>
                        삭제
                    </button>
                </td>
            )}
        </tr>
    )
}

const trCss = css`
    position: relative;
    transition: background-color 0.2s;
    cursor: pointer;
`

const hoverCss = css`
    background-color: #f5f5f5;
`

const buttonCss = css`
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: #f08080;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
`
