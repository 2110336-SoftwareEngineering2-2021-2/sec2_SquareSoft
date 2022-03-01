import axios from "axios";
import { basedURL } from "../index";

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
  const response = await axios.post(basedURL.concat("create-project"), {
    name: name,
    purpose: purpose,
    describtion: describtion,
    type: type,
    category: category,
    endDate: endDate,
    targetAmount: targetAmount,
    image: image,
    videoLink: videoLink,
  });
  return await response;
}

export default createProject;
