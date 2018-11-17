import request from '@/utils/request';

//获取文章列表
export function fetchArticleBySmallCatalog(smallCatalog,currentPage,pageSize){
    return request(`/api/queryArticleBySmallCatalog?smallCatalog=${smallCatalog}&currentPage=${currentPage}&pageSize=${pageSize}`);
}

export async function addArticle (payload) {

    let { title,editor,smallCatalog, content} = payload;
    let formData = new FormData();
    // formData.append("id","123456");
    formData.append("title",title);
    formData.append("editor",editor);
    formData.append("smallCatalog",smallCatalog);
    formData.append("content",content);

    return request('/api/addArticle',{ method: 'POST',body: formData});
};
