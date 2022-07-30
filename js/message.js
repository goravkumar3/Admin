let uid;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    console.log(user);
    uid = user.uid;
    if (!user.emailVerified) {
    }
  } else {
    // User is signed out
    window.location.href = "./login.html";
  }
});
const message = document.querySelector("#message");
const showMessage = document.querySelector("#showMessage");
// const ul=document.createElement("ul");
const send = () => {
  var database = firebase.database();
  database.ref("messages/").push({
    message: message.value,
  });
  message.value = "";
};
firebase
  .database()
  .ref("messages/")
  .on("child_added", (TodoData) => {
    const key = TodoData.key;
    TodoData.forEach((TodoValue) => {
      const value = TodoValue.val();
      const ShowDiv = document.createElement("div");
      ShowDiv.setAttribute("class", "showMessage");
      showMessage.appendChild(ShowDiv);
      const out = document.createElement("h3");
      out.setAttribute("class", "h3");
      ShowDiv.appendChild(out);
      const del = document.createElement("button");
      const delIcon = document.createElement("img");
      del.setAttribute("class", "btn");
      delIcon.setAttribute("src", "./../icons/delete (2).png");
      delIcon.setAttribute("alt", "Delete icon");
      delIcon.setAttribute("class", "icon");
      ShowDiv.append(del);
      del.appendChild(delIcon);
      const edit = document.createElement("button");
      const editIcon = document.createElement("img");
      editIcon.setAttribute("src", "./../icons/edit (2).png");
      editIcon.setAttribute("alt", "edit icon");
      editIcon.setAttribute("class", "icon");
      ShowDiv.appendChild(edit);
      edit.setAttribute("class", "btn");
      edit.appendChild(editIcon);
      const hideDiv = document.createElement("div");
      showMessage.appendChild(hideDiv);
      out.textContent = value;
      //EDit function
      // delete function
      edit.addEventListener("click", function () {
        ShowDiv.style.display = "none";
        hideDiv.setAttribute("class", "hide");
        const inputUpdate = document.createElement("input");
        inputUpdate.setAttribute("type", "text");
        hideDiv.appendChild(inputUpdate);
        inputUpdate.setAttribute("class", "in");
        const updateBtn = document.createElement("button");
        const updateIcon = document.createElement("img");
        updateIcon.setAttribute("src", "./../icons/reload.png");
        updateIcon.setAttribute("alt", "update icon");
        updateBtn.setAttribute("class", "btn");
        updateIcon.setAttribute("class", "icon");
        hideDiv.appendChild(updateBtn);
        updateBtn.appendChild(updateIcon);
        updateBtn.addEventListener("click", function () {
          firebase
            .database()
            .ref("messages/" + key)
            .update({
              message: inputUpdate.value,
            });
          out.textContent = inputUpdate.value;
          hideDiv.style.display = "none";
          ShowDiv.style.display = "flex";
          window.location.reload();
        });
      });
      del.addEventListener("click", function () {
        firebase
          .database()
          .ref("messages/" + key)
          .remove();
        ShowDiv.remove();
      });
    });
  });
let back = () => {
  history.back();
};
