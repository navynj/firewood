const clues = require('./clues.json');
const trees = require('./trees.json');

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
  const name = action.params.name;
  const responseBody = {
    version: '2.0',
    templates: {
      outputs: [
        {
          simpleText: {
            text: `${clues[name]} : 테스트`,
          },
        },
      ],
    },
    data: {
      clue: `${clues[name]} : 테스트`,
    },
  };

  res.status(200).send(responseBody);
});

apiRouter.post('/tree', (req, res) => {
  const { action } = req.body;
  const { name, tree } = action.params;
  const { tree: target } = trees[name];

  if (tree === target) {
    var outputs = [
      {
        simpleText: {
          text: '나무를 다시 찾아보세요.',
        },
      },
    ];
  } else {
    var outputs = [
      {
        simpleImage: {
          imageUrl: trees[name],
          altText: '팀원을 찾을 수 있는 나무조각',
        },
      },
    ];
  }

  const responseBody = {
    version: '2.0',
    templates: { outputs },
  };

  res.status(200).send(responseBody);
});

app.listen(8000, () => {
  console.log('Server is running 🚀');
});
