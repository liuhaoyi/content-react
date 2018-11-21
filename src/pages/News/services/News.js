import request from '@/utils/request';
import moment from 'moment';

//获取文章列表
export function fetchArticleBySmallCatalog(smallCatalog,currentPage,pageSize){
    return request(`/api/queryArticleBySmallCatalog?smallCatalog=${smallCatalog}&currentPage=${currentPage}&pageSize=${pageSize}`);
}

export function fetchArticleList(smallCatalog,title,fromDate,toDate,currentPage,pageSize){
    return request(`/api/queryArticleList?smallCatalog=${smallCatalog}&title=${title}&fromDate=${fromDate}&toDate=${toDate}&currentPage=${currentPage}&pageSize=${pageSize}`);
}
//新增，修改 文章。
export async function addArticle (payload) {

    let { id, title,editor,smallCatalog, publishDate, img ,content} = payload;
    console.log("myload=" ,payload)
    let formData = new FormData();
    formData.append("id",id);
    formData.append("title",title);
    formData.append("editor",editor);
    if(img && img.length>0){
        formData.append("img",img[0].thumbUrl);
    }
    formData.append("content",content);
    formData.append("publishDate",moment(publishDate).format("YYYY-MM-DD"));
    formData.append("smallCatalog",smallCatalog);

    return request('/api/addArticle',{ method: 'POST',body: formData});
}
//删除文章。
export async function removeArticle (payload) {
    return request('/api/removeArticle',{ method: 'POST',body: payload.key});

    // let { id, title,editor,smallCatalog, publishDate, img ,content} = payload;
    // console.log("myload=" ,payload)
    // let formData = new FormData();
    // formData.append("id",id);
    // formData.append("title",title);
    // formData.append("editor",editor);
    // if(img && img.length>0){
    //     formData.append("img",img[0].thumbUrl);
    // }
    // formData.append("content",content);
    // formData.append("publishDate",moment(publishDate).format("YYYY-MM-DD"));
    // formData.append("smallCatalog",smallCatalog);

    // return request('/api/removeArticle',{ method: 'POST',body: formData});
}
