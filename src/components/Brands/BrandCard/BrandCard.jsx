import './style.css';
import FollowBtn from '../../FollowBtn/FollowBtn';
import UnfollowBtn from '../../UnfollowBtn/UnfollowBtn';
import { Link } from 'react-router-dom';
export default function BrandCard({brand , favBrand , home}) {
    
  return <>
    <div className="brandCard">
        <Link to={`/brands/${brand._id}`} className='text-decoration-none'>
            <figure>
                <img src={brand.logo.secure_url} alt={brand.name} />
            </figure>
        </Link>
        <figcaption>
            {!home&&<h3>{brand.name}</h3>}
            {favBrand.includes(brand._id) ? <UnfollowBtn id={brand._id}/>:<FollowBtn id={brand._id} />}
        </figcaption>
     
    </div>
  </>
}
