import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent(payload) {
  const { userId } = payload;
  return request(`/api/user/currentUser?userId=${userId}`);
}
