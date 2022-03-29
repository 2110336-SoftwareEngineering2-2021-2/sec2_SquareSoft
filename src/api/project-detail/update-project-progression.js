import axios from 'axios'
import { basedURL, getToken, getConfig } from '../index';

async function getProjectProgressByID(id) {
    const response = await axios.get(basedURL.concat('project/project-progress/').concat(id));
    return await response;
}

async function setProjectProgression(id,progress) {
    const token = getToken();
    const config = getConfig(token);

    const response = await axios.get(   basedURL.concat('project/update-project'), 
                                        {projectID : id, progress : progress}, 
                                        config);

    console.log(response);
    return await response;
}


export {getProjectProgressByID, setProjectProgression};