const express=require('express');
require('./db/mongoose');
const useRouter=require('./routers/user');
const friRouter=require('./routers/friends');
const taskRouter=require('./routers/task');
const app=new express();

app.use(express.json());

//for users

app.use(useRouter);

//for tasks

app.use(taskRouter);

//for friends

app.use(friRouter);


app.listen(8080,() => {
    console.log('server listen in port ');
});
