import tokenService from './tokenService';
const BASE_URL = '/api/projects';

function index() {
    return fetch(BASE_URL, getAuthRequestOptions('GET'))
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Something Went Wrong');
    })
    .then(({ projects }) => projects);
}

function create(project) {
    var options = getAuthRequestOptions('POST');
    options.body = JSON.stringify(project);
    return fetch(BASE_URL, options)
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Something Went Wrong');
    })
    .then(({ project }) => project);
}

function update(project) {

}

function show(projectid) {
    var options = getAuthRequestOptions('GET');
    return fetch(`${BASE_URL}/${projectid}`, options)
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Something Went Wrong');
    })
    .then(({project}) => project);
}

function addSwatch(projectid, swatchid) {
    // an update function technically
    var options = getAuthRequestOptions('PUT');
    return fetch(`${BASE_URL}/${projectid}/swatches/${swatchid}`, options)
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Something Went Wrong');
    })
    .then(({project}) => project);
}

function destroy(project) {

}

function getAuthRequestOptions(method) {
    return {
        method,
        headers: new Headers({
            'Authorization': `Bearer ${tokenService.getToken()}`,
            'Content-Type': 'application/json'
        })
    };
}

export default {
    index,
    create,
    update,
    show,
    addSwatch,
    delete: destroy
};