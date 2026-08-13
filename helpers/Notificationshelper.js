import { getMessaging } from "firebase-admin/messaging";

export const sendPushNotification = async (
    fcmToken,
    title,
    body
) => {
    try {

        const message = {
            token: fcmToken,

            notification: {
                title,
                body
            },

            webpush: {
                notification: {
                    title,
                    body
                }
            }
        };

        const response = await getMessaging().send(message);

        console.log(
            "Notification sent successfully:",
            response
        );

        return response;

    } catch (error) {

        console.error(
            "FCM notification error:",
            error
        );

        throw error;
    }
};