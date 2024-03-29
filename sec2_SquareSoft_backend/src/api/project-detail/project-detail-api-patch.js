import axios from 'axios'
import {
    basedURL, getToken
} from '../index.js';
const getProjectByPatch=async (id)=> {
    let req = { "projectID": id, "fields": {}}
    const response = await axios.patch(basedURL.concat('project/edit-project'), req, {
        headers: { Authorization: "Bearer " + getToken() }
    })
    const project=response.data

    return {
        objective: project.objective,
        projectName: project.projectName,
        description: project.description,
        fundingType: project.fundingType,
        category: project.category,
        deadline: project.deadline,
        fundingGoal: project.fundingGoal,
        fundingMoneyStatus: project.fundingMoneyStatus,
        imageUrl: project.projectPicture
    }
    
}

export {
    getProjectByPatch
};