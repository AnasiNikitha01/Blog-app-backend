import {mongoose,model,Schema} from "mongoose";

const post_schema = new Schema({
    title:{
       type: String,
       require:true
    },
    summary:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    files:{
        type:String, //because we get it as a string value from uploads
    },
    author:{
        type:Schema.Types.ObjectId,
        ref: 'Users'
    }
},{
        timestamps:true,
    
});

const Posts_model = model('Posts',post_schema);
export default Posts_model;