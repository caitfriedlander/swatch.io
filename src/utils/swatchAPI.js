import tokenService from './tokenService';
const BASE_URL = '/api/swatches';

function index() {
    return fetch(BASE_URL, getAuthRequestOptions('GET'))
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Something Went Wrong');
    })
    .then(({ swatches }) => swatches);
}

function create(swatch) {
    var options = getAuthRequestOptions('POST');
    options.body = JSON.stringify(swatch);
    return fetch(BASE_URL, options)
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Something Went Wrong');
    })
    .then((swatch) => swatch);
}

function show(swatchid) {
    var options = getAuthRequestOptions('GET');
    return fetch(`${BASE_URL}/${swatchid}`, options)
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Something Went Wrong');
    })
    .then(({swatch}) => swatch);
}

function update(swatch) {
    var options = getAuthRequestOptions('PUT');
    options.body = JSON.stringify(swatch);
    return fetch(`${BASE_URL}/${swatch.id}`, options)
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Something Went Wrong');
    })
    .then(({swatch}) => swatch);
}

function destroy(swatchid, projectid) {
    var options = getAuthRequestOptions('DELETE');
    if (projectid) options.body = JSON.stringify({projectId: projectid});
    return fetch(`${BASE_URL}/${swatchid}`, options)
    .then(res => {
        console.log('Swatch deleted');
    })
    .catch(err => {
        console.error(err);
    });
}

function swatch() {
    var options = getAuthRequestOptions('GET');
    return fetch(`${BASE_URL}/get`, options)
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Something Went Wrong');
    })
    .then((swatch) => swatch);
}

function info() {
    var options = getAuthRequestOptions('GET');
    return fetch(`${BASE_URL}/info`, options)
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Something Went Wrong');
    })
    .then((info) => info);
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
    show,
    swatch,
    info,
    update,
    delete: destroy
};