const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, breedString) => {
      if (err) reject('file not found');
      resolve(breedString);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file 😢');
      resolve('success');
    });
  });
};

const getDogPic = async () => {
  try {
    const breedString = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`breed: ${breedString}`);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${breedString}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${breedString}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${breedString}/images/random`
    );
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Image saved successfully');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return 'steady';
};

(async () => {
  try {
    console.log('ready');
    const x = await getDogPic();
    console.log(x);
    console.log('go');
  } catch (err) {
    console.log(err);
  }
})();

// readFilePro(`${__dirname}/dog.txt`)
//   .then((breedString) => {
//     console.log(`breed: ${breedString}`);
//     return superagent.get(
//       `https://dog.ceo/api/breed/${breedString}/images/random`
//     );
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     writeFilePro('dog-img.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('Image saved successfully');
//   })
//   .catch((err) => {
//     err.message;
//   });
