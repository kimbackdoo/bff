import { graphql } from '@/__generated__/gql'
import PostRow from '@/components/PostRow'
import { useGraphQL } from '@/queries/config'
import { css } from '@emotion/react'

const document = graphql(`
    query PostsQuery {
        posts {
            id
            userId
            title
            body
        }
    }
`)

export default function PostPage() {
    const { data } = useGraphQL(document)

    return (
        <table css={tableCss}>
            <colgroup>
                <col width="10%" />
                <col width="30%" />
                <col width="60%" />
            </colgroup>
            <thead>
                <tr>
                    <th>유저 ID</th>
                    <th>제목</th>
                    <th>내용</th>
                </tr>
            </thead>
            <tbody>
                {data.posts.map((post) => (
                    <PostRow key={post.id} post={post} />
                ))}
            </tbody>
        </table>
    )
}

const tableCss = css`
    tr {
        border-bottom: 1px solid #ddd;
    }

    th,
    td {
        padding: 10px;
        text-align: left;
        vertical-align: middle;
        line-height: 1.5;
    }
`
