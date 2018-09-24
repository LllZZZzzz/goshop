function func(val) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      if(val%2==0){
        resolve(val)
      }else {
        reject("您的输入有误")
      }
    },300)
  })
}
func(2).then((val)=>{
  console.log(val*val)
},(err)=>{
  console.log(err)
})
