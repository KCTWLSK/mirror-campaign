import { useEffect, useRef, useState } from "react";
import getConfig from "next/config";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import styles from "./styles.module.scss";

import logo from "@/../public/assets/logo_kc_x_mirror.png";
import searchIcon from "@/../public/assets/icon_search.png";
import instagramIcon from "@/../public/assets/icon_instagram.png";
import facebookIcon from "@/../public/assets/icon_facebook.png";
import linkedinIcon from "@/../public/assets/icon_linkedin.png";
import { InputAdornment, TextField } from "@mui/material";


const Footer = () => {
const {
    publicRuntimeConfig: {
      kicksCrewUrl,
      instagramUrl,
      facebookUrl,
      linkedinUrl,
    },
  } = getConfig();
  const { t } = useTranslation('common');

  const [keyword, setKeyword] = useState('');

  const ref = useRef();

  // useEffect(() => {
  //   const node = ref.current;
  //   const observer = new IntersectionObserver(
  //     ([{ intersectionRatio }]) => {
  //       const html = document.documentElement;
  //       const body = document.body;

  //       const snapTypeValue = intersectionRatio === 1 ? 'none' : 'y mandatory';
  //       html.style.setProperty('scroll-snap-type', snapTypeValue);
  //       body.style.setProperty('scroll-snap-type', snapTypeValue);
  //     },
  //     { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] }
  //   );

  //   observer.observe(node);
  //   return () => observer.disconnect();
  // }, []);

  const renderSearchBar = () => {
    const url = `${kicksCrewUrl}/search?q=${keyword}`;

    return (
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
                {keyword?.length ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image src={searchIcon} alt="search" />
                  </a>
                ) : <Image src={searchIcon} alt="search" />}
              </InputAdornment>
            ),
          }}
        />
      </div>
    );
  };

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
    <footer className={styles.footer} ref={ref}>
      <div className="row top">
        <h2>{t('footer.header')}</h2>
        <div className="imgWrapper">
          <Image src={logo} alt="logo" />
        </div>
        <h3>{t('footer.TermsAndConditions.header')}</h3>
        <div>{t('footer.TermsAndConditions.description', { startDate: 'Feb.', endDate: 'Mar.', startTime: '12345' })}</div>
      </div>
      <div className="divider" />
      <div className="row bottom">
        {renderSearchBar()}
        {renderSNSItems()}
      </div>
    </footer>
  );
};

export default Footer;
