const add = (a, b) => {
    return new Promise(((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                reject('numbers must be positive')
            }
            resolve(a + b)
        }, 1000)
    }))
}

const doWork = async () => {
    let sum = await add(2, 3)
    let sum2 = await add(sum, -3)
    let sum3 = await add(sum2, 10)
    return sum3
}

doWork().then(res => {
    console.log(res)
}).catch(e => {
    console.log('error', e)
})

// add(3, 4).then(res => {
//     add(res, 5).then(res2 => {
//         add(res2, 6).then(res3 => {
//             console.log(res3)
//         })
//     })
// })