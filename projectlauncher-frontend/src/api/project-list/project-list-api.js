import axios from 'axios'
import {
    basedURL
} from '../index.js';
import {
    getFileURL
} from '../file-uploader/file-uploader.js'

function getAllProjects() {
    return [{
            _id: "id1",
            title: "Project 1",
            description: "description1 description1 description1 description1 description1 description1 description1 ",
            imageUrl: 'https://picsum.photos/500/300?random=1'
        },
        {
            _id: "id2",
            title: "Project 2",
            description: "description1 description1 description1 description1 description1 description1 description1 ",
            imageUrl: 'https://picsum.photos/500/300?random=1'
        },
        {
            _id: "id3",
            title: "Project 3",
            description: "description1 description1 description1 description1 description1 description1 description1 ",
            imageUrl: 'https://picsum.photos/500/300?random=1'
        },
        {
            _id: "id4",
            title: "Project 4",
            description: "description1 description1 description1 description1 description1 description1 description1 ",
            imageUrl: 'https://picsum.photos/500/300?random=1'
        },
        {
            _id: "id5",
            title: "Project 5",
            description: "description1 description1 description1 description1 description1 description1 description1 ",
            imageUrl: 'https://picsum.photos/500/300?random=1'
        },
    ]
}

function getFilteredProjects(searchValue, status, type, category) {
    console.log(searchValue)
    console.log(status)
    console.log(type)
    console.log(category)
    return [{
            _id: "id1",
            title: "Search 1",
            description: "description1 description1 description1 description1 description1 description1 description1 ",
            imageUrl: 'https://picsum.photos/500/300?random=1'
        },
        {
            _id: "id2",
            title: "Search 2",
            description: "description1 description1 description1 description1 description1 description1 description1 ",
            imageUrl: 'https://picsum.photos/500/300?random=1'
        },
        {
            _id: "id3",
            title: "Search 3",
            description: "description1 description1 description1 description1 description1 description1 description1 ",
            imageUrl: 'https://picsum.photos/500/300?random=1'
        },
    ]
}

async function getMyProjects(token) {
    const response = await axios.get(basedURL.concat(`project/find-by-owner`), {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const projectList = await Promise.all(response.data.map(async (e) => {
        const img_response = await getFileURL(e.projectPicture)
        const imgUrl = img_response.data
        //const imgUrl = 'https://picsum.photos/500/300?random=1'
        return {
            _id: e._id,
            title: e.projectName,
            description: e.description,
            imageUrl: imgUrl,
        }
    }))

    return projectList
}

async function getProjectsOfAnOwner(ownerid, token) {
    const response = await axios.get(basedURL.concat(`project/find-by-owner-publish?projectOwnerID=${ownerid}`))

    const projectList = await Promise.all(response.data.map(async (e) => {
        const img_response = await getFileURL(e.projectPicture)
        const imgUrl = img_response.data
        // const imgUrl = 'https://picsum.photos/500/300?random=1'
        return {
            _id: e._id,
            title: e.projectName,
            description: e.description,
            imageUrl: imgUrl,
        }
    }))

    return projectList
}

export {
    getAllProjects,
    getFilteredProjects,
    getMyProjects,
    getProjectsOfAnOwner
};