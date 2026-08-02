import ButtonW from "../../components/ButtonW";

const Donate = () => {
  return (
    <div className="bg-red-600 w-full h-90 flex flex-col justify-center items-center mt-15">
      <h2 className="text-white text-3xl font-bold pb-5">
        Ready to Give Hope? Become a Blood Donor Today.
      </h2>
      <p className="text-white text-md pb-5">
        Join our community of heroes and start making a difference. Your
        donation can save lives.
      </p>
      <ButtonW text="Become a donor" />
    </div>
  );
};

export default Donate;
