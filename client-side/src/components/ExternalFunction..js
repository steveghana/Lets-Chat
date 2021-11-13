import axios from "axios";

const baseURL = "http://localhost:5000";
export function userJoining(
  usertochat,
  existinguser,
  setuserprofile,
  newuser,
  userinput,
  socket
) {
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
  if (existinguser) {
    setuserprofile(existinguser);
    socket.emit("join", existinguser, (error) => {
      console.log(error);
    });
  } else {
    sessionStorage.clear();

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

// export const signInAuth = (signInuser, signin) => {

// };

export const inputSubmitAuth = (
  userinput,
  err,
  seteror,
  setisLoading,
  history
) => {
  if (userinput.name === "") {
    console.log(userinput.name);
    err.current.innerText = "Please enter your name";
  } else if (userinput.phone.length === 0) {
    err.current.innerText = "Please enter your phone Number";
  } else if (isNaN(userinput.phone)) {
    err.current.innerText = "Please enter a Valid phone Number";
  } else if (userinput.phone.length < 10) {
    err.current.innerText =
      "Your phone Number must be at least 10 characters long";
  } else {
    seteror("");
    setisLoading(false);
    history.push(`/chat/${userinput.name}`);
  }
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
