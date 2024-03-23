import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Wave from './media/Wave.png'
import picture from './media/Picture Profile.png'
import Location from './media/Location.png'
import Email from './media/Email.png'
import Facebook from './media/Facebook.png'
import Instgram from './media/Instagram.png'
import Links from './media/Links.png'
import Whatsapp from './media/Whatsapp.png'
import Twiter from './media/Twiter.png'
import Ahmad from './media/ahmad.png'



const User = () => {
  const { id } = useParams();
  const [dataInfo, setDataInfo] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://jalal.store:5000/info/${id}`);
        setDataInfo(response.data.message[0])
      console.log('dataInfo:',response.data.message[0]);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
 
  }, [id])
  return (
    <div className='main_dev_user'>
       <div className='Top_wave'>
        <img className='wave' src={Wave}></img>
        <img className='picture' src={dataInfo.user_image}></img>
        </div> 
       
<div className='social_media_section'>

    {dataInfo.location &&<div className='social_media'>
  <img className='social_media_img' src={Location}></img>
  <a href="https://www.example.com">{dataInfo.location }</a>
    </div>}
    {dataInfo.email_work &&<div className='social_media'>
  <img className='social_media_img' src={Email}></img>
  <a href={dataInfo.email_work }>{dataInfo.email_work}</a>
    </div>}
   {dataInfo.phone_no && <div className='social_media' onClick={()=>{
        window.location.href = `https://api.whatsapp.com/send?phone=${dataInfo.phone_no}`;
      }}> 
  <img className='social_media_img' src={Whatsapp}></img>
  <a href={`https://api.whatsapp.com/send?phone=${dataInfo.phone_no}`}>{dataInfo.phone_no}</a>
  
    </div>}
    {dataInfo.facbook_link && <div className='social_media'>
  <img className='social_media_img' src={Facebook}></img>
  <a href={dataInfo.facbook_link }>{dataInfo.facbook_label}</a>
    </div>}
   {dataInfo.x_link && <div className='social_media'>
  <img className='social_media_img' src={Twiter}></img>
  <a href={dataInfo.x_link}>{dataInfo.x_lable}</a>
    </div>}
    {dataInfo.instagram_link &&<div className='social_media'>
  <img className='social_media_img' src={Instgram}></img>
  <a href={dataInfo.instagram_link}>{dataInfo.instagram_lable }</a>
    </div>}
    {dataInfo.linkedin_link &&<div className='social_media'>
  <img className='social_media_img' src={Links}></img>
  <a href={dataInfo.linkedin_link}>{dataInfo.linkedin_label}</a>
    </div>}
</div>
       <div className='button'>
        <button className='save_button'>
          <p className='word_in_button_save'>SAVE CONTACT</p>
        </button>
       </div>
    </div>
  )
}

export default User