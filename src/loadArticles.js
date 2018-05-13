export default () => {
  const request = new XMLHttpRequest();
  request.open(
    'GET',
    `${process.env.REACT_APP_HOST}/data/more-articles.json`,
    true
  );

  return new Promise(function(resolve, reject) {
    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        resolve(JSON.parse(this.response));
      }
    };

    request.onerror = function(err) {
      console.error(err);
    };

    request.send();
  });
};
