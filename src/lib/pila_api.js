
class PilaAPI {
  constructor() {
  }

  getDvds(url, callback) {
    console.log('Getting DVDs...');
    fetch(url + '/dvds.json')
      .then((response) => response.text())
      .then((responseText) => {
        var dvds = JSON.parse(responseText);
        callback(dvds);
      })
      .catch((error) => {
        console.log('Can not get DVDs...');
      });
  }

  getDvd(url, dvdId, callback) {
    console.log('Getting DVD...');
    fetch(url + '/dvds/' + dvdId + '.json')
      .then((response) => response.text())
      .then((responseText) => {
        var dvd = JSON.parse(responseText);
        callback(dvd);
      })
      .catch((error) => {
        console.log('Can not get DVD...');
      });
  }
}

export default PilaAPI;
