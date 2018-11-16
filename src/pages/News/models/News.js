import * as svc from '../services/News';

export default {
    namespace: 'news',
     
    // state: {
    //     newsList: [],
    //     pageNo: null,
    //     pageSize: null,
    // },

    state: {
        data: {
          list: [],
          pagination: {},
        },
        // list: dataSource,
        // pagination: {
        //   total: dataSource.length,
        //   pageSize,
        //   current: parseInt(params.currentPage, 10) || 1,
        // },
    },
    reducers: {
        loadArticleBySmallCatalog(state,{payload}){
            return { ...state,...payload };
        },
    },

    effects:{

        *fetchArticleBySmallCatalog({payload},{ call, put, select }){
            let { smallCatalog, currentPage,pageSize} = payload;
            currentPage = currentPage - 1;
            const { data } = yield call(svc.fetchArticleBySmallCatalog,smallCatalog,currentPage,pageSize);
            yield put({
                    type: 'loadArticleBySmallCatalog',
                    payload: {
                        data: data,
                    },
                });
        },
        *addArticle({payload},{call,put}){
            // let {id,title,content,img,editor,publishDate,smallCatalog} = payload;
            console.log("payload---" + payload);
            const { data } = yield call(svc.addArticle,payload);
            console.log(data);
        }
    },

    subscriptions: {
    },
}

