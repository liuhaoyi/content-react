import * as svc from '../services/MyUser';
import moment from 'moment';

export default {
    namespace: 'myuser',
     
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
        loadList(state,{payload}){
            return { ...state,...payload };
        },
    },

    effects:{
        *fetchList({payload},{ call, put }){

            let { name, phone,currentPage,pageSize} = payload;
          
            currentPage = currentPage - 1;
            if(!name) name='';
            if(!phone) phone='';
            
            const { data } = yield call(svc.fetchList,name,phone,currentPage,pageSize);
            yield put({
                    type: 'loadList',
                    payload: {
                        data: data,
                    },
                });
        },

        *add({payload},{call,put}){
            console.log("payload---" + payload);
            const { data } = yield call(svc.add,payload);
            console.log(data);

            yield put({
                type: 'myuser/fetchList',
                payload: {
                  name: "",
                  phone: "",
                  currentPage: 1,
                  pageSize: 10,
                },
              });
        },

        *remove({payload},{call,put}){
            // let { smallCatalog } = payload;
            const { data } = yield call(svc.remove,payload);
            console.log(data);
            yield put({
                type: 'myuser/fetchList',
                payload: {
                  name: "",
                  phone: "",
                  currentPage: 1,
                  pageSize: 10,
                },
              });
        }
    },

    subscriptions: {
    },
}

