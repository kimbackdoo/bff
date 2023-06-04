import { Resolvers } from '@/__generated__/types'
import HttpStatus from '@/utils/http.status'

const resolvers: Resolvers = {
    Query: {
        posts: async (_, __, { dataSources }) => {
            return dataSources.jsonPlaceholderAPI.getPosts()
        },
        post: async (_, { id }, { dataSources }) => {
            return dataSources.jsonPlaceholderAPI.getPost(id)
        },
        comments: async (_, { id }, { dataSources }) => {
            return dataSources.jsonPlaceholderAPI.getComments(id)
        },
    },
    Mutation: {
        postPost: async (_, params, { dataSources }) => {
            const post = await dataSources.jsonPlaceholderAPI.postPost(params)
            return {
                code: HttpStatus.CREATED,
                success: true,
                message: '게시글이 성공적으로 등록되었습니다.',
                post,
            }
        },
        putPost: async (_, params, { dataSources }) => {
            const post = await dataSources.jsonPlaceholderAPI.putPost(params)
            return {
                code: HttpStatus.OK,
                success: true,
                message: '게시글이 성공적으로 수정되었습니다.',
                post,
            }
        },
        patchPost: async (_, params, { dataSources }) => {
            const post = await dataSources.jsonPlaceholderAPI.patchPost(params)
            return {
                code: HttpStatus.OK,
                success: true,
                message: '게시글이 성공적으로 수정되었습니다.',
                post,
            }
        },
        deletePost: async (_, { id }, { dataSources }) => {
            await dataSources.jsonPlaceholderAPI.deletePost(id)
            return {
                code: HttpStatus.OK,
                success: true,
                message: '게시글이 성공적으로 삭제되었습니다.',
            }
        },
    },
}

export default resolvers
