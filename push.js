const webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BOyZjSIsDaIj4w8iHjFxL5OoH8OsA19BtJXbnKiH34tQcFv1v3GUNb9yai4tFGluA7T_GPCMuJvS0oT5NLpQYfo",
    "privateKey": "A1f01rsErpCkJpOj1iybY7VrKoVgAeojimkQEuZZ_-A"
};

webPush.setVapidDetails(
    'mailto:rizalrahardi@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const pushSubscription = {
    "endpoint": " https://fcm.googleapis.com/fcm/send/ebW3otBHv64:APA91bG8U2QK63TWGuzCH7dKHpXlS19MfxTHTbEaRJcrVJZFOTCgknnbhXYHRSuMzzca1-EAZJaTAEQw6lvqK0RjaJMukxXUjZ6D5uzU0X6KpkN7tG2FQUe9b9j1EPDFy5L7j1lDXQER",
    "keys": {
        "p256dh": "BEa6/3pBtphvgAsqRsGDY24eW4iuZolg8+AHUnf1ucTxI8FMo3R2YxDSl1L9iCtX39S3x3Y/1n56rQX4P7ySy3U=",
        "auth": "0YkoeW4nNrLf9taNK5VRA=="
    }
};

const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

const options = {
    gcmAPIKey: '202300427607',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);