const incomingMessage = require("../models/model");
const { getHistory } = require("../utilities/utilis");
const getMessages = async (req, res) => {
  try {
    const messages = await incomingMessage.find({});
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
  }
};

const getchatHistory = async (req, res) => {
  const { id } = req.params;
  try {
    const { chathistory } = getHistory(id);

    res.status(200).send(chathistory);
  } catch (error) {
    res.status(400).json("something went wrong");
    console.log(error);
  }
};

const getuserbyid = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await incomingMessage.findOne({ id });
    res.status(200).send(user);
  } catch (error) {
    res.status(404).json("no user was found");
    console.log(error);
  }
};

const getChangedNum = async (req, res) => {
  const { number, id } = req.body;
  try {
    const user = await incomingMessage.find({ id });
    user && (await incomingMessage.updateOne({ id }, { phone: number }));
    res.status(200).send("Your number has now changed");
  } catch (error) {
    console.log(error);
    res.send("Operation unsuccesful, please try again later");
  }
};

const userSigningIn = async (req, res) => {
  const { phone } = req.body;
  try {
    const userexist = await incomingMessage.findOne({ phone });
    if (!userexist) return res.send({ error: "User doesnt exist" });
    return res.status(200).send({ userexist });
  } catch (error) {
    return res.status(404).send("something went wrong");
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await incomingMessage.find({ id });
    if (user) {
      const result = await incomingMessage.deleteOne({ id });
      if (result.deletedCount === 1) {
        return res.status(200).send({
          message: "Your account has been deleted, navigating to sign up",
        });
      } else {
        return res.send({
          error: "Operation unsuccesful, please try again later",
        });
      }
    } else {
      return res.send({
        error: "No user found",
      });
    }
  } catch (error) {
    res.status(404).json("something went wrong");
    console.log(error);
  }
};
module.exports = {
  getMessages,
  getuserbyid,
  getchatHistory,
  getChangedNum,
  deleteUser,
  userSigningIn,
};
