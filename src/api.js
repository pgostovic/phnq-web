let models = {};
let resolveApi;
let resolveModel;
let resolveOnApiError;

export const onApiError = new Promise(r => {
  resolveOnApiError = r;
});

export const model = new Promise(r => {
  resolveModel = r;
});

export default new Promise(r => {
  resolveApi = r;
});

export const modelPropType = name => (p, pName, componentName) => {
  const val = p[pName];
  if (!val) {
    return null;
  }
  const Model = models[name];
  if (!(val instanceof Model)) {
    return new Error(`${componentName}.${pName} should be ${name}`);
  }
  return null;
};

export const modelForName = name => models[name];

window.apiLoaded = (api, onError, _models) => {
  window.api = api;
  resolveApi(api);
  resolveModel((models = _models));
  resolveOnApiError(onError);
};

const script = window.document.createElement('script');
script.src = 'http://localhost:9090/phnqapi.js';
script.async = true;
script.defer = true;
window.document.head.appendChild(script);
