import mongoose from "mongoose";
import 'dotenv/config'
import validator from "validator";
import { USER, User } from "../constants";


const {Schema} = mongoose

const userSchema = new Schema({
    email:{
        type:String,
        lowercase:true,
        unique:true,
        required:true,
        validate:[validator.isEmail , "Please provide a valid email"]
    },

    username:{
        type:String,
       required:true,
        unique:true,
        trim:true,
        validate:{
            validator:function(value){
                return /^[A-z][A-z0-9-_]{3,23}$/.test(value)
            },
            message:"username must be alphanumeric without any special characters. , hyphens and underscores are allowed "
        }
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        validate:[
            validator.isAlphanumeric, 'firstName can only have alpha numeric values . Noi special characters allowed'
        ]
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        validate:[
            validator.isAlphanumeric, 'LastName can only have alpha numeric values . Noi special characters allowed'
        ]
    },
    password:{
        type:String,
        select:false,
        validate:[
            validator.isStrongPassword,
            "Password must be at least 8 characters long , with at least 1 uppercase and lowercase letters and at least 1 symbol"
        ]
    },
    passwordConfirm:{
        type:String,
        validate:{
            validator: function (value){
                return value === this.password
            },
            message:'Password do not match'
        }
    },

    isEmailVerified:{
type:Boolean,
required:true,
default:false
    },
    provider:{
        type:Sting,
        required:true,
        default:'email'

    },
    googleId:   String,
    avatar:String,
    businessName:String,
    phoneNumber:{
        type:   String,
        default:"+254123456789",
        validate:[
            validator.isMobilePhone,
            "Your mobile  Phone number must begin with a '+', followed by your country code then the actual  number e.g +254123456789"
        ]
    },

    address:String,
    city:String,
    country:String,
    passwordChangedAt:Date,

    role:{
        type:[String],
        default:[USER]
    },
    active:{
        type:Boolean,
        default:true
    },

    refreshToken:[String]
}, {
    timestamps:true,
})

userSchema.pre('save', async function(next) {
    if(this.roles.length === 0) {
        this.roles.push(USER)
        next()
    }
})

userSchema.pre('save', async function(next) {
 if(!this.isModified('password')){
    return next()
 }
})

userSchema.pre('save', async function(next) {
    if(this.roles.length === 0) {
        this.roles.push(USER)
        next()
    }
})

const salt = await bcrypt.genSalt(10)
this.password = await bcrypt.hash(this.password , salt)
this.passwordConfirm = undefined
next()

userSchema.pre('save', async function(next) {
 if(!this.isModified('password') || this.isNew){
    return next()
 }

 this.passwordChangedAt = Date.now()

 next()
})

userSchema.methods.comparePassword = async function(givenPassword){
    return await bcrypt.compare(givenPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default  User