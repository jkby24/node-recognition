// /**
//  * 多个promise请求包装类
//  * 
//  */
// export default class {
//     let promises = [];
//     let isSequence: boolean;//是否顺序执行promise,true为串行，false为并行，默认为true

//     constructor(isSequence) {
//         this.isSequence = isSequence;
//     }

//     public addPromise(getPromise: Function, cb: Function, context, ...args): void {
//         this.promises.push(() => {
//             return getPromise.apply(context, args).then((data) => {
//                 return cb.apply(context, [data]) === false ? Promise.reject(false) : Promise.resolve();
//             });
//         });
//     };

//     public execute(): Promise<any> {
//         return this.isSequence ? this.sequenceExecutePromise() : this.defaultExecutePromise();
//     }

//     /**
//      * 按顺序执行promise任务
//      */
//     private sequenceExecutePromise(): Promise<any> {
//         var result = Promise.resolve();
//         this.promises.forEach(function (promise) {
//             result = result.then(promise);
//         });
//         return result;
//     }

//     /**
//      * 并行方式执行
//      */
//     private defaultExecutePromise(): Promise<any> {
//         var executePromises = [];
//         this.promises.forEach(fn => {
//             executePromises.push(fn());
//         })
//         return Promise.all(executePromises);
//     }
// }