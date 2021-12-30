import axios from "axios";

const baseURL = "https://letschat114.herokuapp.com";

export function userJoining(
  usertochat,
  existinguser,
  setuserprofile,
  newuser,
  userinput,
  socket
) {
  //when user to chat with is selected
  if (usertochat && existinguser) {
    setuserprofile(existinguser);
    socket.emit(
      "join",
      { existinguser, newuser: newuser ? newuser : usertochat },
      (error) => {
        console.log(error);
      }
    );
  }
  // when a user refreshes or login
  if (existinguser) {
    setuserprofile(existinguser);
    socket.emit("join", existinguser, (error) => {
      console.log(error);
    });
    //For adding new users
  } else {
    localStorage.clear();

    setuserprofile(userinput);
    socket.emit("join", userinput, (error) => {
      console.log(error);
    });
  }
}
export const getusertyping = (user, setuserTyping, setshowusertyping) => {
  setuserTyping(user);
  setshowusertyping(true);
  setTimeout(() => {
    setshowusertyping(false);
  }, 7000);
};
export const getmessages = async (setDBmessages) => {
  const { data: userinfo } = await axios.get(`${baseURL}/usermessages`);

  setDBmessages(userinfo);
};

export const inputSubmitAuth = (userinput, seteror) => {
  let authenticated = false;
  if (userinput.firstname === "") {
    seteror("Please enter your firstname");
  } else if (userinput.secondname === "") {
    seteror("Please enter your lastname");
  } else if (userinput.phone.length === 0) {
    seteror("Please enter your phone Number");
  } else if (userinput.password === "") {
    seteror("Enter your password");
  } else if (isNaN(userinput.phone)) {
    seteror("Please enter a Valid phone Number");
  } else if (userinput.phone.length < 10) {
    seteror("Your phone Number must be at least 10 characters long");
  } else {
    authenticated = true;
  }

  return { authenticated };
};

export const gethistory = (
  allusers,
  chatHistoryContainingId,
  history,
  sethistory
) => {
  if (chatHistoryContainingId) {
    for (let i = 0; i < chatHistoryContainingId?.length; i++) {
      for (let j = 0; j < allusers?.length; j++) {
        if (chatHistoryContainingId[i]?.user?.id === allusers[j]?.id) {
          const allreadyInData = history.find(
            (user) => user.id === allusers[j]?.id
          );
          !allreadyInData && sethistory([...history, allusers[j]]);
        }
      }
    }
  }
};
export const handleRefresh = (
  socketInstance,
  existinguser,
  history,
  setshowInputBox
) => {
  localStorage.clear();
  socketInstance.emit("userleft", existinguser?.userinfo.id);
  history.push("/");
  window.location.reload();
  setshowInputBox(true);
};
