// import mongoose from 'mongoose';
//
//
// const UserModel = new mongoose.Schema({
//     name :{
//         type: String,
//         required:true
//     },
//     email:{
//         type: String,
//         required:true,
//         unique:true,
//     },
//     password:{
//         type: String,
//         required:true
//     },
//     bio:{
//         type: String,
//         default:''
//     }
//
// })
// const User = mongoose.model('User', UserModel,'users');
// export default User;


import mongoose from 'mongoose';

const UserModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    // Add this field for profile pictures
    profileImage: {
        type: String,
        default: ''
    }
}, {
    // Add this option to automatically manage createdAt and updatedAt
    timestamps: true
});

const User = mongoose.model('User', UserModel, 'users');
export default User;