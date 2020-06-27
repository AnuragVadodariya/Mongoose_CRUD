const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mongoose_crud',{
    useUnifiedTopology:true,
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false
});