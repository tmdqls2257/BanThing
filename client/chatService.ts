export default class ChatService {
  protected http: any;
  constructor(http: any) {
    this.http = http;
  }

  async getChats(roomId: number) {
    return this.http.axios(`/post/reply/${roomId}`, {
      method: 'get',
      headers: this.getHeaders(),
    });
  }

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
