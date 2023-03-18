import Image from "next/image";
import { useTranslation } from "next-i18next";
import MuiAccordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

import { CAMPAIGN_GIVEAWAY } from "@/data/constants";

import arrowImg from "@/../public/assets/arrow.png";

const Accordion = ({ name }) => {
  const { t } = useTranslation(CAMPAIGN_GIVEAWAY);

  return (
    <MuiAccordion
      disableGutters
      key={`accordion_item_${name}`}
    >
      <AccordionSummary>
        <div className="textBlock">
          <Typography className="label">{t(`signup.${name}.label`)}</Typography>
          <Typography variant="h6">{t(`signup.${name}.header`)}</Typography>
        </div>
        <div className="arrowWrapper">
          <Image src={arrowImg} alt="arrow" />
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{t(`signup.${name}.description`)}</Typography>
      </AccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;