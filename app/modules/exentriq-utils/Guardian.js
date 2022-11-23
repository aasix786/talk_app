import { config } from '../../lib/constants/config';
const EXENTRIQ_URL_HOST = config.stage.URL_EXENTRIQ_HOST;

const Guardian = new (class {
  async fetch(url, options, raw = false) {
    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then(async (response) => {
          if (!response.ok) {
            const error = new Error(response.statusText);
            error.response = response;
            reject(error);
          } else {
            if (raw) {
              response.text().then(resolve);
              return;
            }
            const body = JSON.parse(await response.text());
            const { result } = body;
            if (result) {
              const { list } = result;
              if (list) {
                resolve(list.list || list);
                return;
              }
              resolve(result);
              return;
            }
            resolve(body);
          }
        })
        .catch((error) => reject(error));
    });
  }

  async call(method, params, sessionToken = null, raw = false) {
    let url = EXENTRIQ_URL_HOST;
    const timestamp = new Date().getTime();
    if (sessionToken) {
      url += `?sid=${sessionToken}&timestamp=${timestamp}`;
    } else {
      url += `?timestamp=${timestamp}`;
    }
    const options = {
      method: 'POST',
      body: JSON.stringify({ id: '', method, params }),
    };
    return this.fetch(url, options, raw);
  }

  async callUrl(url, method, params, sessionToken = null, raw = false) {
    let urlToCall = url;
    const timestamp = new Date().getTime();
    if (sessionToken) {
      urlToCall += `?sid=${sessionToken}&timestamp=${timestamp}`;
    } else {
      urlToCall += `?timestamp=${timestamp}`;
    }
    const options = {
      method: 'POST',
      body: JSON.stringify({ id: '', method, params }),
    };
    return this.fetch(urlToCall, options, raw);
  }
})();

export default Guardian;
