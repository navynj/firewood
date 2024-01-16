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
    const clues = {
        "이윤지": "이 사람의 이름 초성은 ㅇㅇㅈ이다."
    }
    const responseBody = {
        version: '2.0',
        data: {
            clue: clues[name]
        }
    };

    res.status(200).send(responseBody);
});

app.listen(8000, () => {
    console.log('Server is running 🚀');
});
