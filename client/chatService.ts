export default class ChatService {
  protected http: any;
  constructor(http: any) {
    this.http = http;
  }

  async getChats(roomId: number) {
    return this.http.axios({
      method: 'get',
      url: `/post/reply/${roomId}`,
      headers: this.getHeaders(),
    });
  }

  async postChats(roomId: number) {
    return this.http.axios({
      method: 'get',
      url: `/post/reply/${roomId}`,
      headers: this.getHeaders(),
    });
  }

  getHeaders() {
    let cookie = document.cookie;
    let cookieToken;
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
      const headers = {
        Authorization: `Bearer ${cookieToken}`,
      };
      return headers;
    }
  }
}
