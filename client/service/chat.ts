import { FC } from 'react';

export default class ChatService {
  // protected http: any;
  // protected tokenStorage: FC;
  // protected socket: any;
  // // 외부로부터 baseURL을 받아옴
  // constructor(http: any, tokenStorage: any, socket: any) {
  //   this.http = http;
  //   this.tokenStorage = tokenStorage;
  //   this.socket = socket;
  // }
  // async getTweets(username: string) {
  //   // 특정한 username을 받아오는 경우
  //   const query = username ? `?username=${username}` : '';
  //   return this.http.fetch(`/tweets${query}`, {
  //     // 서버에 get 요청을하여 header에 token를 줍니다.
  //     method: 'GET',
  //     headers: this.getHeaders(),
  //   });
  // }
  // async postTweet(text: string) {
  //   return this.http.fetch(`/tweets`, {
  //     method: 'POST',
  //     headers: this.getHeaders(),
  //     // object를 json형태로 넘겨주는 기능
  //     body: JSON.stringify({ text, username: 'ellie', name: 'Ellie' }),
  //   });
  // }
  // getHeaders() {
  //   const token = this.tokenStorage.getToken();
  //   return {
  //     Authorization: `Bearer ${token}`,
  //   };
  // }
  // onSync(callback) {
  //   return this.socket.onSync('tweets', callback);
  // }
}
