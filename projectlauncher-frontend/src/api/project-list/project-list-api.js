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

export {
    getAllProjects,
    getFilteredProjects
};