const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');

const apiRouter = express.Router();

app.use(logger('dev', {}));
app.use(bodyParser.json());
app.use('/api', apiRouter);

apiRouter.get('/clue1', (req, res) => {
    const name = req.query.name;
    const responseBody = {
        version: '2.0',
        template: {
            outputs: [
                {
                    simpleText: {
                        text: name + ': 이 사람은 특징 1을 가지고 있다.'
                    }
                }
            ]
        }
    };

    res.status(200).send(responseBody);
});

app.listen(5000, () => {
    console.log('listion on port 5000');
});
