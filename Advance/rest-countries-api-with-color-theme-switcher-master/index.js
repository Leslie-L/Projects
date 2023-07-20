const $observeElement = document.getElementById('observer');
const skeleton = document.getElementById('countries-list__hide');
const listCountries=document.querySelector('.countries-list');
const darkMode = document.querySelector('.bar-darkmode');
const modal = document.getElementById('modal');
const secciontCountries = document.getElementById('container');

//INPUTS
const search =  document.getElementById('search');
const inputRegion =  document.getElementById('region');

//Buttons
const bntBack = document.getElementById('bnt-back');

let cont = 0;
let max= 0;
let allData;
let data;
darkMode.addEventListener('click',changeColors);
function changeColors(){
    const  iconColor = document.getElementById('iconColor');
   if(iconColor.classList.contains('fa-moon')) {
        iconColor.classList.remove('fa-moon');
        iconColor.classList.add('fa-sun');
   }else{
        iconColor.classList.remove('fa-sun');
        iconColor.classList.add('fa-moon');
   }
   
    const body = document.getElementById('all');
    body.classList.toggle('dark');
}
search.addEventListener('change',searchByCountries);
inputRegion.addEventListener('change',searchByRegion);
listCountries.addEventListener('click',controlClickCountries);
bntBack.addEventListener('click',modalControl);
function modalControl() {
    modal.classList.add('hide');
    secciontCountries.classList.remove('hide');
}

function controlClickCountries(event) {
    if(event.target.nodeName =='ARTICLE'){
        const name=event.target.childNodes[1].innerText;
        console.log("Click article", name)
        findCountry(name);
        
    }else if(event.target.nodeName =='P' || event.target.nodeName=='IMG'){
        const name = event.srcElement.parentElement.childNodes[1].innerText;
        console.log(name);
        findCountry(name);
    }
}

function intersection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        showCountries()
      } 
    });
  }
const options = {
    rootMargin: '0px 0px 10% 0px',
  };
const observer = new IntersectionObserver(intersection,options);

async function getAllCountries() {
    link = 'https://restcountries.com/v3.1/all';

    const peticion = await fetch(link);
    allData = await peticion.json();
    if(peticion.status==200){
        console.log("max",max)
        data=[...allData];
        showCountries();
        observer.observe($observeElement);
        listCountries.addEventListener('click',controlClickCountries);
    }
}


function showCountries() {
    max =  data.length;
    if(cont==0){
        listCountries.innerHTML="";
    }
    if(cont>=max)
        return;
    let fin =cont+12
    if(fin>=max)
        fin=max
    
        for (let i = cont; i < fin; i++) {
            //console.log(i)
            //console.log(data[i])
            const name = data[i]['name']['common'] ?? "no encontrado";
            const flag = data[i]['flags']['png'];
            const population = data[i]['population'];
            const region = data[i]['region'];
            const capital = data[i]['capital']?.toString();

            const article = document.createElement('article');
            article.classList.add('item');

            const img = document.createElement('img');
            img.classList.add('item-flag');
            img.src=flag;
            img.alt=name;

            const pName = document.createElement('p');
            pName.classList.add('item-title'); 
            pName.textContent = name;

            const Ppopulation = document.createElement('p');
            Ppopulation.classList.add('item-title'); 
            const boldPopulation = document.createElement('b');
            boldPopulation.textContent = 'Population:';
            Ppopulation.appendChild(boldPopulation);
            Ppopulation.textContent += population;

            const Pregion = document.createElement('p');
            Pregion.classList.add('item-title'); 
            const boldRegion = document.createElement('b');
            boldRegion.textContent = 'Region';
            Pregion.textContent = region;

            const Pcapital = document.createElement('p');
            Pcapital.classList.add('item-title'); 
            const boldcapital = document.createElement('b');
            boldcapital.textContent = 'Capital';
            Pcapital.textContent = capital;

            article.appendChild(img)
            article.appendChild(pName)
            article.appendChild(Ppopulation)
            article.appendChild(Pregion)
            article.appendChild(Pcapital)
            
            listCountries.appendChild(article);
        }
        
        
        cont+=12;
        /*
            <article class="item skeleton">
                <img class="item-flag skeleton" alt="">
                <p class="item-title skeleton"></p>
                <p class="item-title skeleton"></p>
                <p class="item-title skeleton"></p>
                <p class="item-title skeleton"></p>
            </article>
        */
}
function searchByCountries(event) {
    const words = event.target.value;
   // inputRegion.value =  'no';
    if(words.length==0){
        cont=0;
        data=allData
        showCountries();
        
        return;
    }
        
    const newData = allData.filter(item =>{
        const name = item['name']['common'].toLowerCase(); 
        return name.includes(words.toLowerCase());
    } );
    cont=0;
    data=newData;
   
    showCountries();
}
function searchByRegion(event) {
    const region = event.target.value;
    const newData = allData.filter(item =>{
        const name = item['region'].toLowerCase(); 
        return name.includes(region.toLowerCase());
    } );
    cont=0;
    data=newData;
    showCountries();
}
function findCountry(name) {
    const country = allData.find(item=>item['name']['common']==name);
    console.log(country);

    const section = document.querySelector('.modal_container');
    section.innerHTML="";

    console.log(country['flags']['png'])
    const img = document.createElement('img');
    img.classList.add('modal_container--img');
    img.src=country['flags']['png'];
    img.alt=name
    section.appendChild(img)

    const article = document.createElement('article');
    article.classList.add('modal_container--info');

    const h3 = document.createElement('h3');
    h3.textContent=name;
    h3.classList.add('item_modal');

    const divItem1 =document.createElement('div');
    divItem1.classList.add('modal_item1');
    const p11=document.createElement('p');
    const p11N = document.createElement("strong");
    p11N.textContent = "Native Name: ";
    const p11Nor = document.createTextNode(country['name']['official']);
    p11.appendChild(p11N);
    p11.appendChild(p11Nor)

    const p12=document.createElement('p');
    const p12N = document.createElement("strong");
    p12N.textContent = "Population: ";
    const p12Nor = document.createTextNode(country['population']);
    p12.appendChild(p12N);
    p12.appendChild(p12Nor)

    const p13=document.createElement('p');
    const p13N = document.createElement("strong");
    p13N.textContent = "Region: ";
    const p13Nor = document.createTextNode(country['region']);
    p13.appendChild(p13N);
    p13.appendChild(p13Nor)

    const p14=document.createElement('p');
    const p14N = document.createElement("strong");
    p14N.textContent = "Sub Region: ";
    const p14Nor = document.createTextNode(country['subregion']);
    p14.appendChild(p14N);
    p14.appendChild(p14Nor)

    const p15=document.createElement('p');
    const p15N = document.createElement("strong");
    p15N.textContent = "Capital: ";
    const p15Nor = document.createTextNode(country['capital']?.toString());
    p15.appendChild(p15N);
    p15.appendChild(p15Nor)
    
    divItem1.appendChild(p11)
    divItem1.appendChild(p12)
    divItem1.appendChild(p13)
    divItem1.appendChild(p14)
    divItem1.appendChild(p15)


    const divItem2 =document.createElement('div');
    divItem2.classList.add('modal_item2');
    const p21=document.createElement('p');
    const p21N = document.createElement("strong");
    p21N.textContent = "Top Level Domain: ";
    const p21Nor = document.createTextNode(country['tld'].toString());
    p21.appendChild(p21N);
    p21.appendChild(p21Nor)

    const p22=document.createElement('p');
    const p22N = document.createElement("strong");
    p22N.textContent = "Currencies: ";
    const p22Nor = document.createTextNode(country['currencies'][Object.keys(country['currencies'])[0]]['name'].toString());
    p22.appendChild(p22N);
    p22.appendChild(p22Nor)

    const p23=document.createElement('p');
    const p23N = document.createElement("strong");
    p23N.textContent = "Languages: ";
    let  lenguajes=[];
    for (const key in country['languages']) {
         lenguajes.push(country['languages'][key]);
    }
    const p23Nor = document.createTextNode(lenguajes.toString());
    p23.appendChild(p23N);
    p23.appendChild(p23Nor);

    divItem1.appendChild(p21)
    divItem1.appendChild(p22)
    divItem1.appendChild(p23)

    const divItem3 =document.createElement('div');
    divItem3.classList.add('modal_item3');
    const h4 = document.createElement('h4');
    h4.textContent='Border Countries:';
    h4.classList.add('item_modal');

    const divItem4 =document.createElement('div');
    divItem4.classList.add('modal_item3--list');
    const borders= country["borders"];
    if (borders) {
        for (let index = 0; index < borders.length; index++) {
            const element = borders[index];
            const p31=document.createElement('p');
            p31.classList.add('button')
            p31.textContent=element;
            divItem4.appendChild(p31);
        }
    }
    divItem3.appendChild(h4);
    divItem3.appendChild(divItem4);

    article.appendChild(h3)
    article.appendChild(divItem1)
    article.appendChild(divItem2)
    article.appendChild(divItem3)
    
    section.appendChild(article)
    
    

    /*
    <img  class="modal_container--img item skeleton" alt="">
            <article class="modal_container--info">
                <h3 class="item_modal skeleton" ></h3> 
                <div class="modal_item1">
                   <p class="item_modal skeleton"><b>Native Name</b></p>
                   <p class="item_modal skeleton"><b>Population:</b></p>
                   <p class="item_modal skeleton"><b>Region:</b></p>
                   <p class="item_modal skeleton"><b>Sub Region:</b></p>
                   <p class="item_modal skeleton"><b>Capital:</b></p>
                </div>
                <div class="modal_item2">
                   <p class="item_modal skeleton"><b>Top Level Domain:</b></p>
                   <p class="item_modal skeleton"><b>Currencies:</b></p>
                   <p class="item_modal skeleton"><b>Languages:</b></p>
                </div>
                <div class="modal_item3">
                    <h4 class="item_modal skeleton">Border Countries:</h4>
                    <div class="modal_item3--list">
                        <p class="button skeleton"></p>
                        <p class="button skeleton"></p>
                        <p class="button skeleton"></p>
                    </div>
                </div>
            </article>
    
    */
    modal.classList.remove('hide');
    secciontCountries.classList.add('hide');
    
}
getAllCountries();







  
  

  