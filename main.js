   // select category 
    $(function () {
        /* global $ loadSheets */
        const sheetId = "1UTi3fEOoweS7L4QKtm5UIp8WAQ2QuqqAwTA2UxzMg9w";
        const range = "list!A1:B10";
        const max = 5;

        $("#mybtn").on("click", showdata);

        async function showdata() {
          $("#contents").css("display", "inline");
          $("#mybtn").css("display", "none");
          let data = await loadSheets(sheetId, range);
          for (let i = 0; i <= max; i++) {
            $("#contents").append("<option>" + data.values[i][0] + "</option>");
          }
        }
      });

      const resultDiv = document.querySelector("#result-div");
      const micDiv = document.querySelector("#mic");
      const taskList = document.querySelector('#taskList');
      const text = '';


      // 音声認識機能(Chrome)
      let rec = new webkitSpeechRecognition();
      rec.continuous = true;
      rec.interimResults = false;
      rec.lang = "ja-JP";

      let stopped = true;

      micDiv.onclick = function () {
        if (stopped == true) {
          rec.start();
        } else {
          rec.stop();
        }
      };

      rec.onstart = function () {
        console.log("on start");
        micDiv.setAttribute("src", "micon.svg");
      };

      rec.onend = function () {
        console.log("on end");
        micDiv.setAttribute("src", "micoff.svg");
      };

      rec.onresult = function (e) {
        rec.stop();
        for (let i = e.resultIndex; i < e.results.length; i++) {
          if (e.results[i].isFinal) {
            console.log(e);
            let text = e.results[i][0].transcript;
            naiyou.value = text;
            console.log(text);
          }
        }
      };

     //  Store data in Firebase

    
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

    let naiyou = document.getElementById('naiyou');
    const form = document.querySelector('form');
    const select = document.getElementById('contents');


    form.addEventListener('submit', e => {
      e.preventDefault();
    
    
      collection.add({
        message: naiyou.value,
        category: select.value,
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(doc => {
        console.log(`${doc.id} added!`);
      })
      .catch(error => {
        console.log(error);
      });
    });