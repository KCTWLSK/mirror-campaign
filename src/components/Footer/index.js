import { useEffect, useRef, useState } from "react";
import getConfig from "next/config";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { UAParser } from "ua-parser-js";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import { useIsPreferPortraitMode } from "@/context/device";
import { copyTextToClipboard } from "@/utils/helpers";

import styles from "./styles.module.scss";

import logo from "@/../public/assets/logo_kc_x_mirror.png";
import instagramIcon from "@/../public/assets/icon_instagram.png";
import facebookIcon from "@/../public/assets/icon_facebook.png";
import linkedinIcon from "@/../public/assets/icon_linkedin.png";
import iconCopy from "@/../public/assets/icon_copy.png";
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
      couponCode,
      kicksCrewUrl,
      instagramUrl,
      facebookUrl,
      linkedinUrl,
      kicksCrewAppUrl,
    },
  } = getConfig();
  const { t } = useTranslation('common');

  const [keyword, setKeyword] = useState('');
  const [copied, setCopied] = useState();

  const ref = useRef();

  useEffect(() => {
    const button = ref.current;
    button.classList.add('clicked');
    setTimeout(() => button.classList.remove('clicked'), 100);
  }, [copied]);

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
                href={`${kicksCrewUrl}${keyword ? `/search?q=${keyword}` : ''}`}
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

  const handleCodeClick = ({ target }) => {
    copyTextToClipboard(couponCode);
    setCopied(true);

    target.classList.add('clicked');
    setTimeout(() => target.classList.remove('clicked'), 100);
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row top">
          <div className="logoContainer">
            <h2>{t('footer.header')}</h2>
            <div className="imgWrapper">
              <Image src={logo} alt="logo" />
            </div>
          </div>
          <div className="TAndCContainer">
            <h3>{t('footer.TermsAndConditions.header')}</h3>
            <div>{t('footer.TermsAndConditions.description')}</div>
          </div>

        </div>
        <div className="row middle">
          <div className="block">
            <div>{t('footer.coupon.label')}</div>
            <button
              className="button copyCoupon"
              onClick={handleCodeClick}
              ref={ref}
            >
              {copied
                ? t('footer.coupon.copied')
                : (
                  <>
                    <div>{couponCode}</div>
                    <div className="imageWrapper">
                      <Image src={iconCopy} alt="copy" />
                    </div>
                  </>
                )}
            </button>
            {isPreferPortraitMode ? (
              <a
                className="button gotoApp"
                href={kicksCrewAppUrl}
                target="_blank"
                rel="noreferrer"
              >
                {t('footer.gotoApp.label')}
              </a>
            ) : renderSearchBar()}
          </div>
          <div className="block">
            <div>{t('footer.app.label')}</div>
            <a
              className="imgWrapper"
              href={kicksCrewAppUrl}
            >
              <Image
                src={
                  isPreferPortraitMode
                    ? isIOS ? appStoreLogo : googlePlayLogo
                    : ImgQRCode
                }
                alt="download KICKS CREW app"
              />
            </a>
          </div>
        </div>
        <div className="row bottom">
          <div className="divider" />
          {renderSNSItems()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
