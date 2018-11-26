import request from '@/utils/request';
import moment from 'moment';


export function fetchList(name,phone,currentPage,pageSize){
    return request(`/api/user/query?name=${name}&phone=${phone}&currentPage=${currentPage}&pageSize=${pageSize}`);
}
//新增，修改用户
export async function add (payload) {

    let { id, name, phone, loginName, userNo } = payload;
    console.log("/api/user/add-" ,payload)
    let formData = new FormData();
    formData.append("id",id);
    formData.append("name",name);
    formData.append("loginName",loginName);
    formData.append("phone",phone);
    formData.append("userNo",userNo);
  
    return request('/api/user/add',{ method: 'POST',body: formData});
}
//删除文章。
export async function remove(payload) {
    return request('/api/user/remove',{ method: 'POST',body: payload.key});
}
