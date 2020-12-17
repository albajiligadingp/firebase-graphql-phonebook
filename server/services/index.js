const firebase = require("firebase");

const getPhonebooks = () => {
    const userReference = firebase.database().ref("/phonebook/");
    return (new Promise((resolve, reject) => {
        userReference.on("value", function (snapshot) {
            const folders = snapshot.val();
            if (folders === null) {
                resolve([]);
            } else {
                const data = Object.keys(folders).map(o => Object.assign({ id: o }, folders[o]));
                resolve(data);
            }
            userReference.off("value");
        }, (errorObject) => {
            console.log("The read failed: " + errorObject.code);
            reject("The read failed: " + errorObject.code);
        });
    }));
}

const createPhonebook = (user) => {
    const referencePath = `/phonebook/${user.id}/`;
    const userReference = firebase.database().ref(referencePath);
    return (new Promise((resolve, reject) => {
        userReference.set({ name: user.name, phone: user.phone }, (error) => {
            if (error) {
                reject("Data could not be deleted." + error);
            } else {
                resolve(user);
            }
        });
    }));
}

const updatePhonebook = (user) => {
    var referencePath = `/phonebook/${user.id}/`;
    var userReference = firebase.database().ref(referencePath);
    return (new Promise((resolve, reject) => {
        userReference.update({ name: user.name, phone: user.phone }, (error) => {
            if (error) {
                reject("Data could not be deleted." + error);
            } else {
                resolve(user);
            }
        });
    }));
}

const deletePhonebook = (user) => {
    var referencePath = `/phonebook/${user.id}/`;
    var userReference = firebase.database().ref(referencePath);
    return (new Promise((resolve, reject) => {
        userReference.remove((error) => {
            if (error) {
                reject("Data could not be deleted." + error);
            } else {
                resolve(user);
            }
        })
    }));
}

module.exports = { getPhonebooks, createPhonebook, updatePhonebook, deletePhonebook }