import CurrentDay from "./CurrentDay";

const NextDay = ({ startOfDay, title}) => (
    <CurrentDay dayOffset={2} startOfDay={startOfDay} title={title} width="100%" />
);

export default NextDay;