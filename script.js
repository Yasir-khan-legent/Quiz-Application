let Ques = document.getElementById('ques')
let count = document.getElementById('count')
let opt1 = document.getElementById('opt1')
let opt2 = document.getElementById('opt2')
let opt3 = document.getElementById('opt3')
let opt4 = document.getElementById('opt4')

let radio = document.querySelectorAll('input[name="p1"]')


let btn = document.getElementById('btn')
let  qno = 1;
let index = 0;
let score = 0
let corect;
let data =[]

async function getapi(){
  let api = await fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
  let resp =  await api.json()
  data = await resp.results

}

getapi().then(()=>{
  show()
})
async function show() {
    if (index >= data.length) {
Swal.fire({
  title: "Good job!",
  text:    `Your Score is ${score}/${data.length}  `,
  icon: "success",
    confirmButtonText: "Restart Quiz"
}).then(() => {
  
    index = 0;
    qno = 1;
    score = 0;
    show(); 
  });

    return;
  }

count.innerText = `${qno})`
Ques.innerText = data[index].question
corect = data[index].correct_answer
let option = [...data[index].incorrect_answers]
option.push(corect)
  option.sort(() => Math.random() - 0.5)

  opt1.innerHTML = option[0]
  opt2.innerHTML = option[1]
  opt3.innerHTML = option[2]
  opt4.innerText = option[3]

  radio[0].value = option[0];
radio[1].value = option[1];
radio[2].value = option[2];
radio[3].value = option[3]

  for (let r of radio) {
    r.checked = false;
  }

}

btn.addEventListener('click',  ()=>{
let select = document.querySelector('input[name="p1"]:checked')

  if(!select){
    Swal.fire("Please Select The Option!");
    return
  }
  if(select.value === corect){
    score++
  }
 index++
  qno++
show()
})



