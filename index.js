const clues = require('./clues.json');

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
  const name = action.params.name;
  const responseBody = {
    version: '2.0',
    templates: {
      outputs: [
        {
          simpleImage: {
            imageUrl:
              'https://github.com/navynj/earlyblue/blob/main/asset/2024_%EA%B2%A8%EC%9A%B8%EC%BA%A0%ED%94%84%ED%8F%AC%EC%8A%A4%ED%84%B0_%EB%AA%A8%EB%8B%A5%EB%B6%88.png?raw=true',
            altText: '팀원을 찾을 수 있는 나무조각',
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

app.listen(8000, () => {
  console.log('Server is running 🚀');
});
