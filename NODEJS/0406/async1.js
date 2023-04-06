async function sigma(limit=10){
    sum=0;
    for(i=1; i<=limit; i++)
        sum+=i;
    return sum; //async에 의해서 무조건 promise객체로 바뀌어서 전달된다
}

//console.log(sigma(100)); -> 결과값 : promise {result} 출력

// function showDisplay(){
//     sigma(100)
//     .then((result)=>{
//         console.log(result);
//     })
// } -> 결과값 : result 출력

async function showDisplay(){
    let result = await sigma(1000); //기다린다. 반환값이 promise 객체가 아니다.
    console.log(result);
}

showDisplay();
