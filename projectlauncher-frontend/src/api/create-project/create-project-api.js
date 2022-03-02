import axios from "axios";
import { getConfigWithToken, basedURL } from "../index";
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
  console.log(projectOwnerID);
  const response = await axios.post(
    basedURL.concat("project/create"),
    {
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
    },
    getConfigWithToken()
  );
  console.log("inside api");
  console.log(response);
  return await response;
}

export default createProject;
