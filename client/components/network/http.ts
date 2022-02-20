export default class HttpClient<T extends HTMLElement> {
  protected readonly baseURL: string;
  protected readonly authErrorEventBus: T;
  constructor(baseURL: string, authErrorEventBus: T) {
    this.baseURL = baseURL;
    this.authErrorEventBus = authErrorEventBus;
  }

  async fetch(url: string, options: RequestInit) {
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    let data;
    try {
      data = await res.json();
    } catch (error) {
      console.error(error);
    }

    // fetch API는 status가 200이 아닌 경우에도 데이타가 오는 경우도 있기 때문에 추가적인 확인이 필요함
    if (res.status > 299 || res.status < 200) {
      // 데이타가 있고 그 데이타에 message가 존재한다면 message를 사용하고 없다면
      const message =
        data && data.message ? data.message : 'Something went wrong! 🤪';
      const error = new Error(message);
      if (res.status === 401) {
        // this.authErrorEventBus.notify(error);
        return;
      }
      throw error;
    }
    return data;
  }
}
