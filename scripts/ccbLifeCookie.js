const cookieName = '建行生活签到';
const signUrlKey = 'photonmang_signurl_jhsh';
const signHeaderKey = 'photonmang_signheader_jhsh';
const signBodyKey = 'photonmang_signbody_jhsh';
const photonmang = init();

if ($request && $request.method != 'OPTIONS') {
  const signUrlVal = $request.url;
  const signHeaderVal = JSON.stringify($request.headers);
  const signBodyVal = JSON.stringify($request.body);

  console.log(`签到URL：${signUrlVal}`);
  console.log(`签到header：${signHeaderVal}`);
  console.log(`签到Body：${signBodyVal}`);

  if (signUrlVal) photonmang.setdata(signUrlVal, signUrlKey);
  if (signHeaderVal) photonmang.setdata(signHeaderVal, signHeaderKey);
  if (signBodyVal) photonmang.setdata(signBodyVal, signBodyKey);

  photonmang.msg(cookieName, `获取Cookie: 成功`, ``);
}

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true;
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true;
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return {isSurge, isQuanX, msg, log, getdata, setdata, get, post, done}
}

photonmang.done()
