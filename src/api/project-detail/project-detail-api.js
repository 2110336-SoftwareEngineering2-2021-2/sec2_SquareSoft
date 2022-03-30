import axios from 'axios'
import {
    basedURL
} from '../index.js';
const getProjectById=async (id)=> {
    const response = await axios.get(basedURL.concat(`project/find-by-id?_id=${id}`), {
    })
    const project=response.data

    return {
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
    getProjectById
};