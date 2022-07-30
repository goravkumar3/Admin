firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    console.log(user);
    if (user.emailVerified) {
    }
  } else {
    // User is signed out
    window.location.href = "./../index.html";
  }
});

let signout = () => {
  firebase.auth().signOut();
};
const studentCard = document.querySelector("#studentCard");
const approved = document.querySelector("#approveStudentInfo");
const rejected = document.querySelector("#rejectedStudentInfo");
const pending = document.querySelector("#pendingStudentInfo");
const loader = document.querySelector(".loader");
studentCard.style.display="flex";
pending.style.display="none";
approved.style.display="none";
rejected.style.display="none";
setTimeout(() => {
  firebase
    .firestore()
    .collection("users")
    .get()
    .then((query) => {
      query.docs.forEach((docs) => {
        let data= docs.data();
        const cardDiv=document.createElement("div");
        studentCard.appendChild(cardDiv);
        cardDiv.setAttribute("class", "cardDiv");
        const profileImage=document.createElement("img");
        profileImage.setAttribute("src",data.ProfileImage);
        profileImage.setAttribute("alt","Student image");
        profileImage.setAttribute("class","studentImage");
        profileImage.setAttribute("loading","lazy");
        cardDiv.appendChild(profileImage);
        const name=document.createElement("p");
        cardDiv.appendChild(name);
        name.textContent=data.FullName;
        const fatherName=document.createElement("p");
        cardDiv.appendChild(fatherName);
        fatherName.textContent="Father Name : "+data.FatherName;
        const email=document.createElement("p");
        cardDiv.appendChild(email);
        email.textContent="Email : "+data.Email;
        const Number=document.createElement("p");
        cardDiv.appendChild(Number);
        Number.textContent="Number : "+data.Number;
        const cinc=document.createElement("p");
        cardDiv.appendChild(cinc);
        cinc.textContent="CINC NO : "+data.CINC;
        const CourseSelected=document.createElement("p");
        cardDiv.appendChild(CourseSelected);
        CourseSelected.textContent="Selected Course : "+data.Course_Selected;
        const Qualifying=document.createElement("p");
        cardDiv.appendChild(Qualifying);
        Qualifying.textContent="Qualifyication : "+data.Qualifying;
        const Gender=document.createElement("p");
        cardDiv.appendChild(Gender);
       console.log(data);
      });
    });
    loader.style.display="none";
}, 3000);
// pending student Card
setTimeout(() => {
  firebase
  .firestore()
  .collection("users/").where("pending","==",true)
  .get()
  .then((query) => {
    query.docs.forEach((docs) => {
      let data= docs.data();
      const cardDiv=document.createElement("div");
    pending.appendChild(cardDiv);
    cardDiv.setAttribute("class", "cardDiv");
    const profileImage=document.createElement("img");
    profileImage.setAttribute("src",data.ProfileImage);
    profileImage.setAttribute("alt","Student image");
    profileImage.setAttribute("class","studentImage");
    profileImage.setAttribute("loading","lazy");
    cardDiv.appendChild(profileImage);
    const name=document.createElement("p");
    cardDiv.appendChild(name);
    name.textContent="Name : "+data.FullName;
    const approveBtn=document.createElement("button");
    const rejectBtn=document.createElement("button");
    approveBtn.textContent="Approve";
    rejectBtn.textContent="Reject";
    approveBtn.setAttribute("class", "apprejbtn");
    rejectBtn.setAttribute("class", "apprejbtn");
    cardDiv.appendChild(approveBtn);
    cardDiv.appendChild(rejectBtn);
    // on click approve update in true in .doc(doc.id)
    rejectBtn.addEventListener("click", ()=>{
      firebase.firestore()
      .collection("users")
      .doc(docs.id)
      .update({
        pending:false,
        reject:true,
        approve:false,
      })
      .then(() => {
        window.location.reload();
        alert("there are nothing to show in pwnding");
      });
    })
    approveBtn.addEventListener("click", ()=>{
      firebase.firestore()
      .collection("users")
      .doc(docs.id)
      .update({
        pending:false,
        reject:false,
        approve:true,
      })
      .then(() => {
        window.location.reload();
        alert("there are nothing to show in pwnding");
      });
    })
    });
    });
}, 2000);
let showPending=() => {
  loader.style.display="flex";
  studentCard.style.display="none";
  setTimeout(() => {
    pending.style.display="block";
    loader.style.display="none";
  }, 3000);
  approved.style.display="none";
  rejected.style.display="none";
   
  }
  //reject portion
  setTimeout(() => {
    firebase
    .firestore()
    .collection("users/").where("reject","==",true)
    .get()
    .then((query) => {
      query.docs.forEach((docs) => {
        let data= docs.data();
        const cardDiv=document.createElement("div");
      rejected.appendChild(cardDiv);
      cardDiv.setAttribute("class", "cardDiv");
      const profileImage=document.createElement("img");
      profileImage.setAttribute("src",data.ProfileImage);
      profileImage.setAttribute("alt","Student image");
      profileImage.setAttribute("class","studentImage");
      profileImage.setAttribute("loading","lazy");
      cardDiv.appendChild(profileImage);
      const name=document.createElement("p");
      cardDiv.appendChild(name);
      name.textContent=data.FullName;
      });
      });
  }, 3000);
  let showReject=()=>{
    loader.style.display="flex";
    studentCard.style.display="none";
    pending.style.display="none";
    approved.style.display="none";
    setTimeout(() => {
    loader.style.display="none";
      rejected.style.display="block";
    }, 3000);
    
      // alert("there are nothing to display");
  }
  let allStudent=()=>{
    pending.style.display="none";
    approved.style.display="none";
    rejected.style.display="none";
    loader.style.display="flex";
    setTimeout(() => {
      studentCard.style.display="flex";
    loader.style.display="none";
    }, 3000);
  }
  //aprove student card
  setTimeout(() => {
    firebase
    .firestore()
    .collection("users/").where("approve","==",true)
    .get()
    .then((query) => {
      query.docs.forEach((docs) => {
        let data= docs.data();
        const cardDiv=document.createElement("div");
      approved.appendChild(cardDiv);
      cardDiv.setAttribute("class", "cardDiv");
      const profileImage=document.createElement("img");
      profileImage.setAttribute("src",data.ProfileImage);
      profileImage.setAttribute("alt","Student image");
      profileImage.setAttribute("class","studentImage");
      profileImage.setAttribute("loading","lazy");
      cardDiv.appendChild(profileImage);
      const name=document.createElement("p");
      cardDiv.appendChild(name);
      name.textContent="Name : "+data.FullName;
      });
      });
  }, 2000);
  let showApprove=()=>{
    loader.style.display="flex";
    studentCard.style.display="none";
    pending.style.display="none";
    setTimeout(() => {
    loader.style.display="none";
      approved.style.display="flex";
    }, 3000);
    rejected.style.display="none";
    
      // alert("there are nothing to display");
  }
  // in student portal, update the user data with that property
  //challan upload
//pending true
// reject false
 //approve false
// firebase.collection().get();
// firebase.collection().whrere("reject","==",true).get();
// firebase.collection().whrere("approve","==",true).get();
//if(docs.empty)no student available in pending section
