import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import home from '@/assets/icons/home.svg';
import homeFill from '@/assets/icons/homeFill.svg';
import search from '@/assets/icons/search.svg';
import searchFill from '@/assets/icons/searchFill.svg';
import create from '@/assets/icons/add.svg';
import createFill from '@/assets/icons/addFill.svg';
import bookmark from '@/assets/icons/bookmark.svg';
import bookmarkFill from '@/assets/icons/bookmarkFill.svg';
import user from '@/assets/icons/person.svg';
import userFill from '@/assets/icons/personFill.svg';
import { getCurrentUserData } from '@/util';
import getPbImage from '@/util/data/getPBImage';
import defaultProfile from '@/assets/images/defaultProfile.png';
import { isStore, page } from '@/stores/stores';

type RouteItem = {
  text: string;
  route: string;
  icon: string;
  iconFill: string;
};

const ROUTER_STATE: RouteItem[] = [
  {
    text: '홈',
    route: '/main',
    icon: home,
    iconFill: homeFill,
  },
  {
    text: '검색하기',
    route: '/search',
    icon: search,
    iconFill: searchFill,
  },
  {
    text: '생성하기',
    route: '/create',
    icon: create,
    iconFill: createFill,
  },
  {
    text: '북마크',
    route: '/bookmark',
    icon: bookmark,
    iconFill: bookmarkFill,
  },
  {
    text: '마이페이지',
    route: '/user/recent',
    icon: user,
    iconFill: userFill,
  },
];

const ROUTER_STATE_AUTH: RouteItem[] = [
  {
    text: '홈',
    route: '/main',
    icon: home,
    iconFill: homeFill,
  },
  {
    text: '검색하기',
    route: '/search',
    icon: search,
    iconFill: searchFill,
  },
  {
    text: '생성하기',
    route: '/create',
    icon: create,
    iconFill: createFill,
  },
  {
    text: '북마크',
    route: '/bookmark',
    icon: bookmark,
    iconFill: bookmarkFill,
  },
];

type GNBButtonProps = {
  route: string;
  icon: string;
  iconFill: string;
  text: string;
  currentPage: string;
};

function GNBButton({ route, icon, iconFill, text, currentPage }: GNBButtonProps) {
  const renderIcon = () => {
    if (currentPage === route) return iconFill;
    return icon;
  };

  return (
    <li className="flex basis-full">
      <Link to={route} className={`h-full w-full flex justify-center items-center`}>
        <img src={renderIcon()} alt="" className="w-30pxr h-30pxr rounded-full object-cover" />
        <p className="sr-only">{text}</p>
      </Link>
    </li>
  );
}
interface AuthGNBProps {
  profilePicture: string;
  currentPage: string;
}

function AuthGNB({ profilePicture, currentPage }: AuthGNBProps) {
  return (
    <li className="flex basis-full">
      <Link to="user/recent" className={`h-full w-full flex justify-center items-center`}>
        <img
          src={profilePicture}
          alt=""
          className={`w-30pxr h-30pxr rounded-full object-cover invert ${currentPage === '/user/recent' ? 'border-2 border-white p-2pxr' : ''}`}
        />
        <p className="sr-only">마이페이지</p>
      </Link>
    </li>
  );
}

export default function GlobalNavigationBar() {
  const currentPage = useAtomValue(page);
  const [profileImageURL, setProfileImageURL] = useState('');
  const isAuth = useAtomValue(isStore);

  useEffect(() => {
    async function getUserProfilePicture() {
      if (isAuth) {
        const currentUser = getCurrentUserData();
        if (currentUser.avatar) {
          setProfileImageURL(getPbImage('_pb_users_auth_', currentUser.id, currentUser.avatar));
        } else {
          setProfileImageURL(defaultProfile);
        }
      }
    }
    getUserProfilePicture();
  }, [isAuth]);

  return (
    <nav className="fixed bottom-0 w-full h-60pxr px-side bg-primary max-w-1300pxr z-20">
      <ul className="flex flex-row list-none w-full h-full invert">
        {profileImageURL
          ? ROUTER_STATE_AUTH.map((item, idx) => {
              return <GNBButton key={idx} currentPage={currentPage} {...item} />;
            })
          : ROUTER_STATE.map((item, idx) => {
              return <GNBButton key={idx} currentPage={currentPage} {...item} />;
            })}
        {profileImageURL ? <AuthGNB profilePicture={profileImageURL} currentPage={currentPage} /> : <></>}
      </ul>
    </nav>
  );
}
