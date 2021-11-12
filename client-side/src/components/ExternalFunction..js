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

export const handleSubmit = (
  e,
  setrecievedmessages,
  existinguser,
  messagesSent,
  setsentmessage,
  sentmessage,
  socket,
  newuser,
  usertochat,
  initialState,
  recievedmessages,
  setmessagesSent
) => {
  e.preventDefault();
  const time = new Date().toLocaleTimeString();

  setrecievedmessages([
    ...recievedmessages,
    {
      user: existinguser.userinfo.name,
      message: messagesSent.message,
      userid: existinguser.userinfo.id,
      time,
    },
  ]);
  setsentmessage([...sentmessage, messagesSent]);
  messagesSent &&
    socket.emit("sendMessage", {
      message: messagesSent.message,
      myinfo: existinguser.userinfo,
      id: existinguser.userinfo.id,
      otheruserId: newuser.id,
      time,
    });
  setmessagesSent(initialState);
};

export const signInAuth = (signInuser, signin) => {
  if (signInuser.phone.length === 0) {
    signin.current.innerText = "Please enter your phone Number";
  }
  if (isNaN(signInuser.phone)) {
    signin.current.innerText = "Please enter a valid phone Number";
  }
  if (signInuser.phone.length > 1 && signInuser.phone.length < 10) {
    signin.current.innerText = "Please enter a valid phone number";
  }
};

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

export const gethistory = async (allusers, chatHistory, setchatHistory) => {
  if (History) {
    for (let i = 0; i < History?.length; i++) {
      for (let j = 0; j < allusers?.length; j++) {
        if (History[i]?.user.id === allusers[j]?.id) {
          const allreadyInData = chatHistory.find(
            (user) => user.id === allusers[j]?.id
          );
          !allreadyInData && setchatHistory([...chatHistory, allusers[j]]);
        }
      }
    }
  }
};

export const getusers = async (
  setLoading,
  existinguser,
  setHistory,
  setAllusers,
  setfilteredUsers,
  usertoChat,
  setconnectionStatus
) => {
  setLoading(true);
  const { data: userinfo } = await axios.get(`${baseURL}/usermessages`);
  userinfo && setLoading(false);
  const myinfo = userinfo?.find(
    (user) => user?.id === existinguser?.userinfo.id
  );
  setHistory(myinfo?.ChatHistory);
  const usersExceptMe = userinfo?.filter(
    (user) => user?.id !== existinguser?.userinfo.id
  );
  setAllusers(usersExceptMe);
  setfilteredUsers(usersExceptMe);
  const userconnection = usersExceptMe.find(
    (user) => user?.id === usertoChat?.id
  );
  setconnectionStatus(userconnection?.connectionStatus);
  return userinfo;
};
