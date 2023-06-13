import { graphql } from '@/__generated__/gql'
import { useGraphQL } from '@/queries/config'
import { css } from '@emotion/react'
import { useParams } from 'react-router-dom'

const document = graphql(`
    query PostDetailQuery($id: Int!) {
        post(id: $id) {
            userId
            title
            body
        }
        comments(id: $id) {
            id
            name
            email
            body
        }
    }
`)

export default function PostDetailPage() {
    const { id } = useParams() as { id: string }
    const { data } = useGraphQL(document, { variables: { id: +id } })

    const { post, comments } = data

    return (
        <>
            <p css={titleCss}>포스트 상세</p>
            <div css={wrapperCss}>
                <span>유저 Id : {post.userId}</span>
                <span>제목 : {post.title}</span>
                <span>내용 : {post.body}</span>
            </div>
            <p css={titleCss}>댓글 상세</p>
            <div css={wrapperCss}>
                {comments.map(({ id, name, email, body }) => (
                    <div css={commentCss} key={id}>
                        <span>이름: {name}</span>
                        <span>이메일 : {email}</span>
                        <span>내용 : {body}</span>
                    </div>
                ))}
            </div>
        </>
    )
}

const titleCss = css`
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 18px;
`

const wrapperCss = css`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;

    :not(:last-of-type) {
        margin-bottom: 30px;
    }
`

const commentCss = css`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 0;

    :not(:last-of-type) {
        border-bottom: 1px solid #ddd;
    }
`
