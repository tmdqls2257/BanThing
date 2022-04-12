import axios, { AxiosResponse } from 'axios';
// axios를 사용할 수 있게 객체 지향형으로 제작을 해주었습니다.
export default class AxiosClient {
  protected baseURL: string;
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async axios(url: string, options: any) {
    try {
      const res: AxiosResponse<any, any> = await axios(
        `${this.baseURL}${url}`,
        {
          ...options,
          headers: {
            ...options.headers,
          },
        },
      );

      // 요청의 status가 200번때가 아닐 경우
      // data.message를 보내주고
      // 400번때이면 error를 보내줍니다.
      if (res.status > 299 || res.status < 200) {
        const message =
          res.data && res.data.message
            ? res.data.message
            : 'Something went wrong';
        const error = new Error(message);
        if (res.status === 401) {
          console.log(error);
        }
      }
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
}
