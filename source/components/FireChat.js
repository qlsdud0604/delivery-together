import firebase from 'firebase';

export default class FireChat {
    constructor() {
        this.init();
    }

    init = () => {
        if (firebase.apps.length === 0) {
            firebase.initializeApp({
                apiKey: 'AIzaSyBQLLkB8UURaJzKlJgkSZA_9wI7dhckg_c',
                authDomain: 'delivery-together-ce4d6.firebaseapp.com',
                databaseURL: 'https://delivery-together-ce4d6-default-rtdb.firebaseio.com',
                projectId: 'delivery-together-ce4d6',
                storageBucket: 'delivery-together-ce4d6.appspot.com',
                messagingSenderId: '173212582846',
                appId: '1:173212582846:web:0d87b8f820f474b4856fef',
                measurementId: 'G-K3G7M40Q7L'
            });
        }
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get ref() {
        return firebase.database().ref('messages');
    }

    parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;
        const timestamp = new Date(numberStamp);
        const message = {
            _id,
            timestamp,
            text,
            user
        };

        return message;
    }

    on = callback => {
        this.ref.limitToLast(20).on('child_added', snapshot => callback(this.parse(snapshot)));
    }

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];
            const message = {
                text,
                user,
                timestamp: this.timestamp
            };

            this.append(message);
        }
    }

    append = message => this.ref.push(message);

    off() {
        this.ref.off();
    }
}

FireChat.shared = new FireChat();