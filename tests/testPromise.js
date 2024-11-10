// const condition = true;

// let WillPassCode = new Promise(function (resolve,reject){
//     if(condition){
//         let message = 'Code passed';
//         resolve(message);
//     } else{
//        let reason = new Error('Code failed');
//        reject(reason);
//     }
// })

// let checkCode = function(){
//     WillPassCode
//         .then(function(message){
//             console.log(message)
//         })
//         .catch(function(reason){
//             console.log(reason)
//         })
// };

// checkCode()