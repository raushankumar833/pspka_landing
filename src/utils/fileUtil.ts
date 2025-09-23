export const urltoFile = (url: string, filename: string, fileType: string) =>
  fetch(url)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], filename, { type: fileType });
    });
