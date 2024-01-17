const clues = require('./data/clues.json');
const trees = require('./data/trees.json');

const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');

const apiRouter = express.Router();

app.use(logger('dev', {}));
app.use(bodyParser.json());
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.status(200).send({
    success: true,
  });
});

apiRouter.post('/clue1', (req, res) => {
  const { action } = req.body;
  const name = action.detailParams.name.origin;
  const responseBody = {
    version: '2.0',
    data: {
      clue: clues[name],
    },
  };

  res.status(200).send(responseBody);
});

apiRouter.post('/tree', (req, res) => {
  console.log(req.body);
  const { action } = req.body;
  const { name: nameObj, tree: treeObj } = action.detailParams;

  const name = nameObj.origin;
  const tree = treeObj.origin;

  const { tree: target, image: imageUrl } = trees[name];

  if (tree && target && tree === target && trees[name]) {
    var outputs = [
      {
        simpleImage: {
          imageUrl,
          altText: '팀원을 찾을 수 있는 나무조각',
        },
      },
    ];
  } else {
    var outputs = [
      {
        simpleText: {
          text: '나무를 다시 찾아보세요.',
        },
      },
    ];
  }

  const responseBody = {
    version: '2.0',
    template: { outputs },
  };

  res.status(200).send(responseBody);
});

app.listen(8000, () => {
  console.log('Server is running 🚀');
});
