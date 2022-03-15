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

  async postChats(post_id: number, reply: string) {
    return this.http.axios({
      method: 'post',
      url: `/post/reply/`,
      headers: this.getHeaders(),
      data: {
        post_id,
        reply,
      },
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
