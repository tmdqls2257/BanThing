import AxiosClient from './axios';

// axios class를 이용하여 chating을 보내줄 수 있는
export default class ChatService {
  protected http: AxiosClient;
  constructor(http: AxiosClient) {
    this.http = http;
  }

  // 채팅을 받아옵니다.
  async getChats(roomId: number) {
    return this.http.axios(`/post/reply/${roomId}`, {
      method: 'get',
      headers: this.getHeaders(),
    });
  }

  // 채팅을 보냅니다.
  async postChats(roomId: number, chat: string) {
    return this.http.axios(`/post/reply/`, {
      method: 'post',
      data: {
        post_id: roomId,
        reply: chat,
      },
      headers: this.getHeaders(),
      withCredentials: true,
    });
  }

  // cookie의 accessToken을 받아옵니다.
  getHeaders() {
    let cookie = document.cookie;
    let cookieToken;
    let headers;
    if (cookie.includes(';') && cookie.includes('accessToken')) {
      const cookieList = cookie.split(';');
      const findAccessToken = cookieList.filter((cookie: string) => {
        return cookie.includes('accessToken');
      });
      cookieToken = findAccessToken[0].split('=')[1];
    } else if (!cookie.includes(';') && cookie.includes('accessToken')) {
      cookieToken = cookie.split('=')[1];
    }
    if (cookieToken) {
      headers = {
        Authorization: `Bearer ${cookieToken}`,
      };

      return headers;
    }
  }
}
