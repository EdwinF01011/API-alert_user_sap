import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(express.urlencoded({ extended: true }));
// app.use(express.json({
//     type: '*/*'
// }));
app.use(express.json());

app.listen(8080, () => {
    console.log("Server running 8080port                              ＼(ﾟｰﾟ＼)");
})

export default app;