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
        data: {
            clue: `${name}: 이 사람은 특징 1을 가지고 있다.`
        }
    };

    res.status(200).send(responseBody);
});

app.listen(8000, () => {
    console.log('Server is running 🚀');
});
