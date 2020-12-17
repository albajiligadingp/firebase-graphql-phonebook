const firebase = require("firebase");

const getPhonebooks = () => {
    const phoneReference = firebase.database().ref("/phonebook/");
    return (new Promise((resolve, reject) => {
        phoneReference.on("value", function (snapshot) {
            const folders = snapshot.val();
            if (folders === null) {
                resolve([]);
            } else {
                const data = Object.keys(folders).map(o => Object.assign({ id: o }, folders[o]));
                resolve(data);
            }
            phoneReference.off("value");
        }, (errorObject) => {
            console.log("The read failed: " + errorObject.code);
            reject("The read failed: " + errorObject.code);
        });
    }));
}

const createPhonebook = (phone) => {
    const referencePath = `/phonebook/${phone.id}/`;
    const phoneReference = firebase.database().ref(referencePath);
    return (new Promise((resolve, reject) => {
        phoneReference.set({ name: phone.name, phone: phone.phone }, (error) => {
            if (error) {
                reject("Data could not be deleted." + error);
            } else {
                resolve(phone);
            }
        });
    }));
}

const updatePhonebook = (phone) => {
    var referencePath = `/phonebook/${phone.id}/`;
    var phoneReference = firebase.database().ref(referencePath);
    return (new Promise((resolve, reject) => {
        phoneReference.update({ name: phone.name, phone: phone.phone }, (error) => {
            if (error) {
                reject("Data could not be deleted." + error);
            } else {
                resolve(phone);
            }
        });
    }));
}

const deletePhonebook = (phone) => {
    var referencePath = `/phonebook/${phone.id}/`;
    var phoneReference = firebase.database().ref(referencePath);
    return (new Promise((resolve, reject) => {
        phoneReference.remove((error) => {
            if (error) {
                reject("Data could not be deleted." + error);
            } else {
                resolve(phone);
            }
        })
    }));
}

module.exports = { getPhonebooks, createPhonebook, updatePhonebook, deletePhonebook }