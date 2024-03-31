const API_URL = "http://localhost:3000";

const $saveBtn = document.querySelector('[data-form="button"]');
const form = '[data-form="form"]';

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

async function deleteItem(url = "") {
   const response = await fetch(url, {
      method: "DELETE",
   });
   return response.json();
}

const $picturesCont = document.querySelector('[data-pictures="root"]');
$saveBtn.addEventListener('click', (e) => {
   const $form = e.target.closest(form);
   const formData = new FormData($form);
   const data = {
      "views": 0,
      "picture": ""
   };
   data.title = formData.get('title');
   postData(API_URL + '/pictures', data)
      .then(data => {
         console.log(data);
         renderPost($picturesCont, data);
      })
      .catch(error => {
         console.error(error);
      });
});

async function getPost(url) {
   const response = await fetch(url);
   console.log(response);
   return response.json();
}

function renderPost($root, data) {
   $root.insertAdjacentHTML('beforeend', `
      <div class="pictur" data-delete-id="${data.id}">
         <div class="pictur__text">
            <div class="pictur__id">${data.id}</div>
            <div class="pictur__title">${data.title}</div>
            <div class="pictur__views">Количество просмотров: ${data.views}</div>
            <button class="pictur__delete">Удалить всё</button>
         </div> 
         <div class="pictur__picture">Фото ${data.picture}</div>
      </div>  
   `);
}

getPost(API_URL + "/pictures").then(data => {
   data.forEach(item => {
      renderPost($picturesCont, item);
   });
});

window.addEventListener('click', (e) => {
   if (e.target.classList.contains('pictur__delete')) {
      const deleteId = e.target.closest('.pictur').dataset.deleteId;
      deleteItem(API_URL + "/pictures/" + deleteId).then(data => {
         const deletedItem = data?.id;
         if (deletedItem) {
            const items = document.querySelectorAll('.pictur');
            items.forEach(item => {
               const id = item.dataset?.deleteId;
               if (deletedItem === id) {
                  item.remove();
               }
            });
         }
      });
   }
});