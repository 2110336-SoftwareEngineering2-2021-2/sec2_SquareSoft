import axios from "axios";
import { getConfigWithToken, basedURL } from "../index";
import jwt from "jwt-decode";
import Cookies from "js-cookie";

async function createProject(
  name,
  purpose,
  description,
  type,
  category,
  endDate,
  targetAmount,
  image,
  videoLink
) {
  const projectOwnerID = await jwt(Cookies.get("token"))._id;
  const body = {
    projectName: name,
    objective: purpose,
    description: description,
    fundingType: type,
    category: category,
    deadline: endDate,
    fundingGoal: parseInt(targetAmount),
    fundingMoneyStatus: 0,
    projectOwnerID: projectOwnerID,
    projectPicture: image,
    projectVideo: videoLink,
    projectPublishStatus: "unpublished",
  };
  const response = await axios.post(
    basedURL.concat("project/create"),
    body,
    getConfigWithToken()
  );
  return await response;
}

export default createProject;
