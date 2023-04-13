import { useState } from "react";
import getConfig from "next/config";
import Image from "next/image";
import { useTranslation } from "next-export-i18n";
import { UAParser } from "ua-parser-js";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Link from "next/link";

import { useIsPreferPortraitMode } from "@/context/device";

import styles from "./styles.module.scss";

import logo from "@/../public/assets/logo_kc_x_mirror.png";
import instagramIcon from "@/../public/assets/icon_instagram.png";
import facebookIcon from "@/../public/assets/icon_facebook.png";
import linkedinIcon from "@/../public/assets/icon_linkedin.png";
import appStoreLogo from "@/../public/assets/ios_app_store.png";
import googlePlayLogo from "@/../public/assets/google_play.png";
import searchIcon from "@/../public/assets/icon_search.png";
import ImgQRCode from "@/../public/assets/qrcode.png";

const Footer = () => {
  const { getOS } = new UAParser();
  const { name } = getOS();
  const isIOS = name === 'iOS'; 
  const isPreferPortraitMode = useIsPreferPortraitMode();

  const {
    publicRuntimeConfig: {
      tncUrl,
      mirrorCollectionUrl,
      instagramUrl,
      facebookUrl,
      linkedinUrl,
      kicksCrewAppUrl,
    },
  } = getConfig();
  const { t } = useTranslation();

  const [keyword, setKeyword] = useState('');

  const renderSearchBar = () => (
    <div className="searchBarContainer">
      <div>{t('footer.search.label')}</div>
      <TextField
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (keyword?.length && e.code === 'Enter')
            window.open(url, '_blank');
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <a
                href={`${mirrorCollectionUrl}${keyword ? `/search?q=${keyword}` : ''}`}
                target="_blank"
                rel="noreferrer"
              >
                <Image src={searchIcon} alt="search" />
              </a>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );

  const renderSNSItems = () => {
    return (
      <div className="snsItemsContainer">
        <a
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Image src={instagramIcon} alt="instagram" />
        </a>
        <a
          href={facebookUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Image src={facebookIcon} alt="facebook" />
        </a>
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Image src={linkedinIcon} alt="linkedin" />
        </a>
      </div>
    );
  }

  return (
    <div className={styles.footer}>
      <div className="container">
        <div className="row top">
          <div className="logoContainer">
            <h2>{t('footer.header')}</h2>
            <div className="imgWrapper">
              <Image src={logo} alt="logo" />
            </div>
          </div>
          <div className="TAndCContainer">
            <h3>
              {t('footer.TermsAndConditions.header')}
              <Link target="_blank" href={tncUrl}>
                {t('footer.TermsAndConditions.subtitle')}
              </Link>
            </h3>
            <div>{t('footer.TermsAndConditions.description')}</div>
          </div>
        </div>
        <div className="row middle">
          <div className="block">
            <a
              className="button"
              href={isPreferPortraitMode ? kicksCrewAppUrl : mirrorCollectionUrl}
              target="_blank"
              rel="noreferrer"
            >
              {t(isPreferPortraitMode
                ? 'footer.gotoApp.label'
                : 'footer.search.label')}
            </a>
          </div>
          <div className="block">
            <div>{t('footer.app.label')}</div>
              <div className="appIconWrapper">
                <Image
                  src={
                    isPreferPortraitMode
                      ? isIOS ? appStoreLogo : googlePlayLogo
                      : ImgQRCode
                  }
                  onClick={() => window.open(kicksCrewAppUrl, '_blank')}
                  alt="download KICKS CREW app"
                />
              </div>
          </div>
        </div>
        <div className="row bottom">
          <div className="divider" />
          {renderSNSItems()}
        </div>
      </div>
    </div>
  );
};

export default Footer;
