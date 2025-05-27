import CurrentDay from "./CurrentDay";

const NextDay = ({ startOfDay }) => (
    <CurrentDay dayOffset={2} startOfDay={startOfDay} height="300px" width="100%" />
);

export default NextDay;