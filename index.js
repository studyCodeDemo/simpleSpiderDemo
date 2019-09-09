const Koa=require('koa');
const app=new Koa();
const router=require('koa-router')();
const views=require('koa-views');
var path=require('path');
app.use(views(path.join(__dirname,"./views"),{extension:'ejs'}));
router.use('/poetry',require('./routers/poetry').routes());
router.get("*",function(ctx){
  ctx.body="对不起找不到页面拉";
});


app.use(router.routes());
app.use(router.allowedMethods());
app.listen(9200);
