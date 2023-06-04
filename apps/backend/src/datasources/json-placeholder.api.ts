import { Comment, MutationPatchPostArgs, MutationPostPostArgs, MutationPutPostArgs, Post } from '@/__generated__/types'
import { RESTDataSource } from '@apollo/datasource-rest'

export default class JSONPlaceholderAPI extends RESTDataSource {
    override baseURL = process.env.JSON_PLACEHOLDER_BASE_API_URL

    async getPosts(): Promise<Post[]> {
        return this.get('posts')
    }

    async getPost(id: number): Promise<Post> {
        return this.get(`posts/${encodeURIComponent(id)}`)
    }

    async getComments(postId: number): Promise<Comment[]> {
        return this.get(`posts/${encodeURIComponent(postId)}/comments`)
    }

    async postPost(params: MutationPostPostArgs): Promise<Post> {
        return this.post('posts', { body: params })
    }

    async putPost(params: MutationPutPostArgs): Promise<Post> {
        const { id, ...body } = params
        return this.put(`posts/${encodeURIComponent(id)}`, { body })
    }

    async patchPost(params: MutationPatchPostArgs): Promise<Post> {
        const { id, ...body } = params
        return this.patch(`posts/${encodeURIComponent(id)}`, { body })
    }

    async deletePost(id: number): Promise<void> {
        return this.delete(`posts/${encodeURIComponent(id)}`)
    }
}
