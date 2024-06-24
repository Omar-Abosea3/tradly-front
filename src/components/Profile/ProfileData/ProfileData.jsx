import { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';
import Cookies from 'js-cookies';
import profilePlaceholder from '../../../assets/profilePlaceholder.jpeg';
import { useTranslation } from 'react-i18next';
export default function ProfileData() {
    const [profileData, setProfileData] = useState({});
    const [ProfileImage, setProfileImage] = useState(profilePlaceholder);
    const {i18n} = useTranslation();
    const getProfileData = async () => {
        const Authorization = Cookies.getItem('token');
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_APIBASEURL}/user/profile` , {
                headers:{
                    bearertoken:Authorization,
                }
            });
            console.log(data);
            setProfileData(profileData);
            if(data.profileData.profile_pic){
                setProfileImage(data.profileData.profile_pic.secure_url)
            };
        } catch (error) {
            console.log(error);
        }
    }
    const openPicInput = ()=>{
        document.getElementById('profilePicInput').click();
    }
    const updateProfilePic = async (e) => {
        const Authorization = Cookies.getItem('token');
        const formData = new FormData();
        formData.append('profile_pic' , e.target.files[0]);
        try {
            const {data} = await axios.post(`${process.env.REACT_APP_APIBASEURL}/user/profile_pic` , formData , {
                headers:{
                    bearertoken:Authorization,
                }
            });
            
            setProfileImage(data.user.profile_pic.secure_url);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getProfileData();
    },[])
  return <>
    <div id='profileDataPage'>
        <div className='d-flex justify-content-center align-items-center mb-4'>
            <figure>
                <img src={ProfileImage} alt="profile" />
                <div onClick={openPicInput} style={{right:i18n.language === 'ar' ? 'none':'0px' , left:i18n.language === 'ar' ? '0px':'none'}} id='editProfilePicIcon'>
                    <i className="bi bi-pencil-fill"></i>
                    <input type="file" id='profilePicInput'  onChange={(e)=>{updateProfilePic(e)}}/>
                </div>
            </figure>
        </div>
        
    </div>
  </>
}
