import * as svc from '../services/News';
import moment from 'moment';

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
        loadArticleList(state,{payload}){
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

        *fetchArticleList({payload},{ call, put }){

            let { smallCatalog, title,date,currentPage,pageSize} = payload;
            if(!title) title=""; 
            let fromDate = "";
            let toDate = "";
            if(date && date.length>0){
                fromDate = moment(date[0]).format("YYYY-MM-DD");
                toDate = moment(date[1]).format("YYYY-MM-DD");
            }
            currentPage = currentPage - 1;
            const { data } = yield call(svc.fetchArticleList,smallCatalog,title,fromDate,toDate,currentPage,pageSize);
            yield put({
                    type: 'loadArticleList',
                    payload: {
                        data: data,
                    },
                });
        },

        *addArticle({payload},{call,put}){
            // let {id,title,content,img,editor,publishDate,smallCatalog} = payload;
            let { smallCatalog } = payload;
            console.log("payload---" + payload);
            const { data } = yield call(svc.addArticle,payload);
            console.log(data);


            yield put({
                type: 'news/fetchArticleList',
                payload: {
                  smallCatalog: smallCatalog,
                  title: "",
                  date: [],
                  currentPage: 1,
                  pageSize: 10,
                },
              });
        },

        *removeArticle({payload},{call,put}){
            let { smallCatalog } = payload;
            const { data } = yield call(svc.removeArticle,payload);
            console.log(data);
            yield put({
                type: 'news/fetchArticleList',
                payload: {
                  smallCatalog: smallCatalog,
                  title: "",
                  date: [],
                  currentPage: 1,
                  pageSize: 10,
                },
              });
        }
    },

    subscriptions: {
    },
}

