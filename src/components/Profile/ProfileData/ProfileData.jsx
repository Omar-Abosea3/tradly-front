import { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';
import Cookies from 'js-cookies';
import profilePlaceholder from '../../../assets/profilePlaceholder.jpeg';
import { useTranslation } from 'react-i18next';
import $ from 'jquery';
import { toast } from 'react-toastify';
export default function ProfileData() {
    const [profileData, setProfileData] = useState(null);
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
            setProfileData(data.profileData);
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

    const updateProfile = async () => {
        $('#successEditBtn').html("<i class='fa fa-spinner fa-spin'></i>");
        const Authorization = Cookies.getItem('token');
        const editData = {};
        if(profileData?.firstName !== $('#profileFirstName').val()){
            editData.firstName = $('#profileFirstName').val();
        }if(profileData?.lastName !== $('#profileLastName').val()){
            editData.lastName = $('#profileLastName').val();
        }if(profileData?.age !== $('#profileAge').val()){
            editData.age = $('#profileAge').val();
        }if(profileData?.phone !== $('#profilePhone').val()){
            editData.phone = $('#profilePhone').val();
        }
        try {
            const {data} = await axios.put(`${process.env.REACT_APP_APIBASEURL}/user` , editData , {
                headers:{
                    bearertoken:Authorization,
                }
            });
            console.log(data);
            getProfileData();
            toast.success('Data Edited Successfully ');
            $('#successEditBtn').html("save");
            hideEditLayer()
        } catch (error) {
            $('#successEditBtn').html("save");
            console.log(error);
            toast.error('Data Editing Failed ! , please check data and try again');
        }
    }

    const hideEditLayer = () => {
        $('#editProfileLayer').fadeOut('fast');
        getProfileData();
    }
    const showEditLayer = () => {
        $('#editProfileLayer').fadeIn('fast').css('display' , 'flex');
        getProfileData();
    }
    useEffect(() => {
        getProfileData();
    },[])
  return (
    <>
      <div id="profileDataPage">
        <div className="d-flex justify-content-center align-items-center mb-4">
          <figure>
            <img src={ProfileImage} alt="profile" />
            <div
              onClick={openPicInput}
              style={{
                right: i18n.language === "ar" ? "none" : "0px",
                left: i18n.language === "ar" ? "0px" : "none",
              }}
              id="editProfilePicIcon"
            >
              <i className="bi bi-pencil-fill"></i>
              <input
                type="file"
                id="profilePicInput"
                onChange={(e) => {
                  updateProfilePic(e);
                }}
              />
            </div>
          </figure>
        </div>
               
        <div className="profileContent p-3 rounded-3">
          <div className="row gy-3 gx-2 mb-5">
            <div className="col-lg-6 col-12">
              <div>
                <h3>
                  <span>User Name : </span> {profileData?.userName}
                </h3>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div>
                <h3>
                  <span>Email : </span> {profileData?.email}
                </h3>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div>
                <h3>
                  <span>Phone : </span> {profileData?.phone}
                </h3>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div>
                <h3>
                  <span>Gender : </span> {profileData?.gender}
                </h3>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div>
                <h3>
                  <span>Age : </span> {profileData?.age}
                </h3>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div>
                <h3>
                  <span>Role : </span> {profileData?.role}
                </h3>
              </div>
            </div>
          </div>
          <div>
            <button onClick={showEditLayer} id="editProfileBtn">Edit Profile</button>
          </div>

          <div id="editProfileLayer">
            <div id='editProfileContent'>
              <div className="row gy-3 gx-2 mb-5">
                <div className="col-lg-6 col-12">
                  <div>
                    <label htmlFor="profileFirstName">FirstName</label>
                    <input
                      type="text"
                      id="profileFirstName"
                      defaultValue={profileData?.firstName}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div>
                    <label htmlFor="profileLastName">LastName</label>
                    <input
                      type="text"
                      id="profileLastName"
                      defaultValue={profileData?.lastName}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div>
                    <label htmlFor="profileAge">Age</label>
                    <input
                      type="number"
                      min={14}
                      max={100}
                      id="profileAge"
                      defaultValue={profileData?.age || 14}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div>
                    <label htmlFor="profilePhone">Phone</label>
                    <input
                      type="text"
                      id="profilePhone"
                      defaultValue={profileData?.phone}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button id='successEditBtn' onClick={updateProfile}>save</button>
                <button onClick={hideEditLayer} className='cancel'>cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
