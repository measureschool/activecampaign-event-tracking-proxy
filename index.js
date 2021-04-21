const APIKEY = '000000000000000000000000000000000000000' //replace the 0s with your AC API Key (e.g. 96ffd43f404e4b10ac701580d68f41c59ff7e9ad56f60f8.....)
const APIURL = '11111111111111111'  //replace the 1s with your Active Campaign API URL (e.g https://acurl.api-us1.com)
const EVENTKEY = '222222222222222222222'  //replace the 2s with your ActiveCampaign Event Key (e.g. ce450728b48c2e5568e01e38ca1f5b069)
const ACTID = '333333333333333' //repalce the 3s with your AciveCampaign ID (e.g. 251578439)


const axios = require('axios')
exports.helloWorld = async(req, res) => {
    let action = req.query.action
    let hash = req.query.hash
    let contactId = req.query.contactId
    let email = req.query.email
    let eventName = req.query.eventName
    let eventData = req.query.eventData
    let tag = req.query.tag
    let field = req.query.field
    let fieldValue = req.query.fieldValue

    if (action === 'trackEvent' && email) {

        let ac = await sendEvent(email, eventName, eventData)
            .then(res.send("all ok"))
            .catch(err => res.status(400)
                .end(err))

    } else if (action === 'trackEvent' && contactId) {
        console.log("getting contact Info")
        let ac = await getEmail(contactId)
            .then(data => sendEvent(data, eventName, eventData))
            .then(res.send("sent event"))
            .catch(err => res.status(400)
                .end(err))

    } else if (action === 'trackEvent' && hash) {
        console.log("getting contact Info from hash")
        let ac = await getEmailHash(hash)
            .then(data => sendEvent(data, eventName, eventData))
            .then(res.send("sent event"))
            .catch(err => res.status(400)
                .end(err))

    } else {
        console.log(action)
        res.status(400)

    }




    //console.log(ac)

};

async function sendEvent(email, eventName, eventData) {

    return new Promise((resolve, reject) => {
        let url = 'https://trackcmp.net/event';
        let data = 'actid=' + ACTID + '&key=' + EVENTKEY + '&event=' + eventName + '&eventdata=' + eventData + '&visit=%7B%22email%22%3A%22' + email + '%22%7D';
        axios
            .post(url, data, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
            .then(res => {
                resolve(res);
            })
            .catch(error => {
                reject(error);
            })

    });


}

async function getEmail(contactId) {

    return new Promise((resolve, reject) => {
        let url = APIURL + '/api/3/contacts/' + contactId;
        axios
            .get(url, { headers: { 'Api-Token': APIKEY } })
            .then(res => {
                console.log(res);
                resolve(res.data.contact.email);
            })
            .catch(error => {
                reject(error);
            })

    });


}

async function getEmailHash(hash) {

    return new Promise((resolve, reject) => {
        let url = APIURL + '/admin/api.php?api_action=contact_view_hash&api_key=' + APIKEY + '&hash=' + hash + '&api_output=json';
        axios
            .get(url, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
            .then(res => {
                console.log(res);
                resolve(res.data.email);
            })
            .catch(error => {
                reject(error);
            })

    });


}
