let isSeeMore=false
loaded(false)
let isSort=false
function sort(){
isSort=true;
loadedData(true,isSort)
getId('spiner').classList.remove('hidden')
}

function loadedData(isSeeMore,isSort){
    const url='https://openapi.programming-hero.com/api/ai/tools';

    fetch(url).then(res=>res.json()).then(data=>{

        if(isSort){
        data.data.tools.sort((a,b)=>{
const firstDate=a.published_in
const secondDate=b.published_in
const firstNumber=firstDate.slice(firstDate.length-4,firstDate.length)
const secondNumber=secondDate.slice(secondDate.length-4,secondDate.length)
return secondNumber - firstNumber
        })
    }

        setTimeout(()=>{
            display(data.data,isSeeMore)},2000)
    })


    

}

loadedData(isSeeMore,isSort)

function display(data,isSeeMore){


if(isSeeMore){
data=data.tools;
getId('seeMore').classList.add('hidden')
}
else{
data=data.tools.slice(0,6)
getId('seeMore').classList.remove('hidden')
}

const cardContainer=getId('cardContainer');
cardContainer.innerHTML=''
for(const U of data) {
    console.log(U)
const Card=document.createElement('div');
Card.classList='border-2 border-black rounded-2xl p-4 shadow-2xl'
Card.innerHTML=`
<figure class="pb-2"><img src="${U.image}" alt="" class='rounded-2xl'></figure>
<h1 class="text-xl font-bold">Features</h1>
<div class="list-decimal border-b-2 border-black py-5">
    <li>${U?.features[0]}</li>
    <li>${U?.features[1]}</li>
    <li>${U?.features[2]}</li>
</div>

<div class="flex items-center justify-between py-4">
    <div class="space-y-2">
        <h1 class="font-bold text-xl">${U.name}</h1>
    <div class="flex gap-3">
        <img src="Vector (9).png" alt="">
        <span>${U?.published_in}</span>
    </div>
    </div>
    <div>
        <img src="Frame (11).png" alt="" onclick="arrow('${U?.description||'Data is not available'}','${U.id}')">
    </div>
</div>
</div>
`;
cardContainer.appendChild(Card)}
loaded(true)

}


function loaded(loaded){
    if(loaded){
        getId('spiner').classList.add('hidden')
    }else{getId('spiner').classList.remove('hidden')}

}

// see more 
getId('seeMore').addEventListener('click',()=>{
isSeeMore=true;
loadedData(isSeeMore)
})


// arrow function
function arrow(description,id){

// id data loading
fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
.then(res=>res.json()).then(data=>{
data=data.data
console.log(data)
    
getId('D').innerHTML=`
<div class="modal-box">
    <h3 class="font-bold text-lg">Hello!</h3>
    <p class="py-4">${data?.accuracy?.description}</p>
    <p class="py-4">Tool Name: ${data?.tool_name}</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-secondary">Close</button>
      </form>
    </div>
  </div>
`


    D.showModal()
})
}