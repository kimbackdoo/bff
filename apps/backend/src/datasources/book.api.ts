import { BookList, QueryBooksArgs } from '@/__generated__/types'
import { generateQueryParams } from '@/utils/generate'
import { AugmentedRequest, RESTDataSource } from '@apollo/datasource-rest'

export default class BookAPI extends RESTDataSource {
    override baseURL = process.env.NAVER_BASE_API_URL

    async getBooks(params: Partial<QueryBooksArgs>): Promise<BookList> {
        const queryParams = generateQueryParams(params)
        return this.get('book', { params: queryParams })
    }

    protected override willSendRequest(_: string, request: AugmentedRequest) {
        request.headers = {
            ...request.headers,
            'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID!,
            'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET!,
        }
    }
}
