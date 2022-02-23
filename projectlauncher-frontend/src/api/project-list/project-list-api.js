import axios from 'axios'
import {
    basedURL
} from '../index.js';

function getAllProjects() {
    return [{
            title: "Project 1",
            description: "description1 description1 description1 description1 description1 description1 description1 ",
            imageUrl: 'https://picsum.photos/500/300?random=1'
        },
        {
            title: "Project 2",
            description: "description1 description1 description1 description1 description1 description1 description1 ",
            imageUrl: 'https://picsum.photos/500/300?random=1'
        },
        {
            title: "Project 3",
            description: "description1 description1 description1 description1 description1 description1 description1 ",
            imageUrl: 'https://picsum.photos/500/300?random=1'
        },
        {
            title: "Project 4",
            description: "description1 description1 description1 description1 description1 description1 description1 ",
            imageUrl: 'https://picsum.photos/500/300?random=1'
        },
        {
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
            title: "Search 1",
            description: "description1 description1 description1 description1 description1 description1 description1 ",
            imageUrl: 'https://picsum.photos/500/300?random=1'
        },
        {
            title: "Search 2",
            description: "description1 description1 description1 description1 description1 description1 description1 ",
            imageUrl: 'https://picsum.photos/500/300?random=1'
        },
        {
            title: "Search 3",
            description: "description1 description1 description1 description1 description1 description1 description1 ",
            imageUrl: 'https://picsum.photos/500/300?random=1'
        },
    ]
}

function getMyProjects(token) {
    console.log(token)
    return [{
            title: "My project 1",
            description: "description1 description1 description1 description1 description1 description1 description1 ",
            imageUrl: 'https://picsum.photos/500/300?random=1'
        },
        {
            title: "My project 2",
            description: "description1 description1 description1 description1 description1 description1 description1 ",
            imageUrl: 'https://picsum.photos/500/300?random=1'
        }
    ]
}

function getProjectsOfAnOwner(ownerid, token) {
    const l = [{
            title: ownerid + "'s project 1",
            description: "description1 description1 description1 description1 description1 description1 description1 ",
            imageUrl: 'https://picsum.photos/500/300?random=1'
        },
        {
            title: ownerid + "'s project 2",
            description: "description1 description1 description1 description1 description1 description1 description1 ",
            imageUrl: 'https://picsum.photos/500/300?random=1'
        }
    ]
    if (token) {
        console.log(token)
        return {
            projectList: l,
            isOwner: true
        }
    }
    return {
        projectList: l,
        isOwner: false
    }
}

export {
    getAllProjects,
    getFilteredProjects,
    getMyProjects,
    getProjectsOfAnOwner
};