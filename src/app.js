const API_URL = "http://localhost:3000"


const $saveBtn = document.querySelector('[data-form="button"]')
const form = '[data-form="form"]'



async function postData(url = "", data = {}) {
   const response = await fetch(url, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
   });
   return response.json();
}
const $picturesCont = document.querySelector('[data-pictures = "root"]')
$saveBtn.addEventListener('click', (e) => {
   const $form = e.target.closest(form)
   const formData = new FormData($form)
   const data = {
      "views": 0,
      "picture": ""
   }
   data.title = formData.get('title')
   /*   formData.forEach((value, key)=>{
         data[key] = value
         
      })*/
   postData(API_URL + '/pictures', data).then(data => console.log(data))   
      renderPost ($picturesCont, data)
   })


async function getPost(url) {
   const response = await fetch(url)
   console.log(response)
   return response.json()

}

function renderPost($root, data) {
   $root.insertAdjacentHTML('beforeend', `
   <div class="pictur">
      <div class="pictur__text">
         <div class="pictur__id">${data.id}</div>
         <div class="pictur__title">${data.title}</div>
         <div class="pictur__views">Количестко просмотров: ${data.views}</div>
      </div> 
      <div class="pictur__picture">Фото ${data.picture}</div>
   </div>  
`)
}

getPost(API_URL + "/pictures").then (data =>{
   data.forEach(item =>{
      renderPost($picturesCont, item)

   })
})