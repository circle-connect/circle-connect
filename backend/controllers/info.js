const pool =require('../models/db')

const Personal =(req,res)=>{
const { first_name,
    last_name,
    email_work,
    location,
    LinkedIn_link,
    LinkedIn_label,
    facbook_link,
    facbook_label,
    snapchat_link,
    snapchat_lable,
    X_link,
    X_lable,
    instagram_link,
    instagram_lable,
    phone_no,
    Info1_link,
    Info1_lable,
    Info2_link,
    Info2_lable,
    user_image,
    role_id,
    subscribed,
    check_created,
    check_updated} =req.body
    const query =`INSERT INTO users
     (first_name,
        last_name,
        email_work,
        location,
        LinkedIn_link,
        LinkedIn_label,
        facbook_link,
        facbook_label,
        snapchat_link,
        snapchat_lable,
        X_link,
        X_lable,
        instagram_link,
        instagram_lable,
        phone_no,
        Info1_link,
        Info1_lable,
        Info2_link,
        Info2_lable,
        user_image,
        role_id,
        subscribed,
        check_created,
        check_updated) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24) RETURNING *`
const VALUES =
[first_name,
    last_name,
    email_work,
    location,
    LinkedIn_link,
    LinkedIn_label,
    facbook_link,
    facbook_label,
    snapchat_link,
    snapchat_lable,
    X_link,
    X_lable,
    instagram_link,
    instagram_lable,
    phone_no,
    Info1_link,
    Info1_lable,
    Info2_link,
    Info2_lable,
    user_image,
    role_id,
    subscribed,
    check_created,
    check_updated];
    pool
.query(query,VALUES)
.then(result=>{
res.status(200).json({message:result.rows})
})
.catch(err=>{
    res.status(400).json({
        success: false,
        message: err,
      })
})
}

const updatePersonal = (req,res)=>{
const id =req.params.id
const { 
    first_name,
    last_name,
    email_work,
    location,
    LinkedIn_link,
    LinkedIn_label,
    facbook_link,
    facbook_label,
    snapchat_link,
    snapchat_lable,
    X_link,
    X_lable,
    instagram_link,
    instagram_lable,
    phone_no,
    Info1_link,
    Info1_lable,
    Info2_link,
    Info2_lable,
    user_image,
    role_id,
    subscribed,
    check_created,
    check_updated
} =req.body

    const VALUES =
[
    first_name || null,
    last_name || null,
    email_work || null,
    location || null,
    LinkedIn_link || null,
    LinkedIn_label || null,
    facbook_link || null,
    facbook_label || null,
    snapchat_link || null,
    snapchat_lable || null,
    X_link || null,
    X_lable || null,
    instagram_link || null,
    instagram_lable || null,
    phone_no || null,
    Info1_link || null,
    Info1_lable || null,
    Info2_link || null,
    Info2_lable || null,
    user_image || null,
    role_id || null,
    subscribed || null,
    check_created || null,
    check_updated || null
 ];
    const query=`
    UPDATE users
    SET 
        first_name = COALESCE($1, first_name),
        last_name = COALESCE($2, last_name),
        email_work = COALESCE($3, email_work),
        location = COALESCE($4, location),
        LinkedIn_link = COALESCE($5, LinkedIn_link),
        LinkedIn_label = COALESCE($6, LinkedIn_label),
        facbook_link = COALESCE($7, facbook_link),
        facbook_label = COALESCE($8, facbook_label),
        snapchat_link = COALESCE($9, snapchat_link),
        snapchat_lable = COALESCE($10, snapchat_lable),
        X_link = COALESCE($11, X_link),
        X_lable = COALESCE($12, X_lable),
        instagram_link = COALESCE($13, instagram_link),
        instagram_lable = COALESCE($14, instagram_lable),
        phone_no = COALESCE($15, phone_no),
        Info1_link = COALESCE($16, Info1_link),
        Info1_lable = COALESCE($17, Info1_lable),
        Info2_link = COALESCE($18, Info2_link),
        Info2_lable = COALESCE($19, Info2_lable),
        user_image = COALESCE($20, user_image),
        role_id = COALESCE($21, role_id),
        subscribed = COALESCE($22, subscribed),
        check_created = COALESCE($23, check_created),
        check_updated = COALESCE($24, check_updated)
    WHERE id = ${id}
    RETURNING *;`

    pool.query(query,VALUES).
    then(result =>{
        res.status(200).json({message:result.rows})
    }).catch(err =>{
        res.status(409).json({
          success: false,
          message: "server error",
          err:err.message,
        });
      })
}
const getUser =(req,res)=>{
    const id = req.params.id
    const query ='SELECT * FROM users WHERE id = $1'
    const VALUES =[id]
    pool.query(query,VALUES).
    then(result =>{
        res.status(200).json({message:result.rows})
    }).catch(err =>{
        res.status(409).json({
          success: false,
          message: "server error",
          err:err.message,
        });
      })
}
module.exports={Personal,updatePersonal,getUser}