export default () => {
  const request = new XMLHttpRequest();
  request.open('GET', '/data/more-articles.json', true);

  return new Promise(function(resolve, reject) {
    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        resolve(JSON.parse(this.response));
      }
    };

    request.onerror = function(err) {
      console.error(err);
      // There was a connection error of some sort
    };

    request.send();
  });
};
