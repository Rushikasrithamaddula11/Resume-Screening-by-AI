const { PythonShell } = require('python-shell');
const path = require('path');

const predictCategory = (filePath) => {
  return new Promise((resolve, reject) => {
    const options = {
      mode: 'text',
      pythonOptions: ['-u'],
      scriptPath: path.join(__dirname, '../models'),
      args: [filePath]
    };

    PythonShell.run('predict.py', options, (err, results) => {
      if (err) return reject(err);
      try {
        const output = JSON.parse(results[0]);
        if (output.error) {
          return reject(new Error(output.error));
        }
        resolve(output);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
};

module.exports = { predictCategory };