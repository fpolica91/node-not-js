
const {PassThrough, pipeline, Transform} = require('stream')
const fs = require('fs')

const passThrough = new PassThrough();
const input = fs.createReadStream('pipeline_in.txt');
const output = fs.createWriteStream('pipeline_out.txt')


// pipeline(input, passThrough, output, err =>{
//   if(err){
//     console.log('pipeline has failed', err.message)
//   }else{
//     console.log('pipeline ended successfully')
//   }
// })
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback){
    // chunk is converted to strinng, because it is orignaly buffer
    callback(null, chunk.toString().toUpperCase())
  }
})

// Takes user input and converts it to uppercase.
pipeline(process.stdin, upperCaseTransform, process.stdout, error =>{
  if(error) console.log('error executing pipeline', error.message)
  else console.log('pipeline successfully executed')
})