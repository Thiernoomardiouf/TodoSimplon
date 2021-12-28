// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCycGM19JuDtWN5S9ulcxQaOKBbyo8awqk",
  authDomain: "todo-4ca38.firebaseapp.com",
  projectId: "todo-4ca38",
  storageBucket: "todo-4ca38.appspot.com",
  messagingSenderId: "444673911498",
  appId: "1:444673911498:web:55269589c856e5376b6233"
};
  // Initialize Firebase
 // const app = initializeApp(firebaseConfig);

firebase.initializeApp(firebaseConfig);

      let tacheInfo = firebase.database().ref("liste");


       document.querySelector(".task").addEventListener("submit", submitForm);

      function submitForm(e) {
        e.preventDefault();

        let taskInput=document.querySelector("#new-task").value;
        let taskDescription=document.querySelector("#new-task-description").value;
        let taskEtat=document.querySelector("#new-task-etat").value;
        let taskDate=document.querySelector("#new-task-deadline").value;
        let taskPriorite=document.querySelector("#priorite").value;

        console.log(taskInput, taskDescription, taskEtat, taskPriorite, taskDate);

        saveTaskInfo(taskInput, taskDescription, taskEtat, taskPriorite, taskDate);

        document.querySelector(".task").reset();
        location.reload(true);//javascript
      }

      // Save infos to Firebase
      function saveTaskInfo(taskInput, taskDescription, taskEtat, taskPriorite, taskDate) {
        let newContactInfo = tacheInfo.push();

        newContactInfo.set({
          titre: taskInput,
          etat: taskEtat,
          description: taskDescription,
          priorite: taskPriorite,
          daate: taskDate,
        });
      }

      document.querySelector(".all-task").addEventListener("click", readTaskInfo);
              
        let priorite = ['Important', 'Moyenne', 'Faible'];
/*         let etat = ['Terminé','En Cours'];

        document.querySelector(".finish-task").addEventListener("click", ()=>{
          readEtat(etat[0]);
        });


        document.querySelector(".doing-task").addEventListener("click", ()=>{
          readEtat(etat[1]);
        }); */


        document.querySelector(".task-important").addEventListener("click", ()=>{
          read(priorite[0]);
          });

        document.querySelector(".task-moyen").addEventListener("click", ()=>{
          read(priorite[1]);
          });
        
        document.querySelector(".task-faible").addEventListener("click", ()=>{
          read(priorite[2]);
        });

   
        function read(Niveau){
          document.querySelector(".details-task").innerHTML = ""; 
          tacheInfo.once('value').then((snapshot) => {
              Object.keys(snapshot.val()).forEach((key) => {
                if (`${snapshot.val()[key].priorite}` == Niveau){
                    let details = document.querySelector(".details-task");
                    

                    const idButtonModifier = "btn_modifier-" + key
                    const idButtonSupprimer = "btn_supprimer-" + key
                    
                    details.insertAdjacentHTML(
                      "beforeend",
                      `
                      <div class="card m-2" style="width: 23rem">
                        <div class="card-body">
                          <h4 class="card-title">${snapshot.val()[key].titre}</h4>
                          <hr>
                          <p class="card-text">
                          ${snapshot.val()[key].description}</p>
                        </div>
                        <div class="rounded-bottom mdb-color lighten-3 text-center pt-3">
                          <ul class="list-unstyled list-inline font-small">
                            <li class="list-inline-item pr-2 white-text"><i class="far fa-clock pr-1"></i> <p>${snapshot.val()[key].daate}</p></li>
                            <li class="list-inline-item pr-2"><a href="#" class="white-text"><i
                                  class="far fa-comments pr-1"></i><p> ${snapshot.val()[key].etat} </p></a></li>
                            <li class="list-inline-item pr-2"><a href="#" class="white-text">
                            <button type="button" class="btn btn-primary" id = ${idButtonModifier}>Edit</button> </a></li>
                            <li class="list-inline-item"><a href="#" class="white-text"> <button type="button" class="btn btn-danger" id=${idButtonSupprimer} >Delete</button> </a></li>
                          </ul>
                        </div>
                      </div>
                    `
                    )
          
                    document.getElementById(idButtonSupprimer).addEventListener('click', ()=>{
                        firebase.database().ref('liste/' + key).remove(); 
                        location.reload(true);//javascript
                        alert("l'element a été bien supprimer")
                      });

                    document.getElementById(idButtonModifier).addEventListener('click', ()=>{
                        let taskInput=document.querySelector("#new-task").value;
                        let taskDescription=document.querySelector("#new-task-description").value;
                        let taskEtat=document.querySelector("#new-task-etat").value;
                        let taskDate=document.querySelector("#new-task-deadline").value;
                        let taskPriorite=document.querySelector("#priorite").value;
                        document.querySelector(".task").reset();
                        let updates = {
                          titre: taskInput,
                          etat: taskEtat,
                          description: taskDescription,
                          priorite: taskPriorite,
                          daate: taskDate,
                        }
                        firebase.database().ref('liste/' + key).update(updates); 

                        alert("l'element a été bien modifier")
                      });
       
                    
                   // p.innerText=('Taches:' +'  '+ `Titre: ${snapshot.val()[key].titre}` +'  '+ `Description: ${snapshot.val()[key].description}` +'  '+ `Etat: ${snapshot.val()[key].etat}` +'  '+ `Priorite: ${snapshot.val()[key].priorite}`+'  '+ `Date: ${snapshot.val()[key].daate}`);
                    //p.appendChild(editTaches);
                    //p.appendChild(deleteTaches);
                    //details.appendChild(p);
                  }
                    
              });
            });
        }


      // Read infos to Firebase
      function readTaskInfo(){
        
         document.querySelector(".details-task").innerHTML = ""; 
           for(let i=0; i<3; i++){
           read(priorite[i]);
          }
      }

      

      window.addEventListener("DOMContentLoaded", (event) => {
        readTaskInfo()
      })