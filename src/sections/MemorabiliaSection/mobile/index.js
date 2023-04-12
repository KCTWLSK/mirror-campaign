import ContentSection from "./ContentSection";
import ScheduleSection from "./ScheduleSection";
import { getActiveWeek } from "@/utils/helpers";

const MemorabiliaSection = () => {
  const activeWeek = getActiveWeek();
  
  return (
    <>
      <ContentSection activeWeek={activeWeek} />
      <ScheduleSection activeWeek={activeWeek} />
    </>
  );
};

export default MemorabiliaSection;
