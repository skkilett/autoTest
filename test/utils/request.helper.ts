import { IncomingHttpHeaders } from 'node:http';
import * as request from 'superagent';

export const apiClient = {
  post: async (url: string, body: object, headers: IncomingHttpHeaders = {}) => {
    return request
      .post(url)
      .send(body)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set(headers)
      .buffer(true)  // <-- Это поможет обрабатывать gzip-сжатый контент
      .timeout(5000);
  },
};
