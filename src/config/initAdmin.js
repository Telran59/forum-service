import UserAccount from "../models/userAccount.model.js";

export async function createAdmin(){
    let admin = await UserAccount.findById('admin');
    if(!admin) {
        admin = new UserAccount({
            login: 'admin',
            password: 'admin',
            firstName: 'Administrator',
            lastName: 'Administrator',
            roles: ['User', 'Moderator', 'Administrator'],
        });
        await admin.save();
    }
}