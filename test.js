let songlist=document.querySelectorAll('.songlist ul');
let btn=document.querySelectorAll(".wrap div");
let rank=document.querySelector(".rank");
let recommend=document.querySelector(".recommend")
let ranklist=document.querySelector(".rank ul")
btn[1].addEventListener('click',()=>{
    recommend.style.display='none';
    rank.style.display='block';
})
btn[0].addEventListener('click',()=>{
    rank.style.display='none';
    recommend.style.display='block';
})

window.onload=function(){
    fetch('http://124.221.249.219:8000/api/recommendations',{
        method: 'GET',
      }).then(res => res.json())
      .then(res=>{
          console.log(res);
          res.offical.map(item=>{
            songlist[0].innerHTML+=`
            <li>
            <img src="${item.cover}" alt="">
            <div>${item.title}</div>
            </li>`
          })
          res.tatsujin.map(item=>{
            songlist[1].innerHTML+=`
            <li>
            <img src="${item.cover}" alt="">
            <div>${item.title}</div>
            </li>`
          })
          res.column.map(item=>{
            songlist[2].innerHTML+=`
            <li id="special">
            <img src="${item.background}" alt="">
            <div>${item.description}</div>
            </li>`
          })
      })
      fetch('http://124.221.249.219:8000/api/ranking',{
        method: 'GET',
      }).then(res => res.json())
      .then(res=>{
        console.log(res)
        res.map((item,idx)=>{
            ranklist.innerHTML+=`
            <li class="dragitem">
            <ol>
            <h2>${item.title}</h2>
            ${item.top3.map(item=>{
                return `<div>${item.title}-${item.artist.join('、')}</div>`
            }).join('')}
            </ol>
            <img src="${item.cover}"></img>
            </li>
            `
        })
      })
}
// 实现拖拽
let draglist=document.querySelector('.draglist')
new Sortable(draglist, {
    animation: 150,
    ghostClass: 'dragitem'
});


// 搜索
let search=document.querySelector('input');
let searchresult=document.querySelector('.searchresult');
search.addEventListener('keydown',(e)=>{
    searchresult.innerHTML=''
    let keyword=search.value;
    if(e.code=='Enter'){
        fetch('http://124.221.249.219:8000/api/search?keyword='+keyword,{
            method:'GET',
        }).then(res=>res.json())
        .then(res=>{
            console.log(res)
            searchresult.style.display='block';
            e.cancelBubble = true;
            res.map(item=>{
                searchresult.innerHTML+=`<li>${item.title}-${item.artist.join('、')}</li>`
            })
        })
    }
})
document.addEventListener('click', () => {
    searchresult.style.display = 'none';
})
