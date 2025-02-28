import { Grid } from "react-css-spinners";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10">
        <Grid color="#9333ea" size={40} />
      </div>
    </div>
  );
}
