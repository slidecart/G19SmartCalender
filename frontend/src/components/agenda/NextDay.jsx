import CurrentDay from "./CurrentDay";

const NextDay = ({ startOfDay }) => (
    <CurrentDay dayOffset={2} startOfDay={startOfDay} title="Dagen efter aktiviteter" width="100%" />
);

export default NextDay;