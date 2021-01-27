'use strict';
    //  show data in Firebase

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyDxlIoeAFQM2in_Rc-bzrzWy4d1taNLWOw",
      authDomain: "mychat-3de77.firebaseapp.com",
      projectId: "mychat-3de77",
      storageBucket: "mychat-3de77.appspot.com",
      messagingSenderId: "105768499335",
      appId: "1:105768499335:web:f183c72e818f9328f66022",
      measurementId: "G-RSG67ZK8H2"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    const db = firebase.firestore();
    const collection = db.collection('task');

    const taskList = document.getElementById('taskList');
    
    collection.orderBy('created').get().then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.data());
          const li = document.createElement('li');
          li.textContent = "category:" + doc.data().category 
          +"contents" + doc.data().message ;
          taskList.appendChild(li);
        });
      });