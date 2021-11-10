const incomingMessage = require("../models/model");
const usermessages = [];
let useronline = [];
let chathistory = [];
const getOtherUsersMessagesOffline = async (id, messages) => {
  const { otheruser, myinfo, message, time } = messages;
  const existinguser = await incomingMessage.findOne({ id });
  try {
    if (existinguser && messages.otheruser) {
      const userToChatWith = useronline.find(
        (user) => messages?.otheruser?.id === user?.id
      );
      if (!userToChatWith && messages?.id !== existinguser?.id) {
        await incomingMessage.updateOne(
          { id },
          {
            $addToSet: {
              messages: {
                user: {
                  ToSomeone: myinfo.id,
                  name: myinfo.name,
                  phone: myinfo.phone,
                  country: myinfo.country,
                },
                message: message,
                createdAt: String(time),
              },
            },
          }
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getOtherUsersMessages = async (id, messages) => {
  try {
    const existinguser = await incomingMessage.findOne({ id });

    if (existinguser.id === id) {
      await incomingMessage.updateOne(
        { id },
        {
          $addToSet: {
            messages: {
              user: {
                ToSomeone: messages.userinfo.id,
                name: messages.user,
                phone: messages.userinfo.phone,
                country: messages.userinfo.country,
              },
              message: messages.message,
              createdAt: String(time),
            },
          },
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const getmessages = async (id, message, { name }, otheruserId, time) => {
  try {
    const chat = chathistory.find((user) => user.user.id === otheruserId);
    if (!chat) {
      chathistory.push({ user: { id: otheruserId } });
      await incomingMessage.updateOne(
        { id },
        { $addToSet: { ChatHistory: { user: { id: otheruserId } } } }
      );
    }
    const existinguser = usermessages.find((user) => user.id === id);
    if (existinguser) {
      await incomingMessage.updateOne(
        { id },
        {
          $addToSet: {
            messages: {
              user: {
                FromMe: existinguser.id,
                otherId: otheruserId,
                name,
                createdAt: String(time),
              },
              message,
              createdAt: String(time),
            },
          },
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const addUser = async ({ id }, user) => {
  let err;
  try {
    const {
      name,
      phone,
      nickName,
      country,
      Birth,
      language,
      password,
      imagUrl,
    } = user;
    const trimedName = name.trim().toLowerCase();
    const trimedphone = phone.trim();
    const isuser = {
      id,
      name,
      phone,
      country,
      Birth,
      language,
      password,
      imagUrl,
    };

    usermessages.push({
      id,
      name: trimedName,
      phone,
      password,
      nickName,
      country,
      Birth,
      language,
      password,
    });
    const newUser = new incomingMessage({
      id,
      name: trimedName,
      phone: trimedphone,
      nickName,
      country,
      Birth,
      language,
      imagUrl,
      password,
    });

    await newUser.save();
    return { isuser, err };
  } catch (error) {
    console.log(error);
  }
};
const getUserFromDB = async (id) => {
  const possibleuser = await incomingMessage.findOne({ id });
  usermessages.push(possibleuser);

  return possibleuser;
};
const getHistory = async (id) => {
  const possibleuser = await incomingMessage.findOne({ id });
  chathistory = [];
  for (let i = 0; i < possibleuser?.ChatHistory?.length; i++) {
    chathistory.push(possibleuser.ChatHistory[i]);
  }
  return chathistory;
};
const getUser = (id) => {
  const user = usermessages.find((user) => user.id === id);
  return user;
};
const getUserOnline = async (id) => {
  const existinguser = await incomingMessage.findOne({ id });
  existinguser &&
    (await incomingMessage.updateOne({ id }, { connectionStatus: "online" }));
  useronline.push(existinguser);
};
const deleteUserFromHistory = (id) => {
  //  await incomingMessage.findOneAndDelete({id}).where()
};
const setusersOffline = (id) => {
  const existinguser = incomingMessage.findOne({ id });
  existinguser &&
    existinguser.findOneAndUpdate({ id }, { connectionStatus: "offline" });
};
const getuserTyping = (id) => {
  const onlineuser = useronline.find((user) => user.id === id);
  return { onlineuser };
};
const deleteUser = () => {};
const getuserByroom = async (room) => {
  const trimedRoom = room.trim();
  try {
    await incomingMessage.findOne({ trimedRoom });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getOtherUsersMessagesOffline,
  getHistory,
  getUserOnline,
  getOtherUsersMessages,
  getUserFromDB,
  addUser,
  getUser,
  deleteUser,
  getuserByroom,
  getmessages,
  setusersOffline,
  getuserTyping,
};
