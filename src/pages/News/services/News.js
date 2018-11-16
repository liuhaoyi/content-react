import request from '@/utils/request';

//获取文章列表
export function fetchArticleBySmallCatalog(smallCatalog,currentPage,pageSize){
    return request(`/api/queryArticleBySmallCatalog?smallCatalog=${smallCatalog}&currentPage=${currentPage}&pageSize=${pageSize}`);
}

export function addArticle (payload) {

    let { title,editor } = payload;
    let formData = new FormData();
    formData.append("id","123456");
    formData.append("title",title);
    formData.append("editor",editor);

    // let json = {

    // }
    return request('/api/addArticle',{ method: 'POST',body: payload});
};
