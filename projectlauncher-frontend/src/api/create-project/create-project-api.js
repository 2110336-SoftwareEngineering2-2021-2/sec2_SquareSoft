import axios from "axios";
import { basedURL } from "../index";
import jwt from "jwt-decode";
import Cookies from "js-cookie";

async function createProject(
  name,
  purpose,
  describtion,
  type,
  category,
  endDate,
  targetAmount,
  image,
  videoLink
) {
  const projectOwnerID = await jwt(Cookies.get("token"))._id;
  const response = await axios.post(basedURL.concat("create-project"), {
    projectName: name,
    objective: purpose,
    describtion: describtion,
    fundingType: type,
    category: category,
    deadline: endDate,
    fundingGoal: targetAmount,
    fundingMoneyStatus: 0,
    projectOwnerID: projectOwnerID,
    projectPicture: image,
    projectVideo: videoLink,
    projectPublishStatus: "unpublished",
  });
  return await response;
}

export default createProject;
