import axios from 'axios'
import {
    basedURL
} from '../index.js';

function getProjectList(searchValue, status, type, category) {
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
    getProjectList
};