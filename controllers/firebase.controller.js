import { messaging } from "../config/firebase.js";
import {
    createUser,
    updateFCMToken,
    getUserFCMToken,
    saveNotification
} from "../helpers/Firebasehelper.js";
import { sendPushNotification } from "../helpers/Notificationshelper.js";

//register user
export const registerUser = async(req,res) =>{
   try{
     const{username,email,fcmToken} = req.body;

    if(!username||!email||!fcmToken)
    {
        return res.status(400).json({
                success: false,
                message: "userName, email and fcmToken are required"
            });
        }

        const user = await createUser(
            username,email,fcmToken
        );

        return res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            UserID: user.userId
        })
    
    }
    catch(error){
         console.error("Register user error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to register user"})
    }

}

//update token
export const updateToken = async (req,res) =>{
   try{
    const {userId} = req.params;
    const {fcmToken} = req.body;

    if(!userId || !fcmToken){
            return res.status(400).json({
            success: false,
            message: "userId and fcmToken are required"
            });
    }

    await updateFCMToken(userId,fcmToken)

    return res.status(200).json({
        success: true,
        message: "Token updated successfully"
    });
   }
   catch(error){
    res.status(500).json({
        success: false,
        message: "Failed to update Token"
    })
   }
}

//send notifications
export const testNotification = async (req, res) => {
    try {
        const { userId, title, body } = req.body;

        if (!userId || !title || !body) {
            return res.status(400).json({
                success: false,
                message: "userId, title and body are required"
            });
        }

        // 1. Get user's FCM token from Firestore
        const fcmToken = await getUserFCMToken(userId);

        if (!fcmToken) {
            return res.status(404).json({
                success: false,
                message: "FCM token not found for this user"
            });
        }

        // 2. Send notification
        const response = await sendPushNotification(
            fcmToken,
            title,
            body
        );

        // 3. Save notification in Firestore
        const notification = await saveNotification(
            userId,
            title,
            body
        );

        return res.status(200).json({
            success: true,
            message: "Notification sent successfully",
            messageId: response,
            notificationId: notification.notificationId
        });

    } catch (error) {
        console.error("Test notification error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to send notification",
            error: error.message
        });
    }
};