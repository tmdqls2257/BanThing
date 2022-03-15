import axios, { AxiosResponse } from 'axios';

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
